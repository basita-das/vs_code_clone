import { useEffect } from "react";
import ActivityBar from "./components/ActivityBar";
import Sidebar from "./components/Sidebar";
import EditorContainer from "./components/EditorContainer";
import Terminal from "./components/Terminal";
import { FileProvider, useFiles } from "./context/FileContext";

function AppContent() {
  const { saveActiveFile } = useFiles();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        saveActiveFile();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [saveActiveFile]);

  return (
    <div className="flex flex-col h-screen w-full bg-[#1e1e1e] overflow-hidden text-white">
      {/* Draggable region for Mac */}
      <div
        className="h-3 w-full bg-[#333333] drag-region shrink-0"
        style={{ WebkitAppRegion: "drag" }}
      ></div>

      {/* Main Workspace */}
      <div className="flex flex-1 overflow-hidden">
        <ActivityBar />
        <Sidebar />

        <div className="flex-1 flex flex-col overflow-hidden">
          <EditorContainer />

          {/* Terminal Panel */}
          <div className="h-64 border-t border-black bg-[#1e1e1e] flex flex-col shrink-0">
            <div className="flex items-center h-9 bg-[#1e1e1e] px-4 text-[11px] uppercase font-bold text-gray-400 gap-6 border-b border-black">
              <span className="text-white border-b border-white h-full flex items-center cursor-pointer">
                Terminal
              </span>
              <span className="hover:text-white cursor-pointer h-full flex items-center">
                Output
              </span>
              <span className="hover:text-white cursor-pointer h-full flex items-center">
                Debug Console
              </span>
            </div>
            <div className="flex-1 overflow-hidden">
              <Terminal />
            </div>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="h-6 bg-[#007acc] flex items-center px-3 text-white text-[12px] justify-between shrink-0 select-none">
        <div className="flex gap-4">
          <span>Main*</span>
          <span>0 Layout Errors</span>
        </div>
        <div className="flex gap-4 uppercase">
          <span>UTF-8</span>
          <span>Javascript</span>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <FileProvider>
      <AppContent />
    </FileProvider>
  );
}
