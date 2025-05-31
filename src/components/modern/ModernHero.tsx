
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Palette, Package, Star, TrendingUp, Share2, Headphones, Globe, Bot, Building2, Zap, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ServiceExamples from '../ServiceExamples';

interface ModernHeroProps {
  onRequestQuote: () => void;
  onChatNow: () => void;
}

const ModernHero: React.FC<ModernHeroProps> = ({
  onRequestQuote,
  onChatNow
}) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const services = [
    { key: 'logoDesign', icon: Palette, gradient: 'from-purple-500 to-pink-500' },
    { key: 'productPackaging', icon: Package, gradient: 'from-blue-500 to-cyan-500' },
    { key: 'branding', icon: Star, gradient: 'from-yellow-500 to-orange-500' },
    { key: 'marketing', icon: TrendingUp, gradient: 'from-green-500 to-emerald-500' },
    { key: 'socialMedia', icon: Share2, gradient: 'from-pink-500 to-rose-500' },
    { key: 'smartCX', icon: Headphones, gradient: 'from-indigo-500 to-purple-500' },
    { key: 'webDevelopment', icon: Globe, gradient: 'from-cyan-500 to-blue-500' },
    { key: 'personalAssistant', icon: Bot, gradient: 'from-violet-500 to-purple-500' },
    { key: 'erp', icon: Building2, gradient: 'from-slate-500 to-gray-500' }
  ];

  const handleServiceClick = (serviceKey: string) => {
    setSelectedService(serviceKey);
  };

  return (
    <section id="home" className={`min-h-screen bg-slate-950 relative overflow-hidden pt-16 ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Enhanced Futuristic Background */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950/30 to-purple-950/20" />
        
        {/* Neural network overlay */}
        <div className="absolute inset-0 neural-network opacity-30" />
        
        {/* Particle system */}
        <div className="absolute inset-0 particle-system opacity-40" />
        
        {/* Data stream background */}
        <div className="absolute inset-0 data-stream opacity-20" />
        
        {/* Holographic grid */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute inset-0 hologram"
            style={{
              backgroundImage: `
                linear-gradient(rgba(6, 182, 212, 0.2) 1px, transparent 1px),
                linear-gradient(90deg, rgba(6, 182, 212, 0.2) 1px, transparent 1px),
                linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px, 60px 60px, 120px 120px, 120px 120px'
            }}
          />
        </div>

        {/* Floating quantum dots */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute quantum-dots"
            style={{
              left: `${10 + (i * 8)}%`,
              top: `${15 + (i * 7)}%`,
            }}
            animate={{
              y: [-30, 30, -30],
              x: [-20, 20, -20],
              rotate: [0, 360],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 8 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3
            }}
          />
        ))}

        {/* Cyberpunk orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 opacity-20"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div className="w-full h-full bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-full blur-3xl glow-rainbow" />
        </motion.div>
        
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 opacity-15"
          animate={{
            scale: [1.3, 1, 1.3],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div className="w-full h-full bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-cyan-500/20 rounded-full blur-3xl glow-purple" />
        </motion.div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mb-8"
          >
            <span className="inline-block px-6 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 rounded-full text-cyan-400 font-medium text-sm mb-6 holographic-border">
              {i18n.language === 'ar' ? '🚀 مرحباً بك في المستقبل الرقمي' : '🚀 Welcome to the Digital Future'}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl font-bold mb-8 gradient-text font-futuristic cyber-glitch"
            data-text={t('hero.title')}
          >
            {t('hero.title')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-3xl text-gray-300 mb-6 max-w-4xl mx-auto neon-text"
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            {t('hero.description')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={onRequestQuote}
                size="lg"
                className="cyber-button bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 hover:from-cyan-500 hover:via-blue-500 hover:to-purple-500 text-white px-12 py-4 rounded-2xl font-semibold text-lg transition-all duration-500 transform shadow-2xl hover:shadow-cyan-500/25 border border-cyan-500/30 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative z-10 flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  {t('hero.requestQuote')}
                </span>
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={onChatNow}
                variant="outline"
                size="lg"
                className="cyber-button border-2 border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 hover:text-white px-12 py-4 rounded-2xl font-semibold text-lg transition-all duration-500 backdrop-blur-sm relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 to-purple-500/0 group-hover:from-cyan-500/20 group-hover:to-purple-500/20 transition-all duration-500" />
                <span className="relative z-10 flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  {t('hero.chatNow')}
                </span>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Enhanced Interactive Services Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mb-20"
        >
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-6 gradient-text-slow font-futuristic"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              {t('services.title')}
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
            >
              {t('services.subtitle')}
            </motion.p>
            <motion.div
              className="inline-block px-8 py-3 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 rounded-full holographic-border"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.6 }}
            >
              <span className="text-cyan-400 font-semibold flex items-center gap-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-5 h-5" />
                </motion.div>
                {i18n.language === 'ar' ? 'انقر على أي خدمة لرؤية مثال تفاعلي!' : 'Click any service to see an interactive example!'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.key}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  whileHover={{ y: -12, scale: 1.03 }}
                  onClick={() => handleServiceClick(service.key)}
                  className="group relative cursor-pointer"
                >
                  <div className="relative bg-gradient-to-br from-slate-800/60 via-slate-900/60 to-slate-800/60 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 transition-all duration-500 hover:border-cyan-500/50 overflow-hidden holographic-border">
                    {/* Hover glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-blue-500/0 to-purple-500/0 group-hover:from-cyan-500/10 group-hover:via-blue-500/10 group-hover:to-purple-500/10 transition-all duration-700 rounded-3xl" />
                    
                    {/* Cyber grid overlay */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500">
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
                    
                    <div className="relative z-10">
                      <motion.div 
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-500 animate-rotate-3d group-hover:animate-pulse-glow`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </motion.div>
                      
                      <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors duration-300 font-futuristic">
                        {t(`services.${service.key}.title`)}
                      </h3>
                      
                      <p className="text-gray-400 leading-relaxed mb-6 text-base">
                        {t(`services.${service.key}.description`)}
                      </p>
                      
                      <motion.div 
                        className="text-sm text-cyan-400 font-medium opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center gap-3"
                        initial={{ x: -10 }}
                        whileHover={{ x: 0 }}
                      >
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="w-2 h-2 bg-cyan-400 rounded-full"
                        />
                        <span>{i18n.language === 'ar' ? 'انقر لرؤية مثال تفاعلي' : 'Click to see interactive example'}</span>
                        <motion.span
                          animate={{ x: [0, 6, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="text-lg"
                        >
                          →
                        </motion.span>
                      </motion.div>
                    </div>

                    {/* Corner accent */}
                    <div className="absolute top-4 right-4 w-3 h-3 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
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

export default ModernHero;
