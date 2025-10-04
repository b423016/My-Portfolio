"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, Target, Code, Star } from 'lucide-react';

const Achievements: React.FC = () => {
  const achievements = [
    {
      title: "Knight at LeetCode",
      description: "Achieved Knight status through consistent problem-solving and algorithmic excellence. Top 5% global ranking with 500+ problems solved.",
      icon: Trophy,
      color: "from-yellow-500 to-orange-500",
      stats: {
        rank: "Top 5%",
        problems: "500+",
        rating: "Knight"
      },
  date: "2025"
    },
    {
      title: "Pupil at CodeForces",
      description: "Competitive programming excellence on CodeForces platform with consistent contest participation and algorithmic problem solving.",
      icon: Code,
      color: "from-blue-500 to-purple-500",
      stats: {
        rating: "1200+",
        rankings: "3+ Top 1000",
        rank: "Pupil"
      },
  date: "2025"
    },
    {
      title: "D3 Hackathon Winner",
      description: "Won first place in D3 Hackathon with innovative AI-powered solution, competing against 200+ teams nationwide.",
      icon: Award,
      color: "from-green-500 to-emerald-500",
      stats: {
        position: "1st Place",
        teams: "200+",
        prize: "Winner"
      },
      date: "2024"
    }
  ];

  const StatCard: React.FC<{ label: string; value: string; delay: number }> = ({ label, value, delay }) => (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
      viewport={{ once: true }}
    >
      <div className="text-white font-bold text-lg">{value}</div>
      <div className="text-gray-400 text-xs">{label}</div>
    </motion.div>
  );

  return (
    <section id="achievements" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.h2 
          className="text-4xl font-bold text-white text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Achievements & Recognition
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            
            return (
              <motion.div
                key={index}
                className="relative group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="bg-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 h-full relative overflow-hidden">
                  {/* Background Glow Effect */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${achievement.color} opacity-10 rounded-3xl`}
                    whileHover={{ opacity: 0.2 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Floating Icon */}
                  <motion.div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${achievement.color} flex items-center justify-center mb-6 relative z-10`}
                    whileHover={{ 
                      scale: 1.1,
                      rotate: 5,
                      boxShadow: "0 10px 30px rgba(255, 255, 255, 0.2)"
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <Icon className="text-white" size={28} />
                  </motion.div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-white mb-3">{achievement.title}</h3>
                    <p className="text-gray-300 text-sm mb-6 leading-relaxed">{achievement.description}</p>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-white/5 rounded-2xl border border-white/10">
                      {Object.entries(achievement.stats).map(([key, value], statIndex) => (
                        <StatCard
                          key={key}
                          label={key.charAt(0).toUpperCase() + key.slice(1)}
                          value={value}
                          delay={index * 0.2 + statIndex * 0.1 + 0.5}
                        />
                      ))}
                    </div>

                    {/* Date Badge */}
                    <div className="flex justify-between items-center">
                      <motion.div
                        className={`px-3 py-1 rounded-full bg-gradient-to-r ${achievement.color} text-white text-xs font-semibold`}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: index * 0.2 + 0.8, duration: 0.3, type: "spring" }}
                        viewport={{ once: true }}
                      >
                        {achievement.date}
                      </motion.div>
                      
                      <motion.div
                        className="flex space-x-1"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: index * 0.2 + 1 }}
                        viewport={{ once: true }}
                      >
                        {[...Array(3)].map((_, starIndex) => (
                          <motion.div
                            key={starIndex}
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            transition={{ 
                              delay: index * 0.2 + 1 + starIndex * 0.1,
                              duration: 0.2
                            }}
                            viewport={{ once: true }}
                          >
                            <Star className="text-yellow-400 fill-current" size={16} />
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>
                  </div>

                  {/* Hover Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl border-2 border-transparent"
                    whileHover={{
                      borderImage: `linear-gradient(45deg, ${achievement.color.split(' ')[1]}, ${achievement.color.split(' ')[3]}) 1`,
                      boxShadow: `0 0 30px rgba(255, 255, 255, 0.1)`
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Stats Summary */}
        <motion.div
          className="mt-16 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
            <h4 className="text-2xl font-bold text-white text-center mb-8">Competitive Programming Journey</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-purple-400 mb-2">620+</div>
                <div className="text-gray-300">Problems Solved</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-400 mb-2">3+</div>
                <div className="text-gray-300">Top 1000 Rankings</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-400 mb-2">Top 5%</div>
                <div className="text-gray-300">Global Ranking</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Achievements;