//This file handles which file is open and what its content is.

import React, { createContext, useState, useContext } from "react";

const FileContext = createContext();

const initialFiles = [
  {
    id: "1",
    name: "index.html",
    language: "html",
    content: "<h1>Hello World</h1>",
  },
  {
    id: "2",
    name: "style.css",
    language: "css",
    content: "body { color: red; }",
  },
  {
    id: "3",
    name: "script.js",
    language: "javascript",
    content: 'console.log("Hello VS Code!");',
  },
];

export const FileProvider = ({ children }) => {
  const [files, setFiles] = useState(initialFiles);
  const [activeFile, setActiveFile] = useState(initialFiles[0]);

  const updateFileContent = (newContent) => {
    setFiles((prev) =>
      prev.map((f) =>
        f.id === activeFile.id ? { ...f, content: newContent } : f,
      ),
    );
    setActiveFile((prev) => ({ ...prev, content: newContent }));
  };

  return (
    <FileContext.Provider
      value={{ files, activeFile, setActiveFile, updateFileContent }}
    >
      {children}
    </FileContext.Provider>
  );
};

export const useFiles = () => useContext(FileContext);
