"use client";

import React from 'react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  const nameVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      textShadow: "0 0 20px rgba(168, 85, 247, 0.8), 0 0 40px rgba(168, 85, 247, 0.6)",
      transition: { duration: 0.8 }
    },
  };

  const name = "Ayush Kumar Jha";
  const nameWords = name.split(" ");
  const title = "Software Developer";

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden py-20">
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, rgba(147, 51, 234, 0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 40% 80%, rgba(236, 72, 153, 0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 50%, rgba(147, 51, 234, 0.3) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />

      <div className="text-center relative z-10">
        <motion.h1
          className="text-6xl font-bold text-white mb-4"
          variants={nameVariants}
          initial="hidden"
          animate="visible"
        >
          {nameWords.map((word, wordIndex) => (
            <span key={wordIndex} className="inline-block mr-6">
              {word.split("").map((char, charIndex) => (
                <motion.span
                  key={`${wordIndex}-${charIndex}`}
                  variants={letterVariants}
                  className="inline-block"
                  animate={{
                    textShadow: [
                      "0 0 20px rgba(168, 85, 247, 0.8), 0 0 40px rgba(168, 85, 247, 0.6)",
                      "0 0 30px rgba(168, 85, 247, 1), 0 0 60px rgba(168, 85, 247, 0.8)",
                      "0 0 20px rgba(168, 85, 247, 0.8), 0 0 40px rgba(168, 85, 247, 0.6)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  {char}
                </motion.span>
              ))}
            </span>
          ))}
        </motion.h1>
        <motion.h2
          className="text-3xl text-gray-300 mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          {title}
        </motion.h2>
        <motion.p
          className="text-lg text-gray-400 mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          Turning ideas into powerful, elegant software.
        </motion.p>
        {/* Removed: Ask my AI assistant about my work */}
      </div>
    </section>
  );
};

export default Hero;