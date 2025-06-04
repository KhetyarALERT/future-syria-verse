
import React from 'react';
import { motion } from 'framer-motion';

interface EnhancedReflectionsProps {
  children: React.ReactNode;
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
  variant?: 'glow' | 'mirror' | 'depth';
}

const EnhancedReflections: React.FC<EnhancedReflectionsProps> = ({
  children,
  className = '',
  intensity = 'medium',
  variant = 'glow'
}) => {
  const getIntensityStyles = () => {
    switch (intensity) {
      case 'low':
        return 'opacity-20 blur-md';
      case 'high':
        return 'opacity-60 blur-2xl';
      default:
        return 'opacity-40 blur-lg';
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'mirror':
        return 'transform scale-y-[-1] translate-y-full';
      case 'depth':
        return 'transform scale-95 translate-y-2';
      default:
        return 'transform scale-105';
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Main content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Reflection layer */}
      <div className={`absolute inset-0 ${getIntensityStyles()} ${getVariantStyles()} pointer-events-none`}>
        {children}
      </div>
      
      {/* Additional glow for 'glow' variant */}
      {variant === 'glow' && (
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 rounded-inherit blur-xl pointer-events-none" />
      )}
    </div>
  );
};

export default EnhancedReflections;
