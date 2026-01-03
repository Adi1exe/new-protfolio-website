"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function AnimatedLogo() {
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentPhrase, setCurrentPhrase] = useState(0);

  const phrases = ["Adi ;", "Aditya Dolas ;"];

  useEffect(() => {
    const currentText = phrases[currentPhrase];
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseDuration = 1500;

    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      // Typing phase
      if (displayedText.length < currentText.length) {
        timeout = setTimeout(() => {
          setDisplayedText(currentText.slice(0, displayedText.length + 1));
        }, typingSpeed);
      } else {
        // Pause before deleting
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDuration);
      }
    } else {
      // Deleting phase
      if (displayedText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
        }, deletingSpeed);
      } else {
        // Move to next phrase
        setIsDeleting(false);
        setCurrentPhrase((prev) => (prev + 1) % phrases.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentPhrase]);

  return (
    <motion.a
      href="#hero"
      className="text-xl font-bold tracking-tight"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="inline-block">
        {displayedText}
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.6, repeat: Infinity }}
          className="inline-block"
        >
          |
        </motion.span>
      </span>
    </motion.a>
  );
}
