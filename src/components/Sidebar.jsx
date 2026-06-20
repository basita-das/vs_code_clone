//Displays the list of files.

import { useFiles } from "../context/FileContext";
import { ChevronDown, FileCode } from "lucide-react";

const Sidebar = () => {
  const { files, activeFile, setActiveFile } = useFiles();

  return (
    <div className="w-60 h-full bg-[#252526] text-gray-300 flex flex-col border-r border-black">
      <div className="p-3 text-xs font-bold uppercase tracking-wider">
        Explorer
      </div>
      <div className="flex items-center px-2 py-1 bg-[#37373d] text-white text-sm cursor-pointer">
        <ChevronDown size={16} />
        <span className="ml-1 font-bold">VS-CODE-CLONE</span>
      </div>

      <div className="mt-2">
        {files.map((file) => (
          <div
            key={file.id}
            onClick={() => setActiveFile(file)}
            className={`flex items-center px-4 py-1 cursor-pointer text-sm hover:bg-[#2a2d2e] ${
              activeFile.id === file.id ? "bg-[#37373d] text-white" : ""
            }`}
          >
            <FileCode size={16} className="mr-2 text-blue-400" />
            {file.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
