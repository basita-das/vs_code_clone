import { useFiles } from "../context/FileContext";

const CommandPalette = () => {
  const { isPaletteOpen, setIsPaletteOpen, openFolder, saveActiveFile } =
    useFiles();

  if (!isPaletteOpen) return null;

  const commands = [
    { name: "File: Save", action: saveActiveFile },
    { name: "File: Open Folder", action: openFolder },
    { name: "View: Close Palette", action: () => setIsPaletteOpen(false) },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex justify-center pt-2">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => setIsPaletteOpen(false)}
      />
      <div className="relative w-[600px] bg-[#252526] shadow-2xl border border-[#454545] rounded-lg overflow-hidden h-fit">
        <input
          autoFocus
          placeholder="Type a command or search..."
          className="w-full bg-[#3c3c3c] text-white p-3 outline-none border-b border-blue-500 text-sm"
        />
        <div className="p-1">
          {commands.map((cmd) => (
            <div
              key={cmd.name}
              onClick={() => {
                cmd.action();
                setIsPaletteOpen(false);
              }}
              className="px-4 py-2 hover:bg-[#094771] hover:text-white text-gray-300 text-xs cursor-pointer rounded"
            >
              {cmd.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
