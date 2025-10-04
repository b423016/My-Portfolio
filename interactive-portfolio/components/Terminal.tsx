"use client";
import React, { useState, useRef, useEffect } from "react";
import TerminalCodeMotionBackground from "./TerminalCodeMotionBackground";
import { motion } from "framer-motion";

const bootMessages = [
  "Initializing graphical environment...",
  "Loading component: <ProjectCards />... OK",
  "Loading component: <SkillConstellation />... OK",
  "Loading component: <ExperienceTimeline />... OK",
  "Finalizing render..."
];

export default function Terminal({ onLaunchGui }: { onLaunchGui: () => void }) {
  const [lines, setLines] = useState([
    "Welcome to Ayush Kumar Jha's Interactive Portfolio.",
    "Type '<span class='command'>gui</span>' to move to the portfolio or '<span class='command'>summarize</span>' for a high-level resume overview.",
    ""
  ]);
  const [input, setInput] = useState("");
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [booting, setBooting] = useState(false);
  const [bootStep, setBootStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (booting && bootStep < bootMessages.length) {
      const timer = setTimeout(() => {
        setLines((prev) => [...prev, bootMessages[bootStep]]);
        setBootStep((prev) => prev + 1);
        setProgress((prev) => Math.min(100, prev + 20));
      }, 600);
      return () => clearTimeout(timer);
    } else if (booting && bootStep === bootMessages.length) {
      // Boot complete, animate out
      setTimeout(() => {
        onLaunchGui();
      }, 1000);
    }
  }, [booting, bootStep, onLaunchGui]);

  const commands: Record<string, string | ((...args: any[]) => void)> = {
    help: "Available commands: <span class='command'>help</span>, <span class='command'>about</span>, <span class='command'>gui</span>, <span class='command'>summarize</span>",
    about: "Ayush Kumar Jha | AI Developer | Type <span class='command'>gui</span> to launch the portfolio.",
    gui: () => {
      setLines([]);
      setBooting(true);
      setBootStep(0);
      setProgress(0);
    },
    summarize: () => {
      setLines((prev) => [
        ...prev,
        `<div class='summary-block'><span class='summary-title'>High-level Resume Overview</span><br />`
        + `<span class='summary-section'><b>Who am I?</b> Software Engineering student, backend developer, and AI/ML enthusiast passionate about building scalable, user-centric solutions.</span><br />`
        + `<span class='summary-section'><b>Experience:</b> AI Engineer Intern (PrepAiro), Freelance AI Backend Developer.</span><br />`
  + `<span class='summary-section'><b>Skills:</b> Python, Java, FastAPI, Docker, AWS, Deep Learning, Async Programming.</span><br />`
        + `<span class='summary-section'><b>Education:</b> B.Tech IT, IIIT Bhubaneswar (GPA: 8.59/10.0).</span><br />`
        + `<span class='summary-section'><b>Projects:</b> Flight Route Optimization (A*), Audio Recognition System (EfficientNet, FastAPI, Postgres).</span><br />`
        + `<span class='summary-section'><b>Achievements:</b> D3Hackathon 2024 Top 10 Finalist, Top 10% Codeforces, IOQM Qualified.</span><br />`
        + `<br />`
        + `<span class='summary-highlight'>Why Ayush?</span> <span class='summary-desc'>Strong fundamentals, proven impact, and a record of building innovative solutions. Ready to contribute and grow.</span><br />`
        + `<span class='summary-hint'>Type <span class='command'>gui</span> for full details.</span></div>`
      ]);
    }
  };

  function handleCommand(e: React.FormEvent) {
    e.preventDefault();
    let cmd = input.trim().toLowerCase();
    // Accept any prefix of 'summarize' as the summarize command
    if (["su", "sum", "summ", "summa", "summar", "summari", "summariz", "summarize"].some(prefix => cmd === prefix)) {
      cmd = "summarize";
    }
    setLines((prev) => [...prev, `<span class='prompt'>visitor@ayushjha.dev:~$</span> ${cmd}`]);
    if (commands[cmd]) {
      if (typeof commands[cmd] === "function") {
        (commands[cmd] as Function)();
      } else {
        setLines((prev) => [...prev, commands[cmd] as string]);
      }
    } else {
      setLines((prev) => [...prev, "Unknown command. Type '<span class='command'>help</span>'."]);
    }
    setInput("");
  }

  useEffect(() => {
    inputRef.current?.focus();
  }, [lines, booting]);

  useEffect(() => {
    // Show autocomplete if input starts with 'su', 'sum', or 'summ'
    const val = input.trim().toLowerCase();
    if (!booting && val.length > 1 && ["su", "sum", "summar", "summarize"].some(prefix => "summarize".startsWith(val))) {
      setShowAutocomplete(true);
    } else {
      setShowAutocomplete(false);
    }
  }, [input, booting]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
      initial={{ opacity: 1 }}
      animate={{ opacity: booting && bootStep === bootMessages.length ? 0 : 1 }}
      transition={{ duration: 1 }}
      style={{ pointerEvents: booting && bootStep === bootMessages.length ? "none" : "auto" }}
    >
  {/* Animated code/numbers background for terminal */}
  <TerminalCodeMotionBackground />
      <div className="relative w-full max-w-2xl h-[80vh] bg-[#181a20]/90 rounded-2xl border border-[#23263a] shadow-2xl overflow-hidden flex flex-col">
        {/* Window controls */}
        <div className="flex items-center gap-2 px-4 py-2 bg-[#181a20]/80 border-b border-[#23263a]">
          <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block" />
          <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block" />
          <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block" />
        </div>
        {/* Digital Rain background (placeholder) */}
        <div className="absolute inset-0 z-0 pointer-events-none" style={{ opacity: 0.2 }}>
          {/* MatrixRainCanvas or MatrixBackground */}
        </div>
  <div className="flex-1 p-6 overflow-y-auto font-mono text-[#ededed] text-base z-10">
          {lines.map((line, i) => (
            <div key={i} className="whitespace-pre-line" dangerouslySetInnerHTML={{ __html: line }} />
          ))}
          {booting && bootStep < bootMessages.length && (
            <div className="text-cyan-400 animate-pulse">{bootMessages[bootStep]}</div>
          )}
        </div>
        {!booting && (
          <form onSubmit={handleCommand} className="flex items-center px-6 pb-6 relative" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
            {showAutocomplete && (
              <div
                className="animate-fade-in"
                style={{
                  position: 'absolute',
                  left: '2.5rem',
                  bottom: '2.8rem',
                  background: 'linear-gradient(90deg, #23263a 80%, #a3e635 120%)',
                  border: '2px solid #a3e635',
                  borderRadius: '0.75rem',
                  boxShadow: '0 4px 24px 0 #a3e63555',
                  padding: '0.7rem 1.2rem',
                  zIndex: 100,
                  minWidth: '160px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.7em',
                }}
              >
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 800, color: '#a3e635', fontSize: '1.18rem', letterSpacing: '0.03em', textShadow: '0 0 6px #a3e63599' }}>summarize</span>
                <span style={{ fontFamily: 'Inter, sans-serif', color: '#ededed', fontSize: '1.05rem', fontWeight: 500, textShadow: '0 0 4px #23263a' }}>(press Enter)</span>
              </div>
            )}
            <div style={{ display: 'flex', width: '100%', alignItems: 'center' }}>
              <span className="font-mono text-[#a3e635]" style={{ fontWeight: 500 }}>visitor@ayushjha.dev:~$ &gt;</span>
              <input
                ref={inputRef}
                className="flex-1 bg-transparent border-none outline-none text-[#a3e635] font-mono ml-2 text-base"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={booting}
                autoFocus
              />
            </div>
          </form>
        )}
        {booting && (
          <div className="px-6 pb-6">
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-2 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.6 }}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </div>
      <style jsx>{`
        .command {
          color: #a3e635;
          font-weight: 500;
        }
        .prompt {
          color: #a3e635;
          font-weight: 500;
        }
        .summary-block {
          background: #1a2f0a !important;
          border-radius: 1.3rem !important;
          padding: 2.2rem 1.7rem !important;
          margin: 2.7rem 0 2.7rem 0 !important;
          font-family: 'Inter', 'JetBrains Mono', Arial, sans-serif !important;
          color: #eaff7a !important;
          box-shadow: 0 8px 40px 0 #a3e635cc !important;
          border: 4px solid #a3e635 !important;
        }
        .summary-title {
          font-size: 1.38rem;
          font-weight: 900;
          color: #a3e635;
          letter-spacing: 0.05em;
          font-family: 'Inter', Arial, sans-serif;
          text-shadow: 0 0 8px #a3e63599;
        }
        .summary-section {
          display: block !important;
          font-size: 1.22rem !important;
          font-family: 'JetBrains Mono', monospace !important;
          margin-bottom: 0.8rem !important;
          font-weight: 600 !important;
          color: #fffbe6 !important;
        }
        .summary-section b {
          font-family: 'Inter', Arial, sans-serif !important;
          font-weight: 900 !important;
          color: #a3e635 !important;
          font-size: 1.18rem !important;
          text-shadow: 0 0 8px #a3e635cc !important;
        }
        .summary-highlight {
          color: #a3e635 !important;
          font-weight: 900 !important;
          font-size: 1.22rem !important;
          font-family: 'Inter', Arial, sans-serif !important;
          text-shadow: 0 0 10px #a3e635cc !important;
        }
        .summary-desc {
          color: #fffbe6 !important;
          font-size: 1.22rem !important;
          font-family: 'Inter', Arial, sans-serif !important;
          font-weight: 700 !important;
        }
        .summary-hint {
          color: #a3e635 !important;
          font-size: 1.15rem !important;
          margin-top: 1.3rem !important;
          display: block !important;
          font-family: 'JetBrains Mono', monospace !important;
          text-shadow: 0 0 10px #a3e635cc !important;
        }
        .animate-fade-in {
          animation: fadeIn 0.2s ease;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </motion.div>
  );
}
