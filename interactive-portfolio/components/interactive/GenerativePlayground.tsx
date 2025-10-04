"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { usePerformance } from '../contexts/PerformanceContext';

const GenerativePlayground: React.FC = () => {
  const { incrementApiCall } = usePerformance();
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    if (!prompt) return;
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/generate-thumbnail`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      setImageUrl(data.imageUrl);
      incrementApiCall();
      incrementApiCall(); // Increment the API call count
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
      <h3 className="text-xl font-bold text-white mb-4">Generative AI Playground</h3>
      <div className="mb-4">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter a prompt for image generation"
          className="w-full p-2 bg-white/20 border border-white/30 rounded text-white placeholder-gray-300"
        />
        <button
          onClick={generateImage}
          disabled={loading}
          className="mt-2 px-4 py-2 bg-purple-500 text-white rounded disabled:opacity-50"
        >
          Generate
        </button>
      </div>
      {loading && (
        <motion.div
          className="w-16 h-16 bg-white/20 rounded-full mx-auto"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      )}
      {imageUrl && !loading && (
        <motion.img
          src={imageUrl}
          alt="Generated"
          className="w-full max-w-md mx-auto rounded"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
      )}
    </div>
  );
};

export default GenerativePlayground;