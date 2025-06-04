
import React, { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const ModernHeroBackground: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  // Performance-optimized quantum dots
  const quantumDots = useMemo(() => 
    [...Array(8)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"
        style={{
          left: `${15 + (i * 12)}%`,
          top: `${20 + (i * 8)}%`,
        }}
        animate={prefersReducedMotion ? {} : {
          y: [-20, 20, -20],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 6 + i * 0.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: i * 0.2
        }}
      />
    )), [prefersReducedMotion]);

  return (
    <div className="absolute inset-0">
      {/* Base gradient - GPU optimized */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950/20 to-purple-950/15" />
      
      {/* Simplified grid pattern for better performance */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
          transform: 'translateZ(0)', // Force GPU acceleration
        }}
      />
      
      {/* Performance-optimized floating elements */}
      {quantumDots}
      
      {/* Ambient orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-80 h-80 opacity-10"
        animate={prefersReducedMotion ? {} : {
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <div className="w-full h-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl" />
      </motion.div>
    </div>
  );
};

export default ModernHeroBackground;
