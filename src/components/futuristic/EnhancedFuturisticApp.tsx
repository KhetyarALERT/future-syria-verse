
import React, { useState } from 'react';
import { AuthProvider } from '@/hooks/useAuth';
import FuturisticNavigation from './FuturisticNavigation';
import FuturisticHero from './FuturisticHero';
import ContactSection from './ContactSection';
import IntelligentChatWidget from './IntelligentChatWidget';
import SmartContactForm from './SmartContactForm';

const EnhancedFuturisticApp: React.FC = () => {
  const [showContactForm, setShowContactForm] = useState(false);

  const handleChatFormSuggestion = () => {
    setShowContactForm(true);
  };

  const handleContactFormClose = () => {
    setShowContactForm(false);
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900/20 to-purple-900/30 text-white overflow-hidden">
        {/* Navigation */}
        <FuturisticNavigation />

        {/* Hero Section */}
        <FuturisticHero />

        {/* Contact Section */}
        <ContactSection />

        {/* Intelligent Chat Widget */}
        <IntelligentChatWidget onFormSuggestion={handleChatFormSuggestion} />

        {/* Smart Contact Form Modal */}
        {showContactForm && (
          <SmartContactForm onClose={handleContactFormClose} />
        )}
      </div>
    </AuthProvider>
  );
};

export default EnhancedFuturisticApp;
