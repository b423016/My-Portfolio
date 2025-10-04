"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <motion.footer
      className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-t-2xl mx-4 mb-4 p-4"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-center items-center space-x-6">
        <motion.a
          href="https://github.com/b423016"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1, y: -2 }}
        >
          <Github className="text-white w-6 h-6" />
        </motion.a>
        <motion.a
          href="https://linkedin.com/in/ayush-jha-196470287"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1, y: -2 }}
        >
          <Linkedin className="text-white w-6 h-6" />
        </motion.a>
        <motion.a
          href="mailto:ayushjha4277@gmail.com"
          whileHover={{ scale: 1.1, y: -2 }}
        >
          <Mail className="text-white w-6 h-6" />
        </motion.a>
      </div>
      <div className="text-center text-white mt-2">
        © 2025 Ayush Kumar Jha. All rights reserved.
      </div>
    </motion.footer>
  );
};

export default Footer;