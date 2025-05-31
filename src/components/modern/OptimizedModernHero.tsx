
import React, { useState, useMemo, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Palette, Package, Star, TrendingUp, Share2, Headphones, Globe, Bot, Building2, Zap, Sparkles, Eye, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ServiceExamples from '../ServiceExamples';

interface ModernHeroProps {
  onRequestQuote: () => void;
  onChatNow: () => void;
}

const OptimizedModernHero: React.FC<ModernHeroProps> = ({
  onRequestQuote,
  onChatNow
}) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();

  // Memoized services data for better performance
  const services = useMemo(() => [
    { key: 'logoDesign', icon: Palette, gradient: 'from-purple-500 to-pink-500', color: 'purple' },
    { key: 'productPackaging', icon: Package, gradient: 'from-blue-500 to-cyan-500', color: 'blue' },
    { key: 'branding', icon: Star, gradient: 'from-yellow-500 to-orange-500', color: 'yellow' },
    { key: 'marketing', icon: TrendingUp, gradient: 'from-green-500 to-emerald-500', color: 'green' },
    { key: 'socialMedia', icon: Share2, gradient: 'from-pink-500 to-rose-500', color: 'pink' },
    { key: 'smartCX', icon: Headphones, gradient: 'from-indigo-500 to-purple-500', color: 'indigo' },
    { key: 'webDevelopment', icon: Globe, gradient: 'from-cyan-500 to-blue-500', color: 'cyan' },
    { key: 'personalAssistant', icon: Bot, gradient: 'from-violet-500 to-purple-500', color: 'violet' },
    { key: 'erp', icon: Building2, gradient: 'from-slate-500 to-gray-500', color: 'slate' }
  ], []);

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
    setSelectedService(serviceKey);
  }, []);

  const handleServiceHover = useCallback((serviceKey: string | null) => {
    setHoveredService(serviceKey);
  }, []);

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
    <section id="home" className={`min-h-screen bg-slate-950 relative overflow-hidden pt-16 ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Optimized Background Layers */}
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

      <div className="container mx-auto px-4 py-20 relative z-10">
        {/* Enhanced Hero Content */}
        <motion.div
          className="text-center mb-20"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeInUp} className="mb-8">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 rounded-full text-cyan-400 font-medium text-sm mb-6 backdrop-blur-sm">
              <motion.div
                animate={prefersReducedMotion ? {} : { rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-4 h-4" />
              </motion.div>
              <span>{i18n.language === 'ar' ? '🚀 مرحباً بك في المستقبل الرقمي' : '🚀 Welcome to the Digital Future'}</span>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            </div>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 bg-gradient-to-r from-white via-cyan-400 to-purple-400 bg-clip-text text-transparent font-futuristic"
          >
            {t('hero.title')}
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-xl md:text-2xl text-gray-300 mb-6 max-w-4xl mx-auto leading-relaxed"
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.p
            variants={fadeInUp}
            className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            {t('hero.description')}
          </motion.p>

          {/* Enhanced CTA Buttons */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={onRequestQuote}
                size="lg"
                className="group relative bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 hover:from-cyan-500 hover:via-blue-500 hover:to-purple-500 text-white px-12 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-2xl hover:shadow-cyan-500/25 border border-cyan-500/30 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                <span className="relative z-10 flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  {t('hero.requestQuote')}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={onChatNow}
                variant="outline"
                size="lg"
                className="group border-2 border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 hover:text-white px-12 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 backdrop-blur-sm relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 to-purple-500/0 group-hover:from-cyan-500/20 group-hover:to-purple-500/20 transition-all duration-300" />
                <span className="relative z-10 flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  {t('hero.chatNow')}
                  <Eye className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </span>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Optimized Services Grid */}
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
      </div>

      {/* Service Examples Modal */}
      <ServiceExamples
        serviceKey={selectedService || ''}
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
        onGetQuote={() => {
          setSelectedService(null);
          onChatNow();
        }}
      />
    </section>
  );
};

export default OptimizedModernHero;
