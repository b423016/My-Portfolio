import React from 'react';
import AlgorithmSandbox from '../interactive/AlgorithmSandbox';
import PerformanceDashboard from '../interactive/PerformanceDashboard';
// import AIChatbot from '../interactive/AIChatbot';

const Interactive: React.FC = () => {
  return (
    <section id="interactive" className="py-24">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-white text-center mb-16">Interactive Modules</h2>
        
        {/* Top row - Two main modules with increased size */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto mb-12">
          <AlgorithmSandbox />
          <PerformanceDashboard />
        </div>
        
        {/* Bottom row removed: AI Chatbot was here */}
      </div>
    </section>
  );
};

export default Interactive;