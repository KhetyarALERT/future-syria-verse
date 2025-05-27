
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import ServicesOverview from '../components/ServicesOverview';
import VirtualOffice from '../components/VirtualOffice';
import GameOnboarding from '../components/GameOnboarding';
import Footer from '../components/Footer';
import ThemeProvider from '../components/ThemeProvider';
import ChatBot from '../components/ChatBot';
import ServicePage from '../components/ServicePage';
import RequirementForm from '../components/RequirementForm';
import InquiryPage from './InquiryPage';
import InquiryDashboard from '../components/InquiryDashboard';
import { Toaster } from "@/components/ui/toaster";

const Index = () => {
  const [showGameOnboarding, setShowGameOnboarding] = useState(false);
  const [showVirtualTour, setShowVirtualTour] = useState(false);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-purple-900 transition-all duration-300">
        <Navigation 
          onGameStart={() => setShowGameOnboarding(true)}
          onVirtualTour={() => setShowVirtualTour(true)}
        />
        
        <Routes>
          <Route path="/" element={
            <main className="relative">
              <Hero onGameStart={() => setShowGameOnboarding(true)} />
              <ServicesOverview />
              <section id="contact" className="py-20">
                <div className="container mx-auto px-4 text-center">
                  <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">
                    Ready to Transform Your Business?
                  </h2>
                  <RequirementForm />
                </div>
              </section>
            </main>
          } />
          <Route path="/services/logo-design" element={<ServicePage service="logo-design" />} />
          <Route path="/services/website-development" element={<ServicePage service="website-development" />} />
          <Route path="/services/ecommerce" element={<ServicePage service="ecommerce" />} />
          <Route path="/services/ai-assistants" element={<ServicePage service="ai-assistants" />} />
          <Route path="/services/automation" element={<ServicePage service="automation" />} />
          <Route path="/requirements" element={<RequirementForm />} />
          <Route path="/inquiry" element={<InquiryPage />} />
          <Route path="/dashboard" element={<InquiryDashboard />} />
        </Routes>

        {showGameOnboarding && (
          <GameOnboarding onClose={() => setShowGameOnboarding(false)} />
        )}

        {showVirtualTour && (
          <VirtualOffice onClose={() => setShowVirtualTour(false)} />
        )}

        <Footer />
        <ChatBot />
        <Toaster />
      </div>
    </ThemeProvider>
  );
};

export default Index;
