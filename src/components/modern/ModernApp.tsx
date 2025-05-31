
import React, { useState, useEffect, Suspense, lazy } from 'react';
import { useTranslation } from 'react-i18next';
import ModernNavigation from './ModernNavigation';
import OptimizedModernHero from './OptimizedModernHero';
import { Toaster } from '@/components/ui/toaster';
import { ArrowLeft, ArrowRight, User, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import type { User as SupabaseUser } from '@supabase/supabase-js';

// Lazy load components for better performance
const QuoteModal = lazy(() => import('./QuoteModal'));
const PerformanceOptimizedChat = lazy(() => import('./PerformanceOptimizedChat'));
const AuthModal = lazy(() => import('../auth/AuthModal'));

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-8">
    <Loader2 className="w-8 h-8 animate-spin text-cyan-400" />
  </div>
);

const ModernApp: React.FC = () => {
  const { i18n } = useTranslation();
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    // Set document direction based on language
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  useEffect(() => {
    // Network status monitoring
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

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
      {/* Network Status Indicator */}
      {!isOnline && (
        <div className="fixed top-0 left-0 right-0 bg-red-600 text-white text-center py-2 z-50">
          {i18n.language === 'ar' ? 'غير متصل بالإنترنت' : 'You are offline'}
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="fixed top-20 left-4 z-40 flex flex-col gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => window.history.back()}
          className="bg-slate-800/50 hover:bg-slate-700 text-white backdrop-blur-sm transition-all duration-300 hover:scale-105"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => window.history.forward()}
          className="bg-slate-800/50 hover:bg-slate-700 text-white backdrop-blur-sm transition-all duration-300 hover:scale-105"
        >
          <ArrowRight className="w-5 h-5" />
        </Button>
      </div>

      {/* Enhanced DigitalPro Branding */}
      <div className="fixed top-20 right-4 z-40">
        <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 backdrop-blur-sm border border-blue-500/30 rounded-lg px-4 py-2 hover:scale-105 transition-transform duration-300">
          <span className="text-sm font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            DigitalPro
          </span>
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse inline-block ml-2" />
        </div>
      </div>

      {/* Enhanced User Authentication Section */}
      <div className="fixed top-20 right-24 z-40">
        {user ? (
          <div className="flex items-center gap-3 bg-slate-800/50 backdrop-blur-sm rounded-lg px-4 py-2 border border-slate-600/30">
            <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="text-sm">
              <div className="text-white font-medium">
                {user.user_metadata?.full_name || user.email?.split('@')[0]}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSignOut}
                className="text-gray-400 hover:text-white p-0 h-auto font-normal"
              >
                {i18n.language === 'ar' ? 'تسجيل الخروج' : 'Sign Out'}
              </Button>
            </div>
          </div>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsAuthModalOpen(true)}
            className="text-gray-400 hover:text-white bg-slate-800/50 backdrop-blur-sm hover:bg-slate-700/50 transition-all duration-300"
          >
            <User className="w-4 h-4 mr-2" />
            {i18n.language === 'ar' ? 'تسجيل الدخول' : 'Sign In'}
          </Button>
        )}
      </div>

      <ModernNavigation />
      
      <OptimizedModernHero 
        onRequestQuote={() => setIsQuoteModalOpen(true)}
        onChatNow={() => setIsChatOpen(true)}
      />

      {/* Enhanced Chat Widget */}
      {!isChatOpen && (
        <div className="fixed bottom-6 right-6 z-40">
          <Button
            onClick={() => setIsChatOpen(true)}
            className="group bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105"
          >
            <span className="flex items-center gap-2">
              {i18n.language === 'ar' ? 'ابدأ المحادثة' : 'Chat Now'}
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            </span>
          </Button>
        </div>
      )}

      {/* Lazy Loaded Modals with Suspense */}
      <Suspense fallback={<LoadingSpinner />}>
        <QuoteModal 
          isOpen={isQuoteModalOpen}
          onClose={() => setIsQuoteModalOpen(false)}
        />
      </Suspense>

      <Suspense fallback={<LoadingSpinner />}>
        <PerformanceOptimizedChat 
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
        />
      </Suspense>

      <Suspense fallback={<LoadingSpinner />}>
        <AuthModal 
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
        />
      </Suspense>

      <Toaster />
    </div>
  );
};

export default ModernApp;
