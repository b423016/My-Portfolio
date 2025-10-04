"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Bot, User, Sparkles, MessageCircle } from 'lucide-react';
import { usePerformance } from '../contexts/PerformanceContext';

interface Message {
  role: 'user' | 'ai';
  content: string;
}

const AIChatbot: React.FC = () => {
  const { incrementApiCall } = usePerformance();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setTyping(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/chatbot`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: input }),
      });
      const data = await response.json();
      const aiMessage: Message = { role: 'ai', content: data.answer };
      setMessages(prev => [...prev, aiMessage]);
      incrementApiCall();
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = { role: 'ai', content: 'Sorry, I encountered an error.' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setTyping(false);
    }
  };

  return (
    <motion.div 
      className="relative bg-gradient-to-br from-indigo-900/80 to-purple-800/80 backdrop-blur-2xl border border-indigo-700/50 rounded-3xl p-8 w-full shadow-2xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ 
        boxShadow: "0 0 40px rgba(139, 92, 246, 0.3)",
        borderColor: "rgba(139, 92, 246, 0.5)"
      }}
    >
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl">
        <motion.div
          className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-br from-violet-400/20 to-purple-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 20, 0],
            y: [0, -15, 0],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br from-indigo-400/20 to-blue-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, -15, 0],
            y: [0, 10, 0],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10">
        <motion.h3 
          className="text-2xl font-bold bg-gradient-to-r from-white to-violet-200 bg-clip-text text-transparent mb-6 flex items-center gap-3"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <MessageCircle className="text-violet-400" size={24} />
          AI Assistant
          <Sparkles className="text-yellow-400 animate-pulse" size={20} />
        </motion.h3>
        
        {/* Chat Messages */}
        <motion.div 
          className="h-80 overflow-y-auto mb-6 p-6 bg-slate-900/50 rounded-2xl border border-slate-700/30 scrollbar-thin scrollbar-thumb-violet-500/30 scrollbar-track-transparent"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          {messages.length === 0 && (
            <motion.div
              className="flex flex-col items-center justify-center h-full text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Bot className="mb-2" size={32} />
              <p className="text-sm text-center">Start a conversation about Ayush's projects!</p>
            </motion.div>
          )}
          
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              className={`mb-4 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className={`flex items-start gap-3 max-w-2xl ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <motion.div
                  className={`p-2 rounded-full ${msg.role === 'user' ? 'bg-gradient-to-br from-blue-500 to-blue-600' : 'bg-gradient-to-br from-violet-500 to-purple-600'}`}
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {msg.role === 'user' ? (
                    <User size={16} className="text-white" />
                  ) : (
                    <Bot size={16} className="text-white" />
                  )}
                </motion.div>
                <motion.div
                  className={`p-3 rounded-2xl shadow-lg ${
                    msg.role === 'user' 
                      ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white' 
                      : 'bg-gradient-to-br from-slate-700 to-slate-600 text-white border border-slate-500/30'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {msg.content}
                </motion.div>
              </div>
            </motion.div>
          ))}
          
          {typing && (
            <motion.div
              className="mb-4 flex justify-start"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-gradient-to-br from-violet-500 to-purple-600">
                  <Bot size={16} className="text-white" />
                </div>
                <div className="p-3 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-600 text-white border border-slate-500/30">
                  <div className="flex items-center gap-1">
                    <span>AI is thinking</span>
                    <motion.div
                      className="flex gap-1"
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <div className="w-1 h-1 bg-violet-400 rounded-full" />
                      <div className="w-1 h-1 bg-purple-400 rounded-full" />
                      <div className="w-1 h-1 bg-indigo-400 rounded-full" />
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Input Area */}
        <motion.div 
          className="flex gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex-1 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Ask about Ayush's projects..."
              className="w-full p-3 bg-slate-900/70 border border-slate-600/50 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-violet-500/70 focus:ring-2 focus:ring-violet-500/30 transition-all duration-300"
            />
            <motion.div
              className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-violet-500/10 to-transparent pointer-events-none"
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}
            />
          </div>
          <motion.button
            onClick={sendMessage}
            disabled={typing || !input.trim()}
            className="p-3 bg-gradient-to-br from-violet-500 to-purple-600 text-white rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(139, 92, 246, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Send size={20} />
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AIChatbot;