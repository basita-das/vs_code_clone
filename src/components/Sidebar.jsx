import { useFiles } from '../context/FileContext';
import { FileCode, Folder, ChevronDown } from 'lucide-react';

const Sidebar = () => {
  const { fileTree, openFolder, selectFile, activeFile } = useFiles();

  const renderTree = (node) => {
    if (!node) return null;
    const isFile = node.type === 'file';
    return (
      <div key={node.path} className="ml-2">
        <div 
          onClick={() => isFile ? selectFile(node) : null}
          className={`flex items-center px-2 py-1 cursor-pointer text-sm hover:bg-[#2a2d2e] ${activeFile?.path === node.path ? 'bg-[#37373d] text-white' : ''}`}
        >
          {isFile ? <FileCode size={14} className="mr-2 text-blue-400" /> : <Folder size={14} className="mr-2 text-yellow-500" />}
          <span className="truncate">{node.name}</span>
        </div>
        {!isFile && node.children && node.children.map(child => renderTree(child))}
      </div>
    );
  };

  return (
    <div className="w-64 h-full bg-[#252526] text-gray-400 flex flex-col border-r border-black overflow-hidden">
      <div className="p-3 pt-4 text-[11px] font-bold uppercase shrink-0">Explorer</div>
      <div className="flex-1 overflow-y-auto">
        {!fileTree ? (
          <div className="p-4"><button onClick={openFolder} className="w-full bg-[#007acc] text-white py-1.5 text-sm hover:bg-[#1f8ad2]">Open Folder</button></div>
        ) : (
          <div>
            <div className="flex items-center px-2 py-1 bg-[#37373d] text-white text-sm font-bold truncate">
              <ChevronDown size={16} /><span className="ml-1 uppercase">{fileTree.name}</span>
            </div>
            {fileTree.children.map(child => renderTree(child))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;