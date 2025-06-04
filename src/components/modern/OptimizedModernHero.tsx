
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ServiceExamples from '../ServiceExamples';
import ModernHeroBackground from './ModernHeroBackground';
import ModernHeroContent from './ModernHeroContent';
import ModernServicesGrid from './ModernServicesGrid';

interface ModernHeroProps {
  onRequestQuote: () => void;
  onChatNow: () => void;
}

const OptimizedModernHero: React.FC<ModernHeroProps> = ({
  onRequestQuote,
  onChatNow
}) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const handleServiceClick = (serviceKey: string) => {
    setSelectedService(serviceKey);
  };

  return (
    <section id="home" className={`min-h-screen bg-slate-950 relative overflow-hidden pt-16 ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Optimized Background Layers */}
      <ModernHeroBackground />

      <div className="container mx-auto px-4 py-20 relative z-10">
        {/* Enhanced Hero Content */}
        <ModernHeroContent 
          onRequestQuote={onRequestQuote}
          onChatNow={onChatNow}
        />

        {/* Optimized Services Grid */}
        <ModernServicesGrid onServiceClick={handleServiceClick} />
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

export default OptimizedModernHero;
