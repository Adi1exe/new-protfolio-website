"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, FileText, Sun, Moon } from "lucide-react";
import Link from "next/link";

const resumes = [
  {
    title: "Full-Stack Engineer Resume",
    description: "Emphasizes web development, scalable backends, React, Next.js, and cloud deployments.",
    file: "/resumes/Aditya_FullStack.pdf"
  },
  {
    title: "AI/ML Engineer Resume",
    description: "Focuses on predictive analytics, model training, NLP, computer vision, and data pipelines.",
    file: "/resumes/Aditya_AIML.pdf"
  },
  {
    title: "Research Assistant Resume",
    description: "Highlights academic research, published papers, experimental methodologies, and D3.js visual analytics.",
    file: "/resumes/Aditya_Research.pdf"
  }
];

export default function VaultPage() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldBeDark = saved === "dark" || (!saved && prefersDark);
    setIsDark(shouldBeDark);
    document.documentElement.classList.toggle("dark", shouldBeDark);
  }, []);

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
              <div className="aspect-video overflow-hidden relative bg-muted/30 flex flex-col items-center justify-center border-b border-border">
                <FileText className="w-16 h-16 text-muted-foreground/50 group-hover:text-green-500/80 transition-colors duration-500 mb-2 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60 pointer-events-none" />
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
