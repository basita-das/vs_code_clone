import React, { createContext, useState, useContext } from "react";

const FileContext = createContext();

export const FileProvider = ({ children }) => {
  const [fileTree, setFileTree] = useState(null);
  const [openFiles, setOpenFiles] = useState([]);
  const [activeFile, setActiveFile] = useState(null);
  const [dirtyFiles, setDirtyFiles] = useState(new Set());
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const openFolder = async () => {
    const tree = await window.electronAPI.openFolder();
    if (tree) {
      setFileTree(tree);
      setIsSidebarOpen(true);
    }
  };

  const closeFolder = () => {
    setFileTree(null);
    setOpenFiles([]);
    setActiveFile(null);
    setDirtyFiles(new Set());
  };

  const selectFile = async (file) => {
    if (file.type === "directory") return;
    const existing = openFiles.find((f) => f.path === file.path);
    if (existing) {
      setActiveFile(existing);
    } else {
      const content = await window.electronAPI.readFile(file.path);
      const newFile = { ...file, content };
      setOpenFiles((prev) => [...prev, newFile]);
      setActiveFile(newFile);
    }
  };

  const closeFile = (e, path) => {
    e.stopPropagation();
    const filtered = openFiles.filter((f) => f.path !== path);
    setOpenFiles(filtered);
    setDirtyFiles((prev) => {
      const n = new Set(prev);
      n.delete(path);
      return n;
    });
    if (activeFile?.path === path) {
      setActiveFile(filtered.length > 0 ? filtered[filtered.length - 1] : null);
    }
  };

  const updateFileContent = (content) => {
    if (!activeFile) return;
    setDirtyFiles((prev) => new Set(prev).add(activeFile.path));
    setActiveFile((prev) => ({ ...prev, content }));
    setOpenFiles((prev) =>
      prev.map((f) => (f.path === activeFile.path ? { ...f, content } : f)),
    );
  };

  const saveActiveFile = async () => {
    if (!activeFile) return;
    await window.electronAPI.saveFile({
      filePath: activeFile.path,
      content: activeFile.content,
    });
    setDirtyFiles((prev) => {
      const n = new Set(prev);
      n.delete(activeFile.path);
      return n;
    });
  };

  return (
    <FileContext.Provider
      value={{
        fileTree,
        openFiles,
        activeFile,
        dirtyFiles,
        isPaletteOpen,
        isSidebarOpen,
        setIsPaletteOpen,
        setIsSidebarOpen,
        openFolder,
        closeFolder,
        selectFile,
        closeFile,
        updateFileContent,
        saveActiveFile,
        setActiveFile,
      }}
    >
      {children}
    </FileContext.Provider>
  );
};

export const useFiles = () => useContext(FileContext);
