"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, FileText, Sun, Moon, Hexagon, Database, Brain, CheckCircle2, Terminal } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const resumes = [
  {
    type: "SDE",
    title: "Software Development Engineer Resume",
    description: "Emphasizes web development, scalable backends, React, Next.js, and cloud deployments.",
    file: process.env.NEXT_PUBLIC_RESUME_SDE as string
  },
  {
    type: "AI",
    title: "AI/ML Engineer Resume",
    description: "Focuses on predictive analytics, model training, NLP, computer vision, and data pipelines.",
    file: process.env.NEXT_PUBLIC_RESUME_AI as string
  },
  {
    type: "QA",
    title: "Quality Assurance Resume",
    description: "Focuses on testing, automation, performance optimization, and ensuring software reliability.",
    file: process.env.NEXT_PUBLIC_RESUME_QA as string
  },
  {
    type: "Python",
    title: "Python Developer Resume",
    description: "Focuses on Python development, automation, data processing, and backend development.",
    file: process.env.NEXT_PUBLIC_RESUME_PY as string
  }
];

const HexTechNode = ({ type }: { type: string }) => {
  if (type === "SDE") {
    return (
      <div className="relative w-full h-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 200 100">
           <motion.path
             d="M100 35 L100 65 L60 85 M100 65 L140 85"
             stroke="#22c55e"
             strokeWidth="2"
             fill="none"
             className="opacity-20"
             initial={{ pathLength: 0, opacity: 0 }}
             animate={{ pathLength: 1, opacity: 0.8 }}
             transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" }}
           />
        </svg>
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute top-[20%]">
          <Hexagon className="w-12 h-12 text-green-500/30" strokeWidth={1} />
        </motion.div>
        <Database className="absolute top-[26%] w-5 h-5 text-green-500/80" />
        
        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} className="absolute bottom-[20%] left-[26%]">
          <Hexagon className="w-8 h-8 text-green-500/50" strokeWidth={1.5} />
        </motion.div>
        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }} className="absolute bottom-[20%] right-[26%]">
          <Hexagon className="w-8 h-8 text-green-500/50" strokeWidth={1.5} />
        </motion.div>
      </div>
    );
  }

  if (type === "AI") {
    return (
      <div className="relative w-full h-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 200 100">
           {[
             "M50 30 L100 50", "M50 70 L100 50", "M100 50 L150 30", "M100 50 L150 70", "M50 30 L50 70", "M150 30 L150 70"
           ].map((path, i) => (
             <motion.path
               key={i}
               d={path}
               stroke="#22c55e"
               strokeWidth="1.5"
               fill="none"
               className="opacity-20"
               initial={{ opacity: 0 }}
               animate={{ opacity: [0.1, 0.6, 0.1] }}
               transition={{ duration: Math.random() * 2 + 1, repeat: Infinity, delay: Math.random() }}
             />
           ))}
        </svg>
        <Brain className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-green-500/80 z-10" />
        
        {[
          { top: '15%', left: '21%' },
          { top: '65%', left: '21%' },
          { top: '15%', left: '71%' },
          { top: '65%', left: '71%' },
        ].map((pos, i) => (
          <motion.div 
            key={i}
            className="absolute"
            style={pos}
            animate={{ rotate: -360 }} 
            transition={{ duration: 15 + i, repeat: Infinity, ease: "linear" }}
          >
            <Hexagon className="w-8 h-8 text-green-500/40" strokeWidth={1} />
          </motion.div>
        ))}
      </div>
    );
  }

  if (type === "QA") {
    return (
      <div className="relative w-full h-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
        <motion.div
           animate={{ scale: [1, 1.8, 2.5], opacity: [0.8, 0.3, 0] }}
           transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
           className="absolute border-2 border-green-500/40 rounded-full w-12 h-12"
        />
        <motion.div animate={{ rotate: 180 }} transition={{ duration: 4, repeat: Infinity, ease: "backInOut" }} className="absolute">
          <Hexagon className="w-16 h-16 text-green-500/30" strokeWidth={1} />
        </motion.div>
        <Hexagon className="absolute w-12 h-12 text-green-500/50 rotate-90" strokeWidth={1} />
        <CheckCircle2 className="absolute w-6 h-6 text-green-500/90" />
      </div>
    );
  }

  if (type === "Python") {
    return (
      <div className="relative w-full h-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 200 100">
           <motion.path
             d="M50 50 L80 20 L120 20 L150 50 L120 80 L80 80 Z"
             stroke="#22c55e"
             strokeWidth="2"
             fill="none"
             className="opacity-20 flex"
             initial={{ pathLength: 0 }}
             animate={{ pathLength: 1 }}
             transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
           />
        </svg>
        <Terminal className="absolute w-8 h-8 text-green-500/80" />
        {[
          { top: '10%', left: '36%' },
          { top: '10%', left: '56%' },
          { top: '80%', left: '36%' },
          { top: '80%', left: '56%' },
          { top: '45%', left: '21%' },
          { top: '45%', left: '76%' },
        ].map((pos, i) => (
          <motion.div 
            key={i}
            className="absolute"
            style={pos}
            animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.9, 0.3] }} 
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
          >
            <Hexagon className="w-4 h-4 text-green-500/70" fill="currentColor" strokeWidth={1} />
          </motion.div>
        ))}
      </div>
    );
  }

  return <FileText className="w-16 h-16 text-green-500/50" />;
};

export default function VaultPage() {
  const [isDark, setIsDark] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldBeDark = saved === "dark" || (!saved && prefersDark);
    setIsDark(shouldBeDark);
    document.documentElement.classList.toggle("dark", shouldBeDark);

    if (sessionStorage.getItem("vault_access") !== "granted") {
      router.replace("/");
    }
  }, [router]);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    document.documentElement.classList.toggle("dark", newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  return (
    <main className="min-h-screen bg-white dark:bg-[#0a0a0a] pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-start justify-between gap-4 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <p className="font-mono text-sm text-green-500 tracking-widest uppercase">
                System Override Active
              </p>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Secret Vault
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl text-lg leading-relaxed">
              Unauthorized access logged. Welcome to the classified documents archive.
              Select a profile below to download the corresponding dossier.
            </p>
          </motion.div>

          <motion.button
            onClick={toggleTheme}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative w-10 h-10 rounded-full bg-secondary flex items-center justify-center overflow-hidden shrink-0 mt-2 z-10"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle theme"
          >
            <AnimatePresence mode="wait">
              {isDark ? (
                <motion.div
                  key="sun"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Sun size={18} />
                </motion.div>
              ) : (
                <motion.div
                  key="moon"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Moon size={18} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resumes.map((resume, index) => (
            <motion.article
              key={resume.title}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.2 + index * 0.15,
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative bg-card rounded-2xl overflow-hidden border border-border hover:border-green-500/50 transition-all duration-500"
            >
              <div className="aspect-video overflow-hidden relative bg-muted/30 dark:bg-[#0a0f0d] flex flex-col items-center justify-center border-b border-border">
                <HexTechNode type={resume.type} />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-80 pointer-events-none" />
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl font-semibold group-hover:text-green-500 transition-colors duration-300">
                    {resume.title}
                  </h3>
                  <div className="flex items-center gap-2 relative z-10 shrink-0">
                    <motion.a
                      href={resume.file}
                      download
                      className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-green-500 hover:border-green-500 transition-all duration-300 bg-card"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={`Download ${resume.title}`}
                    >
                      <Download size={18} />
                    </motion.a>
                  </div>
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed">
                  {resume.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
        
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 1 }}
           className="mt-16 flex justify-center"
        >
          <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-full font-medium text-sm hover:bg-foreground hover:text-background transition-all duration-300">
            &larr; Return to Surface
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
