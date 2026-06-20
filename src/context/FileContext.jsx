import React, { createContext, useState, useContext } from "react";

const FileContext = createContext();

export const FileProvider = ({ children }) => {
  const [fileTree, setFileTree] = useState(null);
  const [openFiles, setOpenFiles] = useState([]); // Array of open tabs
  const [activeFile, setActiveFile] = useState(null); // Currently viewed tab

  const openFolder = async () => {
    const tree = await window.electronAPI.openFolder();
    if (tree) setFileTree(tree);
  };

  const selectFile = async (file) => {
    if (file.type === "directory") return;

    // Check if file is already open
    const existingFile = openFiles.find((f) => f.path === file.path);

    if (existingFile) {
      setActiveFile(existingFile);
    } else {
      const content = await window.electronAPI.readFile(file.path);
      const newFile = { ...file, content };
      setOpenFiles((prev) => [...prev, newFile]);
      setActiveFile(newFile);
    }
  };

  const closeFile = (e, path) => {
    e.stopPropagation(); // Prevent switching to the tab we are closing
    const newOpenFiles = openFiles.filter((f) => f.path !== path);
    setOpenFiles(newOpenFiles);

    // If we closed the active tab, switch to another one
    if (activeFile?.path === path) {
      setActiveFile(
        newOpenFiles.length > 0 ? newOpenFiles[newOpenFiles.length - 1] : null,
      );
    }
  };

  const updateFileContent = (content) => {
    if (!activeFile) return;
    // Update both the active file and its version in the openFiles array
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
    console.log("Saved:", activeFile.name);
  };

  return (
    <FileContext.Provider
      value={{
        fileTree,
        openFiles,
        activeFile,
        openFolder,
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
