"use client";

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { usePerformance } from '../contexts/PerformanceContext';
import { motion } from 'framer-motion';
import { Activity, TrendingUp, Zap, BarChart3 } from 'lucide-react';

const PerformanceDashboard: React.FC = () => {
  const { apiCallCount, data } = usePerformance();

  const stats = [
    { label: 'API Calls', value: apiCallCount, icon: Zap, color: 'from-blue-400 to-blue-600' },
    { label: 'Avg Response', value: '125ms', icon: Activity, color: 'from-emerald-400 to-emerald-600' },
    { label: 'Success Rate', value: '99.2%', icon: TrendingUp, color: 'from-purple-400 to-purple-600' },
  ];

  return (
    <motion.div
      className="relative bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-2xl border border-slate-700/50 rounded-3xl p-8 shadow-2xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ 
        boxShadow: "0 0 40px rgba(34, 197, 94, 0.3)",
        borderColor: "rgba(34, 197, 94, 0.5)"
      }}
    >
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl">
        <motion.div
          className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-emerald-400/20 to-blue-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="relative z-10">
        <motion.h3 
          className="text-2xl font-bold bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent mb-6 flex items-center gap-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <BarChart3 className="text-emerald-400" size={24} />
          Live Performance Dashboard
        </motion.h3>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className={`relative bg-gradient-to-br ${stat.color} p-4 rounded-2xl shadow-lg`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm font-medium">{stat.label}</p>
                  <motion.p 
                    className="text-white text-xl font-bold"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
                  >
                    {stat.value}
                  </motion.p>
                </div>
                <stat.icon className="text-white/80" size={20} />
              </div>
              <motion.div
                className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 + index }}
              />
            </motion.div>
          ))}
        </div>

        {/* Chart */}
        <motion.div 
          className="bg-slate-900/50 rounded-2xl p-4 border border-slate-700/30"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
        >
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" opacity={0.3} />
              <XAxis 
                dataKey="time" 
                stroke="#94a3b8" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="#94a3b8" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15, 23, 42, 0.9)',
                  border: '1px solid rgba(34, 197, 94, 0.3)',
                  borderRadius: '12px',
                  color: '#ffffff',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)'
                }}
                cursor={{ stroke: '#10b981', strokeWidth: 2, strokeDasharray: '5 5' }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#10b981"
                strokeWidth={3}
                fill="url(#colorGradient)"
                dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: '#10b981', stroke: '#ffffff', strokeWidth: 2 }}
                animationDuration={1000}
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PerformanceDashboard;