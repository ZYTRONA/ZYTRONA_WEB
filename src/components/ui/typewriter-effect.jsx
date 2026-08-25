"use client";
import React, { useEffect, useState } from "react";
import { motion } from "motion/react";

export function TypewriterEffectSmooth({ 
  words = [], 
  className = "", 
  textClassName = "",
  cursorClassName = "" 
}) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState(words[0]?.text || "");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!words || words.length === 0) return;

    const currentWord = words[currentWordIndex]?.text || "";
    let timeout;

    if (!isDeleting && currentText === currentWord) {
      // Pause at completed word before deleting
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 2400);
    } else if (isDeleting && currentText === "") {
      // Pause after word is fully deleted before typing next word
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      }, 300);
    } else {
      const len = currentText.length;
      const totalLen = currentWord.length || 1;
      
      // Dynamic typing speed: fast deletion, natural typing cadence
      let speed;
      if (isDeleting) {
        speed = 35 + Math.random() * 15;
      } else {
        const progress = len / totalLen;
        speed = 70 + progress * 35;
      }

      timeout = setTimeout(() => {
        setCurrentText(
          isDeleting
            ? currentWord.substring(0, len - 1)
            : currentWord.substring(0, len + 1)
        );
      }, speed);
    }

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex, words]);

  const wordCustomClass = words[currentWordIndex]?.className || "";

  return (
    <span className={`typewriter-container inline-flex items-center justify-center ${className}`}>
      <span className={`typewriter-text ${textClassName} ${wordCustomClass}`}>
        {currentText || "\u00A0"}
      </span>
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.65, repeat: Infinity, repeatType: "reverse" }}
        className={`typewriter-cursor ${cursorClassName}`}
        aria-hidden="true"
      />
    </span>
  );
}

export default TypewriterEffectSmooth;
