"use client";

import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const Projects: React.FC = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const projects = [
    {
      title: "Flight Route Optimization System",
      description: "An AI-powered system to optimize flight routes using machine learning algorithms.",
      tech: ["Python", "Machine Learning", "FastAPI"]
    },
    {
      title: "Audio Recognition System",
      description: "A deep learning-based system for recognizing audio patterns and speech.",
      tech: ["Python", "Deep Learning", "TensorFlow"]
    },
    {
      title: "Interactive Portfolio",
      description: "A dynamic portfolio showcasing AI and backend development skills.",
      tech: ["Next.js", "TypeScript", "FastAPI"]
    }
  ];

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]));
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]));

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    if (hoveredProject === index) {
      const rect = e.currentTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseX.set((e.clientX - centerX) / rect.width);
      mouseY.set((e.clientY - centerY) / rect.height);
    }
  };

  return (
    <section id="projects" className="py-24">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-white text-center mb-16">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="bg-white/5 backdrop-blur-2xl border border-white/20 rounded-2xl p-6 cursor-pointer"
              style={{
                rotateX: hoveredProject === index ? rotateX : 0,
                rotateY: hoveredProject === index ? rotateY : 0,
                transformStyle: "preserve-3d",
              }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
              onMouseMove={(e) => handleMouseMove(e, index)}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 25px 50px -12px rgba(168, 85, 247, 0.25)",
              }}
            >
              <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
              <p className="text-gray-300 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, i) => (
                  <motion.span
                    key={i}
                    className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-3 py-1 rounded-full text-sm"
                    whileHover={{
                      backgroundColor: "rgba(168, 85, 247, 0.3)",
                      borderColor: "rgba(168, 85, 247, 0.5)",
                      boxShadow: "0 0 20px rgba(168, 85, 247, 0.5)",
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;