
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { MessageCircle } from 'lucide-react';

interface ChatWidgetProps {
  onClick: () => void;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ onClick }) => {
  const { t } = useTranslation();

  return (
    <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className="fixed bottom-6 right-6 z-40 w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-full shadow-lg hover:shadow-cyan-500/25 flex items-center justify-center transition-all duration-300"
      title={t('chat.title')}
    >
      <MessageCircle className="w-7 h-7" />
      <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse" />
    </motion.button>
  );
};

export default ChatWidget;
