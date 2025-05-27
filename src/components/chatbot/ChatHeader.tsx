
import React from 'react';
import { Bot, X, Minimize2, Maximize2 } from 'lucide-react';
import { Language, ChatLabels } from './types';

interface ChatHeaderProps {
  isMinimized: boolean;
  setIsMinimized: (minimized: boolean) => void;
  setIsOpen: (open: boolean) => void;
  language: Language;
  setLanguage: (language: Language) => void;
  t: ChatLabels;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  isMinimized,
  setIsMinimized,
  setIsOpen,
  language,
  setLanguage,
  t
}) => {
  return (
    <div className={`flex items-center justify-between p-4 border-b border-gray-200 dark:border-slate-600 rounded-t-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="flex items-center gap-2">
        <Bot className="w-5 h-5" />
        <span className={`font-semibold ${language === 'ar' ? 'font-arabic' : ''}`}>{t.title}</span>
      </div>
      
      <div className="flex items-center gap-2">
        {/* Language Toggle */}
        <div className="flex gap-1">
          <button
            onClick={() => setLanguage('ar')}
            className={`px-2 py-1 rounded text-xs ${language === 'ar' ? 'bg-white/20' : 'bg-white/10 hover:bg-white/20'}`}
          >
            ع
          </button>
          <button
            onClick={() => setLanguage('en')}
            className={`px-2 py-1 rounded text-xs ${language === 'en' ? 'bg-white/20' : 'bg-white/10 hover:bg-white/20'}`}
          >
            EN
          </button>
        </div>
        
        <button
          onClick={() => setIsMinimized(!isMinimized)}
          className="p-1 hover:bg-white/20 rounded"
        >
          {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
        </button>
        
        <button
          onClick={() => setIsOpen(false)}
          className="p-1 hover:bg-white/20 rounded"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
