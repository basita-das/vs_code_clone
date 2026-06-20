import { useEffect } from "react";
import ActivityBar from "./components/ActivityBar";
import Sidebar from "./components/Sidebar";
import EditorContainer from "./components/EditorContainer";
import Terminal from "./components/Terminal";
import CommandPalette from "./components/CommandPalette";
import { FileProvider, useFiles } from "./context/FileContext";

function AppContent() {
  const { saveActiveFile, setIsPaletteOpen, setIsSidebarOpen } = useFiles();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        saveActiveFile();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "b") {
        e.preventDefault();
        setIsSidebarOpen((p) => !p);
      }
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "p") {
        e.preventDefault();
        setIsPaletteOpen((p) => !p);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [saveActiveFile]);

  return (
    <div className="flex flex-col h-screen w-full bg-[#1e1e1e] overflow-hidden text-white font-sans">
      <CommandPalette />
      <div
        className="h-3 w-full bg-[#333333] drag-region shrink-0"
        style={{ WebkitAppRegion: "drag" }}
      ></div>
      <div className="flex flex-1 overflow-hidden">
        <ActivityBar />
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <EditorContainer />
          <div className="h-64 border-t border-black bg-[#1e1e1e] flex flex-col shrink-0">
            <div className="flex items-center h-9 px-4 text-[11px] uppercase font-bold text-gray-400 border-b border-black">
              Terminal
            </div>
            <div className="flex-1 overflow-hidden">
              <Terminal />
            </div>
          </div>
        </div>
      </div>
      <div className="h-6 bg-[#007acc] shrink-0 flex items-center px-3 text-white text-[12px] justify-between select-none">
        <div className="flex gap-4">
          <span>Main*</span>
          <span>Ready</span>
        </div>
        <div className="flex gap-4">
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
