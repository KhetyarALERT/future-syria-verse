
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { MessageCircle, Sparkles } from 'lucide-react';

interface ChatWidgetProps {
  onClick: () => void;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ onClick }) => {
  const { t, i18n } = useTranslation();

  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="fixed bottom-6 right-6 z-40"
    >
      {/* Floating notification badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className={`absolute -top-16 ${i18n.language === 'ar' ? 'left-0' : 'right-0'} bg-white dark:bg-slate-800 text-slate-800 dark:text-white px-4 py-2 rounded-lg shadow-lg border border-slate-200 dark:border-slate-600 max-w-xs`}
      >
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-blue-500" />
          <span className="text-sm font-medium">
            {i18n.language === 'ar' 
              ? 'مساعد ذكي متاح الآن!'
              : 'AI Assistant Online!'
            }
          </span>
        </div>
        <div className={`absolute top-full ${i18n.language === 'ar' ? 'left-4' : 'right-4'} w-3 h-3 bg-white dark:bg-slate-800 border-r border-b border-slate-200 dark:border-slate-600 transform rotate-45 -translate-y-1.5`} />
      </motion.div>

      {/* Main chat button */}
      <motion.button
        onClick={onClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="relative w-16 h-16 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 hover:from-blue-700 hover:via-purple-700 hover:to-cyan-700 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 overflow-hidden"
        title={t('chat.title')}
      >
        {/* Animated background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Button content */}
        <div className="relative z-10 flex items-center justify-center">
          <MessageCircle className="w-7 h-7" />
        </div>
        
        {/* Pulse animation */}
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-white opacity-75"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 0, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Online indicator */}
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
          <motion.div
            className="w-2 h-2 bg-white rounded-full"
            animate={{
              scale: [1, 0.8, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </motion.button>
    </motion.div>
  );
};

export default ChatWidget;
