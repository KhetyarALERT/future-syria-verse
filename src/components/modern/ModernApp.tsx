
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ModernNavigation from './ModernNavigation';
import ModernHero from './ModernHero';
import QuoteModal from './QuoteModal';
import ModernChat from './ModernChat';
import ChatWidget from './ChatWidget';
import { Toaster } from '@/components/ui/toaster';

const ModernApp: React.FC = () => {
  const { i18n } = useTranslation();
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    // Set document direction based on language
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <ModernNavigation />
      
      <ModernHero 
        onRequestQuote={() => setIsQuoteModalOpen(true)}
        onChatNow={() => setIsChatOpen(true)}
      />

      {!isChatOpen && (
        <ChatWidget onClick={() => setIsChatOpen(true)} />
      )}

      <QuoteModal 
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />

      <ModernChat 
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />

      <Toaster />
    </div>
  );
};

export default ModernApp;
