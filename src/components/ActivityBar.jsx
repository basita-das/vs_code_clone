//This is the narrow strip with icons for Files, Search, etc.

import {
  Files,
  Search,
  GitBranch,
  Play,
  Boxes,
  Settings,
  UserCircle,
} from "lucide-react";

const ActivityBar = () => {
  return (
    /* Moved border-r here to ensure it covers the full height */
    <div className="w-12 h-full bg-[#333333] flex flex-col items-center py-4 justify-between text-gray-400 border-r border-[#2b2b2b]">
      <div className="flex flex-col gap-6">
        <Files className="cursor-pointer text-white border-l-2 border-white pl-1" size={24} />
        <Search className="cursor-pointer hover:text-white" size={24} />
        <GitBranch className="cursor-pointer hover:text-white" size={24} />
        <Play className="cursor-pointer hover:text-white" size={24} />
        <Boxes className="cursor-pointer hover:text-white" size={24} />
      </div>
      <div className="flex flex-col gap-6">
        <UserCircle className="cursor-pointer hover:text-white" size={24} />
        <Settings className="cursor-pointer hover:text-white" size={24} />
      </div>
    </div>
  );
};

export default ActivityBar;