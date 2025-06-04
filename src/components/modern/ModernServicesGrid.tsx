
import React, { useState, useMemo, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Sparkles, ArrowRight } from 'lucide-react';
import { services } from './serviceData';

interface ModernServicesGridProps {
  onServiceClick: (serviceKey: string) => void;
}

const ModernServicesGrid: React.FC<ModernServicesGridProps> = ({
  onServiceClick
}) => {
  const { t, i18n } = useTranslation();
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();

  // Optimized animation variants
  const fadeInUp = useMemo(() => ({
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 30 },
    visible: { opacity: 1, y: 0 }
  }), [prefersReducedMotion]);

  const staggerContainer = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.1
      }
    }
  }), [prefersReducedMotion]);

  const handleServiceClick = useCallback((serviceKey: string) => {
    onServiceClick(serviceKey);
  }, [onServiceClick]);

  const handleServiceHover = useCallback((serviceKey: string | null) => {
    setHoveredService(serviceKey);
  }, []);

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="mb-20"
    >
      <div className="text-center mb-16">
        <motion.h2 
          variants={fadeInUp}
          className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent font-futuristic"
        >
          {t('services.title')}
        </motion.h2>
        <motion.p 
          variants={fadeInUp}
          className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto"
        >
          {t('services.subtitle')}
        </motion.p>
        <motion.div
          variants={fadeInUp}
          className="inline-flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 rounded-full backdrop-blur-sm"
        >
          <motion.div
            animate={prefersReducedMotion ? {} : { rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-5 h-5 text-cyan-400" />
          </motion.div>
          <span className="text-cyan-400 font-semibold">
            {i18n.language === 'ar' ? 'انقر على أي خدمة لرؤية مثال تفاعلي!' : 'Click any service to see an interactive example!'}
          </span>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {services.map((service, index) => {
          const Icon = service.icon;
          const isHovered = hoveredService === service.key;
          
          return (
            <motion.div
              key={service.key}
              variants={fadeInUp}
              whileHover={prefersReducedMotion ? {} : { y: -8, scale: 1.02 }}
              onClick={() => handleServiceClick(service.key)}
              onMouseEnter={() => handleServiceHover(service.key)}
              onMouseLeave={() => handleServiceHover(null)}
              className="group relative cursor-pointer"
            >
              <div className={`relative bg-gradient-to-br from-slate-800/60 via-slate-900/60 to-slate-800/60 backdrop-blur-xl border transition-all duration-300 rounded-3xl p-8 overflow-hidden ${
                isHovered ? 'border-cyan-500/50 shadow-2xl shadow-cyan-500/10' : 'border-slate-700/50'
              }`}>
                
                {/* Enhanced hover effects */}
                <div className={`absolute inset-0 bg-gradient-to-r transition-all duration-500 rounded-3xl ${
                  isHovered 
                    ? 'from-cyan-500/10 via-blue-500/10 to-purple-500/10' 
                    : 'from-transparent via-transparent to-transparent'
                }`} />
                
                {/* Grid overlay on hover */}
                {isHovered && (
                  <div className="absolute inset-0 opacity-20">
                    <div 
                      className="w-full h-full"
                      style={{
                        backgroundImage: `
                          linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)
                        `,
                        backgroundSize: '20px 20px'
                      }}
                    />
                  </div>
                )}
                
                <div className="relative z-10">
                  <motion.div 
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.gradient} flex items-center justify-center mb-6 transition-all duration-300`}
                    whileHover={prefersReducedMotion ? {} : { rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </motion.div>
                  
                  <h3 className={`text-2xl font-bold mb-4 font-futuristic transition-colors duration-300 ${
                    isHovered ? 'text-cyan-400' : 'text-white'
                  }`}>
                    {t(`services.${service.key}.title`)}
                  </h3>
                  
                  <p className="text-gray-400 leading-relaxed mb-6 text-base">
                    {t(`services.${service.key}.description`)}
                  </p>
                  
                  <div className={`text-sm text-cyan-400 font-medium transition-all duration-300 flex items-center gap-3 ${
                    isHovered ? 'opacity-100 translate-x-2' : 'opacity-0'
                  }`}>
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                    <span>{i18n.language === 'ar' ? 'انقر لرؤية مثال تفاعلي' : 'Click to see interactive example'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Corner accent */}
                <div className={`absolute top-4 right-4 w-3 h-3 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full transition-opacity duration-300 ${
                  isHovered ? 'opacity-100 animate-pulse' : 'opacity-0'
                }`} />
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default ModernServicesGrid;
