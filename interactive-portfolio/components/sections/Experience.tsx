"use client";

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Experience: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const experiences = [
    {
      title: "AI Engineer Intern",
      company: "PrepAiro",
      location: "Remote",
      description: "Engineered and deployed a multimodal AI service using FastAPI, enhancing core application features to improve the user experience, which resulted in an 85% positive user feedback rating, as measured on the Superset analytics dashboard.",
      date: "May 2025 – June 2025",
      hasFeedback: true,
      feedbackPercentage: 85,
      achievements: [
        "Collaborated with product and engineering teams to ship key features",
        "Authored 30+ pull requests and actively participated in code reviews",
        "Maintained quality for over 500 daily active users"
      ]
    },
    {
      title: "AI Backend Developer (Freelance)",
      company: "Remote",
      location: "",
      description: "Designed and deployed RESTful APIs using FastAPI's asynchronous capabilities to achieve high-performance under concurrent loads, resulting in a 15% improvement in request throughput.",
      date: "Sep 2024 – Nov 2024",
      hasPerformance: true,
      performanceImprovement: 15,
      achievements: [
        "Built scalable backend systems for AI applications",
        "Implemented asynchronous capabilities for high-performance",
        "Optimized concurrent load handling"
      ]
    }
  ];

  const CircularProgressBar: React.FC<{ percentage: number; size?: number }> = ({
    percentage,
    size = 80
  }) => {
    const radius = (size - 8) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="4"
            fill="transparent"
          />
          {/* Progress circle */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="url(#progressGradient)"
            strokeWidth="4"
            fill="transparent"
            strokeDasharray={strokeDasharray}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset }}
            transition={{ duration: 2, ease: "easeInOut" }}
            viewport={{ once: true }}
          />
          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#34d399" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white font-bold text-sm">{percentage}%</span>
        </div>
      </div>
    );
  };

  return (
    <section id="experience" className="py-24">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-white text-center mb-16">Experience</h2>
        <div className="relative max-w-5xl mx-auto">
          {/* Glowing data stream line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full">
            <motion.div
              className="w-full h-full bg-gradient-to-b from-cyan-400 via-purple-500 to-pink-500 rounded-full"
              animate={{
                boxShadow: [
                  "0 0 20px rgba(168, 85, 247, 0.8), 0 0 40px rgba(168, 85, 247, 0.6)",
                  "0 0 30px rgba(34, 211, 238, 0.8), 0 0 60px rgba(34, 211, 238, 0.6)",
                  "0 0 20px rgba(168, 85, 247, 0.8), 0 0 40px rgba(168, 85, 247, 0.6)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Pulsing effect */}
            <motion.div
              className="absolute top-0 w-full h-20 bg-gradient-to-b from-cyan-400/50 to-transparent rounded-full blur-sm"
              animate={{ y: ["0%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          </div>

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className={`flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'} mb-20 relative`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              {/* Connection branch */}
              <motion.div
                className={`absolute top-1/2 transform -translate-y-1/2 ${
                  index % 2 === 0 ? 'right-0' : 'left-0'
                } w-8 h-0.5 bg-gradient-to-r ${
                  index % 2 === 0 ? 'from-purple-500 to-transparent' : 'from-transparent to-purple-500'
                }`}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
                viewport={{ once: true }}
              />

              <motion.div
                className="bg-white/5 backdrop-blur-2xl border border-white/20 rounded-2xl p-8 max-w-lg relative"
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 20px 40px rgba(168, 85, 247, 0.2)",
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-white mb-1">{exp.title}</h3>
                  <div className="flex items-center text-purple-300 text-sm mb-2">
                    <span className="font-semibold">{exp.company}</span>
                    {exp.location && <span className="mx-2">•</span>}
                    {exp.location && <span>{exp.location}</span>}
                  </div>
                  <p className="text-cyan-400 font-semibold text-sm">{exp.date}</p>
                </div>
                
                <p className="text-gray-300 mb-4 leading-relaxed">{exp.description}</p>

                {/* Key Achievements */}
                {exp.achievements && (
                  <div className="mb-4">
                    <h4 className="text-white font-semibold mb-2 text-sm">Key Achievements:</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      {exp.achievements.map((achievement, idx) => (
                        <motion.li
                          key={idx}
                          className="flex items-start"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 + 0.5 }}
                          viewport={{ once: true }}
                        >
                          <span className="text-green-400 mr-2 text-xs">▸</span>
                          <span>{achievement}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Metrics Display */}
                <div className="flex justify-between items-center mt-6">
                  {exp.hasFeedback && (
                    <div className="flex items-center space-x-3">
                      <div>
                        <p className="text-white text-xs font-medium">User Feedback</p>
                        <p className="text-green-400 text-sm font-bold">{exp.feedbackPercentage}% Positive</p>
                      </div>
                      <CircularProgressBar percentage={exp.feedbackPercentage!} size={60} />
                    </div>
                  )}

                  {exp.hasPerformance && (
                    <div className="flex items-center space-x-3">
                      <div>
                        <p className="text-white text-xs font-medium">Performance Improvement</p>
                        <p className="text-blue-400 text-sm font-bold">+{exp.performanceImprovement}% Throughput</p>
                      </div>
                      <motion.div
                        className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: 0.8, duration: 0.5, type: "spring" }}
                        viewport={{ once: true }}
                      >
                        +{exp.performanceImprovement}%
                      </motion.div>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;