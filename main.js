import { app, BrowserWindow, ipcMain, dialog } from "electron";
import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";
import os from "os";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const pty = require("node-pty");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow;
let ptyProcess;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    backgroundColor: "#1e1e1e",
    titleBarStyle: "hiddenInset",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  mainWindow.loadURL("http://localhost:5173");

  // ROBUST SHELL DETECTION
  const shell =
    process.env.SHELL ||
    (os.platform() === "win32" ? "powershell.exe" : "/bin/zsh");

  try {
    ptyProcess = pty.spawn(shell, [], {
      name: "xterm-color",
      cols: 80,
      rows: 30,
      cwd: os.homedir(),
      env: process.env,
    });

    ptyProcess.onData((data) => {
      mainWindow.webContents.send("terminal:incoming-data", data);
    });
  } catch (err) {
    console.error("Terminal failed to spawn:", err);
  }
}

// IPC Handlers
ipcMain.handle("dialog:openDirectory", async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ["openDirectory"],
  });
  if (canceled) return null;

  // When a folder is opened, tell the terminal to go there
  if (ptyProcess) ptyProcess.write(`cd "${filePaths[0]}"\r`);

  return await buildFileTree(filePaths[0]);
});

// Helper for file tree
async function buildFileTree(dirPath) {
  const stats = await fs.stat(dirPath);
  const name = path.basename(dirPath);
  if (stats.isFile()) return { id: dirPath, name, type: "file", path: dirPath };
  const children = await fs.readdir(dirPath);
  const childNodes = await Promise.all(
    children
      .filter((child) => !child.startsWith(".") && child !== "node_modules")
      .map((child) =>
        buildFileTree(path.join(dirPath, child)).catch(() => null),
      ),
  );
  return {
    id: dirPath,
    name,
    type: "directory",
    path: dirPath,
    children: childNodes.filter(Boolean),
  };
}

ipcMain.handle(
  "file:read",
  async (e, path) => await fs.readFile(path, "utf-8"),
);
ipcMain.handle("file:save", async (e, { filePath, content }) => {
  await fs.writeFile(filePath, content, "utf-8");
  return true;
});

ipcMain.on("terminal:write-data", (event, data) => {
  if (ptyProcess) ptyProcess.write(data);
});

app.whenReady().then(createWindow);
app.on("window-all-closed", () => process.platform !== "darwin" && app.quit());
