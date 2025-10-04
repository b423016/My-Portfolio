"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface SkillNode {
  id: string;
  name: string;
  x: number;
  y: number;
  size: number;
  connections: string[];
  category: 'core' | 'tool' | 'framework';
}

const Skills: React.FC = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [skillNodes, setSkillNodes] = useState<SkillNode[]>([]);

  useEffect(() => {
    // Define enhanced skill nodes with updated technical skills and better positioning
    const nodes: SkillNode[] = [
      // Core Programming Languages (largest nodes, central positions)
      { id: 'python', name: 'Python', x: 35, y: 35, size: 85, connections: ['fastapi', 'generativeai', 'transformers', 'async'], category: 'core' },
      { id: 'java', name: 'Java', x: 25, y: 65, size: 75, connections: ['spring', 'oops'], category: 'core' },
  // { id: 'javascript', name: 'JavaScript', x: 65, y: 55, size: 70, connections: ['nextjs', 'react'], category: 'core' },
      { id: 'sql', name: 'SQL', x: 50, y: 20, size: 65, connections: ['dbms', 's3'], category: 'core' },

      // AI/ML & Advanced Technologies (medium-large nodes)
  // { id: 'generativeai', name: 'Generative AI', x: 15, y: 35, size: 60, connections: ['python', 'openai', 'rag'], category: 'framework' },
      { id: 'transformers', name: 'Transformers', x: 45, y: 45, size: 55, connections: ['python', 'deeplearning'], category: 'framework' },
      { id: 'deeplearning', name: 'Deep Learning', x: 30, y: 50, size: 58, connections: ['python', 'nvidia'], category: 'framework' },
      { id: 'rag', name: 'RAG', x: 10, y: 55, size: 45, connections: ['generativeai'], category: 'framework' },
  // { id: 'openai', name: 'OpenAI API', x: 5, y: 45, size: 48, connections: ['generativeai'], category: 'framework' },

      // Backend Frameworks & APIs
      { id: 'fastapi', name: 'FastAPI', x: 55, y: 30, size: 52, connections: ['python', 'async'], category: 'framework' },
      { id: 'spring', name: 'Spring Boot', x: 15, y: 75, size: 50, connections: ['java'], category: 'framework' },

      // Frontend Technologies
  // { id: 'nextjs', name: 'Next.js', x: 85, y: 40, size: 48, connections: [], category: 'framework' },
  // { id: 'react', name: 'React', x: 80, y: 65, size: 45, connections: [], category: 'framework' },

      // DevOps & Cloud Tools
      { id: 'docker', name: 'Docker', x: 40, y: 75, size: 42, connections: ['awsec2'], category: 'tool' },
      { id: 'awsec2', name: 'AWS EC2', x: 60, y: 75, size: 45, connections: ['s3'], category: 'tool' },
      { id: 's3', name: 'Amazon S3', x: 70, y: 25, size: 40, connections: ['sql'], category: 'tool' },
      { id: 'redis', name: 'Redis', x: 85, y: 55, size: 38, connections: [], category: 'tool' },

      // Development Tools
      { id: 'git', name: 'Git', x: 75, y: 80, size: 35, connections: ['github'], category: 'tool' },
      { id: 'github', name: 'GitHub', x: 85, y: 75, size: 32, connections: ['git'], category: 'tool' },
      { id: 'pytest', name: 'Pytest', x: 25, y: 25, size: 35, connections: ['python'], category: 'tool' },
      { id: 'postman', name: 'Postman', x: 75, y: 45, size: 35, connections: [], category: 'tool' },
      { id: 'superset', name: 'Superset', x: 90, y: 35, size: 35, connections: [], category: 'tool' },
      { id: 'alembic', name: 'Alembic', x: 35, y: 80, size: 32, connections: [], category: 'tool' },
      { id: 'linux', name: 'Linux', x: 60, y: 85, size: 38, connections: [], category: 'tool' },
      { id: 'nvidia', name: 'NVIDIA AI', x: 45, y: 60, size: 40, connections: ['deeplearning'], category: 'tool' },

      // Core Fundamentals
      { id: 'dbms', name: 'DBMS', x: 65, y: 15, size: 40, connections: ['sql', 'oops'], category: 'core' },
      { id: 'oops', name: 'OOP', x: 15, y: 85, size: 40, connections: ['java'], category: 'core' },
      { id: 'os', name: 'OS', x: 50, y: 85, size: 38, connections: [], category: 'core' },
      { id: 'dsa', name: 'DSA', x: 80, y: 15, size: 40, connections: [], category: 'core' },
      { id: 'design', name: 'Software Design', x: 90, y: 25, size: 42, connections: [], category: 'core' },
      { id: 'async', name: 'Async Programming', x: 65, y: 40, size: 45, connections: ['python', 'fastapi'], category: 'framework' },
    ];

    setSkillNodes(nodes);
  }, []);

  const getNodeColor = (category: string) => {
    switch (category) {
      case 'core': return 'from-purple-500 to-pink-500'; // Core languages & fundamentals
      case 'framework': return 'from-cyan-500 to-blue-500'; // Frameworks & advanced tech
      case 'tool': return 'from-green-500 to-emerald-500'; // Tools & DevOps
      default: return 'from-gray-500 to-gray-400';
    }
  };

  const getConnectedProjects = (skillId: string) => {
    const projectConnections: { [key: string]: string[] } = {
      python: ['Flight Route Optimization', 'Audio Recognition System', 'Interactive Portfolio Backend'],
      java: ['Flight Route Optimization', 'Enterprise Applications'],
      javascript: ['Interactive Portfolio', 'Web Applications'],
      sql: ['Flight Route Optimization', 'Data Analytics Projects'],
      generativeai: ['AI Chatbot', 'Content Generation Systems'],
      transformers: ['Audio Recognition System', 'NLP Projects'],
      deeplearning: ['Audio Recognition System', 'ML Models'],
      fastapi: ['Flight Route Optimization', 'Interactive Portfolio Backend'],
      nextjs: ['Interactive Portfolio', 'Modern Web Apps'],
      react: ['Interactive Portfolio', 'Frontend Applications'],
      docker: ['Flight Route Optimization', 'Containerized Applications'],
      awsec2: ['Cloud Deployments', 'Scalable Applications'],
      redis: ['Caching Systems', 'Real-time Applications'],
      pytest: ['Python Testing', 'Quality Assurance'],
      git: ['All Projects', 'Version Control'],
    };
    return projectConnections[skillId] || [];
  };

  return (
    <section id="skills" className="py-24 relative">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-white text-center mb-16">Skills Constellation</h2>

        {/* Skill Constellation */}
        <div className="relative h-[500px] w-full max-w-6xl mx-auto bg-gradient-to-br from-slate-900/50 to-purple-900/30 rounded-3xl backdrop-blur-xl border border-white/10 overflow-hidden mb-12">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Connection lines */}
            {skillNodes.map((node) =>
              node.connections.map((connectionId) => {
                const connectedNode = skillNodes.find(n => n.id === connectionId);
                if (!connectedNode) return null;

                const isHighlighted = hoveredSkill === node.id || hoveredSkill === connectionId;

                return (
                  <motion.line
                    key={`${node.id}-${connectionId}`}
                    x1={`${node.x}%`}
                    y1={`${node.y}%`}
                    x2={`${connectedNode.x}%`}
                    y2={`${connectedNode.y}%`}
                    stroke={isHighlighted ? "#a855f7" : "#374151"}
                    strokeWidth={isHighlighted ? "2" : "1"}
                    opacity={isHighlighted ? 0.8 : 0.3}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                );
              })
            )}
          </svg>

          {/* Skill nodes */}
          {skillNodes.map((node, index) => {
            const isHovered = hoveredSkill === node.id;
            const isConnected = hoveredSkill && (
              skillNodes.find(n => n.id === hoveredSkill)?.connections.includes(node.id) ||
              node.connections.includes(hoveredSkill!)
            );

            return (
              <motion.div
                key={node.id}
                className="absolute cursor-pointer"
                style={{
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: 1, 
                  opacity: 1,
                  y: [0, -5, 0],
                }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  y: {
                    duration: 3 + (index % 3),
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
                onMouseEnter={() => setHoveredSkill(node.id)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                <motion.div
                  className={`relative rounded-full bg-gradient-to-br ${getNodeColor(node.category)} backdrop-blur-sm border border-white/20 flex items-center justify-center text-white font-semibold shadow-lg text-center leading-tight`}
                  style={{
                    width: node.size,
                    height: node.size,
                    fontSize: Math.max(node.size * 0.12, 8),
                    padding: '4px',
                  }}
                  whileHover={{
                    scale: 1.2,
                    boxShadow: "0 0 30px rgba(168, 85, 247, 0.6)",
                  }}
                  animate={{
                    scale: isHovered ? 1.2 : (isConnected ? 1.1 : 1),
                    boxShadow: isHovered
                      ? "0 0 30px rgba(168, 85, 247, 0.8)"
                      : (isConnected ? "0 0 20px rgba(168, 85, 247, 0.4)" : "0 0 10px rgba(255, 255, 255, 0.1)"),
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {node.name}

                  {/* Tooltip */}
                  {isHovered && (
                    <motion.div
                      className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-lg border border-white/20 rounded-lg px-3 py-2 text-sm text-white whitespace-nowrap z-10"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div className="font-semibold">{node.name}</div>
                      {getConnectedProjects(node.id).length > 0 && (
                        <div className="text-xs text-gray-300 mt-1">
                          Used in: {getConnectedProjects(node.id).join(', ')}
                        </div>
                      )}
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex justify-center mt-8 space-x-8">
          <motion.div 
            className="flex items-center space-x-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-500"></div>
            <span className="text-white text-sm font-medium">Core Skills & Languages</span>
          </motion.div>
          <motion.div 
            className="flex items-center space-x-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
          >
            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500"></div>
            <span className="text-white text-sm font-medium">AI/ML & Frameworks</span>
          </motion.div>
          <motion.div 
            className="flex items-center space-x-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-green-500 to-emerald-500"></div>
            <span className="text-white text-sm font-medium">DevOps & Tools</span>
          </motion.div>
        </div>

        {/* Skills Summary */}
        <motion.div 
          className="mt-12 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-lg rounded-2xl p-4 border border-purple-500/20">
              <h4 className="text-purple-300 font-semibold mb-2">Languages & DB</h4>
              <p className="text-gray-300 text-sm">Python, Java, JavaScript, SQL, Amazon S3</p>
            </div>
            <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 backdrop-blur-lg rounded-2xl p-4 border border-cyan-500/20">
              <h4 className="text-cyan-300 font-semibold mb-2">AI/ML Stack</h4>
              <p className="text-gray-300 text-sm">Deep Learning, Transformers, NVIDIA AI</p>
            </div>
            <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 backdrop-blur-lg rounded-2xl p-4 border border-green-500/20">
              <h4 className="text-green-300 font-semibold mb-2">Technologies</h4>
              <p className="text-gray-300 text-sm">FastAPI, Redis, Docker, AWS EC2, Git, Pytest, Postman, Async Programming</p>
            </div>
            <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 backdrop-blur-lg rounded-2xl p-4 border border-indigo-500/20">
              <h4 className="text-indigo-300 font-semibold mb-2">Core Fundamentals</h4>
              <p className="text-gray-300 text-sm">DBMS, OOP, Operating Systems, DSA, Software Design Patterns</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;