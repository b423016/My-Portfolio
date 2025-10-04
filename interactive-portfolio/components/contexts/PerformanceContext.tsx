"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PerformanceContextType {
  apiCallCount: number;
  incrementApiCall: () => void;
  data: { time: number; value: number }[];
}

const PerformanceContext = createContext<PerformanceContextType | undefined>(undefined);

export const usePerformance = () => {
  const context = useContext(PerformanceContext);
  if (!context) {
    throw new Error('usePerformance must be used within a PerformanceProvider');
  }
  return context;
};

interface PerformanceProviderProps {
  children: ReactNode;
}

export const PerformanceProvider: React.FC<PerformanceProviderProps> = ({ children }) => {
  const [apiCallCount, setApiCallCount] = useState(0);
  const [data, setData] = useState<{ time: number; value: number }[]>([
    { time: 0, value: 10 },
    { time: 1, value: 15 },
    { time: 2, value: 12 },
    { time: 3, value: 18 },
    { time: 4, value: 20 },
  ]);

  const incrementApiCall = () => {
    setApiCallCount(prev => prev + 1);
    // Simulate a spike in the chart
    const newTime = data.length;
    const spikeValue = Math.max(...data.map(d => d.value)) + 50;
    setData(prev => [...prev, { time: newTime, value: spikeValue }]);
    // After a delay, add a normal value
    setTimeout(() => {
      setData(prev => [...prev, { time: newTime + 1, value: 15 + Math.random() * 10 }]);
    }, 1000);
  };

  return (
    <PerformanceContext.Provider value={{ apiCallCount, incrementApiCall, data }}>
      {children}
    </PerformanceContext.Provider>
  );
};