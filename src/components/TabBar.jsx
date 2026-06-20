import { useFiles } from "../context/FileContext";
import { X, FileCode } from "lucide-react";

const TabBar = () => {
  const { openFiles, activeFile, setActiveFile, closeFile } = useFiles();

  if (openFiles.length === 0) return null;

  return (
    <div className="flex bg-[#252526] overflow-x-auto no-scrollbar h-9 border-b border-black">
      {openFiles.map((file) => (
        <div
          key={file.path}
          onClick={() => setActiveFile(file)}
          className={`group flex items-center h-full px-3 min-w-[120px] max-w-[200px] border-r border-black cursor-pointer text-sm select-none ${
            activeFile?.path === file.path
              ? "bg-[#1e1e1e] text-white border-t border-t-[#007acc]"
              : "bg-[#2d2d2d] text-gray-400 hover:bg-[#2b2b2b]"
          }`}
        >
          <FileCode size={14} className="mr-2 text-blue-400 shrink-0" />
          <span className="truncate flex-1">{file.name}</span>
          <X
            size={14}
            className={`ml-2 p-0.5 rounded-sm hover:bg-[#454545] ${
              activeFile?.path === file.path
                ? "opacity-100"
                : "opacity-0 group-hover:opacity-100"
            }`}
            onClick={(e) => closeFile(e, file.path)}
          />
        </div>
      ))}
    </div>
  );
};

export default TabBar;
