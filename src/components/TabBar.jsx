import { useFiles } from "../context/FileContext";
import { X, Circle } from "lucide-react";
import { getFileIcon } from "./Sidebar";

const TabBar = () => {
  const { openFiles, activeFile, setActiveFile, closeFile, dirtyFiles } =
    useFiles();

  return (
    <div className="flex bg-[#252526] overflow-x-auto no-scrollbar h-9 border-b border-black shrink-0">
      {openFiles.map((file) => {
        const isDirty = dirtyFiles.has(file.path);
        const isActive = activeFile?.path === file.path;
        return (
          <div
            key={file.path}
            onClick={() => setActiveFile(file)}
            className={`group flex items-center h-full px-3 min-w-[120px] max-w-[200px] border-r border-black cursor-pointer text-sm ${isActive ? "bg-[#1e1e1e] text-white border-t border-t-[#007acc]" : "bg-[#2d2d2d] text-gray-400"}`}
          >
            <span className="mr-2">{getFileIcon(file.name)}</span>
            <span
              className={`truncate flex-1 ${isDirty ? "italic font-semibold" : ""}`}
            >
              {file.name}
            </span>
            <div
              onClick={(e) => closeFile(e, file.path)}
              className="ml-2 w-4 h-4 flex items-center justify-center relative"
            >
              {isDirty && !isActive ? (
                <Circle size={8} className="fill-gray-500 text-gray-500" />
              ) : (
                <X
                  size={14}
                  className="opacity-0 group-hover:opacity-100 p-0.5 rounded-sm hover:bg-[#454545]"
                />
              )}
              {isDirty && isActive && (
                <Circle
                  size={8}
                  className="fill-white text-white group-hover:hidden"
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TabBar;
