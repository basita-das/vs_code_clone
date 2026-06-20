//The main area that holds the Monaco Editor.

import Editor from "@monaco-editor/react";
import { useFiles } from "../context/FileContext";

const EditorContainer = () => {
  const { activeFile, updateFileContent } = useFiles();

  // Safety check: Show a placeholder if no file is active
  if (!activeFile) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#1e1e1e] text-gray-500">
        Select a file to start coding
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-[#1e1e1e] overflow-hidden">
      {/* Tab Header */}
      <div className="flex bg-[#252526] h-9">
        <div className="bg-[#1e1e1e] text-white px-4 flex items-center text-sm border-t border-t-[#007acc] cursor-default">
          {activeFile.name}
        </div>
        {/* Fill the rest of the tab bar */}
        <div className="flex-1 bg-[#2d2d2d] border-b border-black"></div>
      </div>

      {/* Actual Editor Wrapper */}
      <div className="flex-1 w-full">
        <Editor
          height="100%"
          theme="vs-dark"
          language={activeFile.language}
          value={activeFile.content}
          onChange={(value) => updateFileContent(value || "")}
          options={{
            fontSize: 14,
            minimap: { enabled: true },
            scrollbar: { vertical: "visible", horizontal: "visible" },
            padding: { top: 10 },
            automaticLayout: true, // Crucial for resizing
          }}
        />
      </div>
    </div>
  );
};

export default EditorContainer;