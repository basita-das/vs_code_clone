import { useEffect } from "react";
import ActivityBar from "./components/ActivityBar";
import Sidebar from "./components/Sidebar";
import EditorContainer from "./components/EditorContainer";
import { FileProvider, useFiles } from "./context/FileContext";

function AppContent() {
  const { saveActiveFile } = useFiles();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        saveActiveFile();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [saveActiveFile]);

  return (
    <div className="flex flex-col h-screen w-full bg-[#1e1e1e] overflow-hidden text-white">
      <div className="h-3 w-full bg-[#333333] drag-region" style={{ WebkitAppRegion: 'drag' }}></div>
      <div className="flex flex-1 overflow-hidden">
        <ActivityBar />
        <Sidebar />
        <EditorContainer />
      </div>
      <div className="h-6 bg-[#007acc] flex items-center px-3 text-white text-[12px] justify-between shrink-0">
        <div className="flex gap-4"><span>Main*</span><span>0 Layout Errors</span></div>
        <div className="flex gap-4 uppercase"><span>UTF-8</span><span>Javascript</span></div>
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