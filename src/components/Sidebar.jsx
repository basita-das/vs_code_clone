import { useFiles } from "../context/FileContext";
import {
  FileCode,
  Folder,
  ChevronDown,
  Globe,
  Hash,
  FileJson,
  XCircle,
} from "lucide-react";

export const getFileIcon = (name) => {
  const ext = name.split(".").pop().toLowerCase();
  if (ext === "html") return <Globe size={16} className="text-orange-500" />;
  if (ext === "css") return <Hash size={16} className="text-blue-400" />;
  if (ext === "js" || ext === "jsx")
    return <FileCode size={16} className="text-yellow-400" />;
  if (ext === "json") return <FileJson size={16} className="text-yellow-600" />;
  return <FileCode size={16} className="text-gray-400" />;
};

const Sidebar = () => {
  const {
    fileTree,
    openFolder,
    closeFolder,
    selectFile,
    activeFile,
    isSidebarOpen,
  } = useFiles();

  if (!isSidebarOpen) return null;

  const renderTree = (node, depth = 0) => {
    const isFile = node.type === "file";
    return (
      <div key={node.path}>
        <div
          onClick={() => (isFile ? selectFile(node) : null)}
          style={{ paddingLeft: `${depth * 12 + 12}px` }}
          className={`flex items-center py-0.5 cursor-pointer text-sm hover:bg-[#2a2d2e] ${activeFile?.path === node.path ? "bg-[#37373d] text-white" : "text-gray-400"}`}
        >
          {!isFile ? (
            <ChevronDown size={14} className="mr-1" />
          ) : (
            <span className="w-4" />
          )}
          <span className="mr-2">
            {isFile ? (
              getFileIcon(node.name)
            ) : (
              <Folder size={16} className="text-blue-300" />
            )}
          </span>
          <span className="truncate">{node.name}</span>
        </div>
        {!isFile && node.children?.map((child) => renderTree(child, depth + 1))}
      </div>
    );
  };

  return (
    <div className="w-64 h-full bg-[#252526] flex flex-col border-r border-black select-none shrink-0 overflow-hidden">
      <div className="p-3 pt-8 text-[11px] font-bold uppercase text-gray-500 flex justify-between items-center group">
        <span>Explorer</span>
        {fileTree && (
          <XCircle
            size={14}
            className="cursor-pointer hover:text-white opacity-0 group-hover:opacity-100"
            onClick={closeFolder}
          />
        )}
      </div>
      <div className="flex-1 overflow-y-auto">
        {!fileTree ? (
          <div className="p-4">
            <button
              onClick={openFolder}
              className="w-full bg-[#007acc] text-white py-1.5 text-sm hover:bg-[#1f8ad2]"
            >
              Open Folder
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center px-2 py-1 bg-[#37373d] text-white text-sm font-bold truncate">
              <ChevronDown size={16} />
              <span className="ml-1">{fileTree.name}</span>
            </div>
            {fileTree.children.map((child) => renderTree(child))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
