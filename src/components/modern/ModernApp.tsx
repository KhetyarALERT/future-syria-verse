
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ModernNavigation from './ModernNavigation';
import ModernHero from './ModernHero';
import QuoteModal from './QuoteModal';
import ModernChat from './ModernChat';
import ChatWidget from './ChatWidget';
import AuthModal from '../auth/AuthModal';
import { Toaster } from '@/components/ui/toaster';
import { ArrowLeft, ArrowRight, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import type { User as SupabaseUser } from '@supabase/supabase-js';

const ModernApp: React.FC = () => {
  const { i18n } = useTranslation();
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);

  useEffect(() => {
    // Set document direction based on language
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const isRTL = i18n.language === 'ar';

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Navigation Buttons */}
      <div className="fixed top-20 left-4 z-40 flex flex-col gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => window.history.back()}
          className="bg-slate-800/50 hover:bg-slate-700 text-white backdrop-blur-sm"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => window.history.forward()}
          className="bg-slate-800/50 hover:bg-slate-700 text-white backdrop-blur-sm"
        >
          <ArrowRight className="w-5 h-5" />
        </Button>
      </div>

      {/* DigitalPro Branding */}
      <div className="fixed top-20 right-4 z-40">
        <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 backdrop-blur-sm border border-blue-500/30 rounded-lg px-3 py-2">
          <span className="text-sm font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            DigitalPro
          </span>
        </div>
      </div>

      {/* User Authentication Section */}
      <div className="fixed top-20 right-20 z-40">
        {user ? (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-300">
              {user.user_metadata?.full_name || user.email}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSignOut}
              className="text-gray-400 hover:text-white"
            >
              {i18n.language === 'ar' ? 'تسجيل الخروج' : 'Sign Out'}
            </Button>
          </div>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsAuthModalOpen(true)}
            className="text-gray-400 hover:text-white"
          >
            <User className="w-4 h-4 mr-2" />
            {i18n.language === 'ar' ? 'تسجيل الدخول' : 'Sign In'}
          </Button>
        )}
      </div>

      <ModernNavigation />
      
      <ModernHero 
        onRequestQuote={() => setIsQuoteModalOpen(true)}
        onChatNow={() => setIsChatOpen(true)}
      />

      {!isChatOpen && (
        <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
          <Button
            onClick={() => setIsChatOpen(true)}
            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-4 py-2 rounded-full shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
          >
            {i18n.language === 'ar' ? 'ابدأ المحادثة' : 'Chat Now'}
          </Button>
          <ChatWidget onClick={() => setIsChatOpen(true)} />
        </div>
      )}

      <QuoteModal 
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />

      <ModernChat 
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      <Toaster />
    </div>
  );
};

export default ModernApp;
