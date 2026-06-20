import { app, BrowserWindow, ipcMain, dialog } from "electron";
import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

function createWindow() {
  const win = new BrowserWindow({
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
  win.loadURL("http://localhost:5173");
}

// Register Handlers
ipcMain.handle("dialog:openDirectory", async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ["openDirectory"],
  });
  if (canceled) return null;
  return await buildFileTree(filePaths[0]);
});

ipcMain.handle(
  "file:read",
  async (e, path) => await fs.readFile(path, "utf-8"),
);
ipcMain.handle("file:save", async (e, { filePath, content }) => {
  await fs.writeFile(filePath, content, "utf-8");
  return true;
});

app.whenReady().then(createWindow);
app.on("window-all-closed", () => process.platform !== "darwin" && app.quit());
