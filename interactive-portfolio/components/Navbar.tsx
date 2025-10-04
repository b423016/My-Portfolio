"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Navbar: React.FC = () => {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 10) {
        setShow(true);
      } else if (currentScrollY > lastScrollY) {
        setShow(false); // scrolling down
      } else {
        setShow(true); // scrolling up
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-lg border border-white/20 rounded-b-2xl mx-4 mt-4 p-4"
      initial={{ y: 0 }}
      animate={{ y: show ? 0 : -120 }}
  transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      <div className="flex justify-between items-center">
        <div className="text-white font-bold text-xl">Ayush Kumar Jha</div>
        <div className="flex space-x-6">
          <motion.a
            href="#home"
            className="text-white hover:text-gray-300"
            whileHover={{ scale: 1.1, y: -2 }}
          >
            Home
          </motion.a>
          <motion.a
            href="#projects"
            className="text-white hover:text-gray-300"
            whileHover={{ scale: 1.1, y: -2 }}
          >
            Projects
          </motion.a>
          <motion.a
            href="#skills"
            className="text-white hover:text-gray-300"
            whileHover={{ scale: 1.1, y: -2 }}
          >
            Skills
          </motion.a>
          <motion.a
            href="#experience"
            className="text-white hover:text-gray-300"
            whileHover={{ scale: 1.1, y: -2 }}
          >
            Experience
          </motion.a>
          <motion.a
            href="#contact"
            className="text-white hover:text-gray-300"
            whileHover={{ scale: 1.1, y: -2 }}
          >
            Contact
          </motion.a>
        </div>
        <div className="flex space-x-4">
          <motion.a
            href="https://github.com/b423016"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300"
            whileHover={{ scale: 1.1, y: -2 }}
          >
            GitHub
          </motion.a>
          <motion.a
            href="https://linkedin.com/in/ayush-jha-196470287"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300"
            whileHover={{ scale: 1.1, y: -2 }}
          >
            LinkedIn
          </motion.a>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;