
import React from 'react';
import FuturisticNavigation from './FuturisticNavigation';
import FuturisticHero from './FuturisticHero';
import FuturisticChat from './FuturisticChat';

const FuturisticApp: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <FuturisticNavigation />
      <section id="home">
        <FuturisticHero />
      </section>
      
      {/* Floating Chat */}
      <FuturisticChat />
      
      {/* Future sections */}
      <section id="services" className="min-h-screen flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-gray-300">Coming soon - Advanced service showcase</p>
        </div>
      </section>
      
      <section id="portfolio" className="min-h-screen flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Portfolio</h2>
          <p className="text-gray-300">Coming soon - Interactive portfolio gallery</p>
        </div>
      </section>
      
      <section id="contact" className="min-h-screen flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Contact Us</h2>
          <p className="text-gray-300">Coming soon - Smart contact system</p>
        </div>
      </section>
    </div>
  );
};

export default FuturisticApp;
