const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  openFolder: () => ipcRenderer.invoke("dialog:openDirectory"),
  readFile: (filePath) => ipcRenderer.invoke("file:read", filePath),
  saveFile: (data) => ipcRenderer.invoke("file:save", data),
});
