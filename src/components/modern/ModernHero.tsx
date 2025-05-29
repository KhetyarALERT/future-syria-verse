
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  Palette, 
  Package, 
  Star, 
  TrendingUp, 
  Share2, 
  Headphones, 
  Globe, 
  Bot,
  Building2 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import ServiceExamples from '../ServiceExamples';

interface ModernHeroProps {
  onRequestQuote: () => void;
  onChatNow: () => void;
}

const ModernHero: React.FC<ModernHeroProps> = ({ onRequestQuote, onChatNow }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const services = [
    { 
      key: 'logoDesign', 
      icon: Palette, 
      gradient: 'from-purple-500 to-pink-500' 
    },
    { 
      key: 'productPackaging', 
      icon: Package, 
      gradient: 'from-blue-500 to-cyan-500' 
    },
    { 
      key: 'branding', 
      icon: Star, 
      gradient: 'from-yellow-500 to-orange-500' 
    },
    { 
      key: 'marketing', 
      icon: TrendingUp, 
      gradient: 'from-green-500 to-emerald-500' 
    },
    { 
      key: 'socialMedia', 
      icon: Share2, 
      gradient: 'from-pink-500 to-rose-500' 
    },
    { 
      key: 'smartCX', 
      icon: Headphones, 
      gradient: 'from-indigo-500 to-purple-500' 
    },
    { 
      key: 'webDevelopment', 
      icon: Globe, 
      gradient: 'from-cyan-500 to-blue-500' 
    },
    { 
      key: 'personalAssistant', 
      icon: Bot, 
      gradient: 'from-violet-500 to-purple-500' 
    },
    { 
      key: 'erp', 
      icon: Building2, 
      gradient: 'from-slate-500 to-gray-500' 
    }
  ];

  const handleServiceClick = (serviceKey: string) => {
    setSelectedService(serviceKey);
  };

  return (
    <section id="home" className={`min-h-screen bg-slate-950 relative overflow-hidden pt-16 ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-slate-950 to-purple-900/20" />
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-400 to-blue-500 bg-clip-text text-transparent"
          >
            {t('hero.title')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 mb-4 max-w-4xl mx-auto"
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg text-gray-400 mb-8 max-w-3xl mx-auto"
          >
            {t('hero.description')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              onClick={onRequestQuote}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25"
            >
              {t('hero.requestQuote')}
            </Button>
            <Button
              onClick={onChatNow}
              variant="outline"
              size="lg"
              className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 px-8 py-3 rounded-xl font-semibold transition-all duration-300"
            >
              {t('hero.chatNow')}
            </Button>
          </motion.div>
        </div>

        {/* Interactive Services Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
            {t('services.title')}
          </h2>
          <p className="text-lg text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            {t('services.subtitle')} 
            <span className="text-cyan-400 font-semibold">
              {i18n.language === 'ar' ? ' انقر على أي خدمة لرؤية مثال تفاعلي!' : ' Click any service to see an interactive example!'}
            </span>
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.key}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group p-6 bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl hover:border-cyan-500/50 transition-all duration-300 cursor-pointer"
                  onClick={() => handleServiceClick(service.key)}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${service.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    {t(`services.${service.key}.title`)}
                  </h3>
                  <p className="text-gray-400 leading-relaxed mb-3">
                    {t(`services.${service.key}.description`)}
                  </p>
                  <div className="text-sm text-cyan-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    {i18n.language === 'ar' ? 'انقر لرؤية مثال ←' : 'Click to see example →'}
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
