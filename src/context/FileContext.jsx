import React, { createContext, useState, useContext } from 'react';

const FileContext = createContext();

export const FileProvider = ({ children }) => {
  const [fileTree, setFileTree] = useState(null);
  const [activeFile, setActiveFile] = useState(null);

  const openFolder = async () => {
    const tree = await window.electronAPI.openFolder();
    if (tree) setFileTree(tree);
  };

  const selectFile = async (file) => {
    if (file.type === 'directory') return;
    const content = await window.electronAPI.readFile(file.path);
    setActiveFile({ ...file, content });
  };

  const updateFileContent = (content) => {
    setActiveFile(prev => ({ ...prev, content }));
  };

  const saveActiveFile = async () => {
    if (!activeFile) return;
    await window.electronAPI.saveFile({ filePath: activeFile.path, content: activeFile.content });
    console.log("Saved!");
  };

  return (
    <FileContext.Provider value={{ fileTree, activeFile, openFolder, selectFile, updateFileContent, saveActiveFile }}>
      {children}
    </FileContext.Provider>
  );
};

export const useFiles = () => useContext(FileContext);