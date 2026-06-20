import Editor from "@monaco-editor/react";
import { useFiles } from "../context/FileContext";
import TabBar from "./TabBar";
import { Code2 } from "lucide-react";

const EditorContainer = () => {
  const { activeFile, updateFileContent } = useFiles();

  /**
   * Helper to determine language based on extension
   * (Monaco usually handles this via the 'path' prop,
   * but providing it explicitly is safer)
   */
  const getLanguage = (fileName) => {
    const ext = fileName.split(".").pop();
    if (ext === "js" || ext === "jsx") return "javascript";
    if (ext === "ts" || ext === "tsx") return "typescript";
    if (ext === "py") return "python";
    return ext; // html, css, json etc.
  };

  return (
    <div className="flex-1 flex flex-col bg-[#1e1e1e] overflow-hidden">
      {/* 1. The Tabs Component */}
      <TabBar />

      {/* 2. The Editor or Empty State */}
      <div className="flex-1 w-full relative">
        {activeFile ? (
          <Editor
            height="100%"
            theme="vs-dark"
            /* Path is important: it tells Monaco the filename for language features */
            path={activeFile.path}
            language={getLanguage(activeFile.name)}
            value={activeFile.content}
            /* updateFileContent updates both activeFile and openFiles array in Context */
            onChange={(value) => updateFileContent(value || "")}
            options={{
              fontSize: 14,
              minimap: { enabled: true },
              scrollbar: {
                vertical: "visible",
                horizontal: "visible",
                useShadows: false,
                verticalScrollbarSize: 10,
                horizontalScrollbarSize: 10,
              },
              padding: { top: 10 },
              automaticLayout: true, // Auto-resizes when sidebar is toggled
              fixedOverflowWidgets: true,
              wordWrap: "on",
              lineNumbersMinChars: 3,
            }}
          />
        ) : (
          /* Empty State (VS Code Style) */
          <div className="flex flex-col items-center justify-center h-full text-gray-500 select-none bg-[#1e1e1e]">
            <Code2 size={100} className="opacity-10 mb-6 text-white" />
            <div className="flex flex-col gap-3 text-sm">
              <div className="flex justify-between gap-12">
                <span>Show All Commands</span>
                <span className="text-gray-400 opacity-60 italic">
                  Shift + Cmd + P
                </span>
              </div>
              <div className="flex justify-between gap-12">
                <span>Go to File</span>
                <span className="text-gray-400 opacity-60 italic">Cmd + P</span>
              </div>
              <div className="flex justify-between gap-12">
                <span>Save File</span>
                <span className="text-gray-400 opacity-60 italic">Cmd + S</span>
              </div>
              <div className="flex justify-between gap-12">
                <span>Open Folder</span>
                <span className="text-gray-400 opacity-60 italic">Cmd + O</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditorContainer;
