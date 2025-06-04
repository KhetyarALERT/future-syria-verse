
import React, { useState } from 'react';
import { AuthProvider } from '@/hooks/useAuth';
import FuturisticNavigation from './FuturisticNavigation';
import FuturisticHero from './FuturisticHero';
import ContactSection from './ContactSection';
import IntelligentChatWidget from './IntelligentChatWidget';
import SmartContactForm from './SmartContactForm';
import PromotionCard from './PromotionCard';
import EnhancedReflections from './EnhancedReflections';

const EnhancedFuturisticApp: React.FC = () => {
  const [showContactForm, setShowContactForm] = useState(false);

  const handleChatFormSuggestion = () => {
    setShowContactForm(true);
  };

  const handleContactFormClose = () => {
    setShowContactForm(false);
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact-section');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900/20 to-purple-900/30 text-white overflow-hidden">
        {/* Navigation */}
        <FuturisticNavigation />

        {/* Hero Section */}
        <EnhancedReflections variant="glow" intensity="low">
          <FuturisticHero />
        </EnhancedReflections>

        {/* Premium Benefits Section */}
        <section className="relative py-20">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-900/10 to-transparent" />
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent">
                Exclusive Launch Benefits
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Every service includes premium bonuses designed to accelerate your success in the digital economy
              </p>
            </div>
            
            <PromotionCard onGetStarted={() => setShowContactForm(true)} />
          </div>
        </section>

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
