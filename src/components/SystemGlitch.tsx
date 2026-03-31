"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export function SystemGlitch() {
  const [text, setText] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [answer, setAnswer] = useState("");
  const [glitchError, setGlitchError] = useState("");
  const router = useRouter();
  
  const challenge = "Verification Challenge: Identify the Architect.";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(challenge.slice(0, i));
      i++;
      if (i > challenge.length) {
        clearInterval(interval);
        setTimeout(() => setShowInput(true), 500);
      }
    }, 50); // Typing speed
    
    return () => clearInterval(interval);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const expected = process.env.NEXT_PUBLIC_SECRET_ANSWER || "zion";
      if (answer.trim().toLowerCase() === expected.toLowerCase()) {
        sessionStorage.setItem("vault_access", "granted");
        router.push("/vault");
      } else {
        setGlitchError("Access Denied. Sequence aborted.");
        setAnswer("");
        setTimeout(() => setGlitchError(""), 2000);
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: 1,
        filter: [
          "brightness(1) invert(0)",
          "brightness(1.5) invert(0.2) hue-rotate(90deg)",
          "brightness(0.8) invert(1) hue-rotate(-90deg)",
          "brightness(1) invert(0)"
        ]
      }}
      transition={{ duration: 0.4, times: [0, 0.2, 0.5, 1] }}
      className="fixed inset-0 z-[9999] bg-[#0a0a0a] text-green-500 font-mono p-8 flex flex-col justify-center items-center overflow-hidden"
    >
      {/* Scanline effect */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-50 opacity-20"></div>

      <div className="max-w-xl w-full relative z-10 flex flex-col items-start space-y-6">
        <motion.p 
          className="text-xl md:text-2xl shadow-green-500/20 drop-shadow-md"
          animate={{ x: [0, -2, 2, -1, 0] }}
          transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 4 }}
        >
          {text}
          {!showInput && <span className="animate-pulse inline-block w-3 h-5 bg-green-500 ml-1 translate-y-1"></span>}
        </motion.p>
        
        {showInput && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 w-full text-xl"
          >
            <span className="animate-pulse">&gt;</span>
            <input 
              autoFocus
              type="password"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-transparent border-b border-green-500/50 outline-none text-green-500 flex-1 py-1 focus:border-green-500 transition-colors uppercase tracking-widest"
              autoComplete="off"
              spellCheck="false"
            />
          </motion.div>
        )}
        
        {glitchError && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-500 mt-4 uppercase tracking-widest text-sm"
          >
            {glitchError}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}
