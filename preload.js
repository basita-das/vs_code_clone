const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  openFolder: () => ipcRenderer.invoke("dialog:openDirectory"),
  readFile: (filePath) => ipcRenderer.invoke("file:read", filePath),
  saveFile: (data) => ipcRenderer.invoke("file:save", data),

  // Terminal Logic
  onTerminalData: (callback) =>
    ipcRenderer.on("terminal:incoming-data", (event, data) => callback(data)),
  writeTerminalData: (data) => ipcRenderer.send("terminal:write-data", data),
});
