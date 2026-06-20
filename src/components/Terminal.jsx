import React, { useEffect, useRef } from "react";
import { Terminal as XTerm } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import "xterm/css/xterm.css";

const Terminal = () => {
  const terminalRef = useRef(null);

  useEffect(() => {
    if (!terminalRef.current) return;

    const term = new XTerm({
      theme: { background: "#1e1e1e", foreground: "#ffffff" },
      cursorBlink: true,
      fontSize: 13,
      convertEol: true,
    });

    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    term.open(terminalRef.current);

    // Initial fit
    setTimeout(() => fitAddon.fit(), 200);

    const dataListener = window.electronAPI.onTerminalData((data) => {
      term.write(data);
    });

    term.onData((data) => {
      window.electronAPI.writeTerminalData(data);
    });

    const handleResize = () => fitAddon.fit();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      term.dispose();
    };
  }, []);

  return <div ref={terminalRef} className="h-full w-full" />;
};

export default Terminal;
