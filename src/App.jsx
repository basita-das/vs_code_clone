import ActivityBar from "./components/ActivityBar";
import Sidebar from "./components/Sidebar";
import EditorContainer from "./components/EditorContainer";
import { FileProvider } from "./context/FileContext";

function App() {
  return (
    <FileProvider>
      {/* Main Container: Full screen height, vertical flex */}
      <div className="flex flex-col h-screen w-full bg-[#1e1e1e] overflow-hidden text-white">
        {/* Top Section: Activity Bar + Sidebar + Editor */}
        <div className="flex flex-1 overflow-hidden">
          <ActivityBar />
          <Sidebar />
          <EditorContainer />
        </div>

        {/* Bottom Section: Status Bar (Fixed height) */}
        <div className="h-6 bg-[#007acc] flex items-center px-3 text-white text-[12px] justify-between select-none shrink-0">
          <div className="flex items-center gap-4 h-full">
            <div className="flex items-center gap-1 hover:bg-[#1f8ad2] px-2 h-full cursor-pointer">
              <span>Main*</span>
            </div>
            <span>0 Layout Errors</span>
          </div>

          <div className="flex items-center gap-4 uppercase h-full">
            <span className="hover:bg-[#1f8ad2] px-2 h-full flex items-center cursor-pointer">
              UTF-8
            </span>
            <span className="hover:bg-[#1f8ad2] px-2 h-full flex items-center cursor-pointer">
              Javascript
            </span>
            <span className="hover:bg-[#1f8ad2] px-2 h-full flex items-center cursor-pointer">
              Feedback
            </span>
          </div>
        </div>
      </div>
    </FileProvider>
  );
}

export default App;
