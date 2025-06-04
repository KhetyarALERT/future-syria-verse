
import React, { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Sparkles, Zap, Eye, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ModernHeroContentProps {
  onRequestQuote: () => void;
  onChatNow: () => void;
}

const ModernHeroContent: React.FC<ModernHeroContentProps> = ({
  onRequestQuote,
  onChatNow
}) => {
  const { t, i18n } = useTranslation();
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

  return (
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
  );
};

export default ModernHeroContent;
