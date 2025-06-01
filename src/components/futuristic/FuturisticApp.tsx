
import React from 'react';
import FuturisticNavigation from './FuturisticNavigation';
import FuturisticHero from './FuturisticHero';
import FuturisticChatWidget from './FuturisticChatWidget';
import ContactSection from './ContactSection';

const FuturisticApp: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <FuturisticNavigation />
      <section id="home">
        <FuturisticHero />
      </section>
      
      {/* Floating Chat */}
      <FuturisticChatWidget />
      
      {/* Services Section */}
      <section id="services" className="min-h-screen flex items-center justify-center relative py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.2),rgba(255,255,255,0))]"></div>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
            Our Premium Services
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Explore our cutting-edge digital solutions designed to transform your business with AI-powered innovation and future-ready technology.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <ServiceCard 
              title="Logo Design" 
              description="AI-powered brand identity creation with unique, memorable designs"
              linkTo="/services/logo-design"
            />
            <ServiceCard 
              title="Web Development" 
              description="Modern, responsive websites built with cutting-edge technology"
              linkTo="/services/web-development"
            />
            <ServiceCard 
              title="AI Assistants" 
              description="Intelligent chatbots and virtual assistants for business automation"
              linkTo="/services/ai-assistants"
            />
          </div>
          
          <a 
            href="/services" 
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-full text-white font-medium"
          >
            View All Services
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </a>
        </div>
      </section>
      
      {/* Portfolio Section */}
      <section id="portfolio" className="min-h-screen flex items-center justify-center relative py-20 bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(120,119,198,0.2),rgba(255,255,255,0))]"></div>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
            Your Portfolio
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Track your service inquiries and project progress with us.
          </p>
          
          <div className="mb-12 bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10">
            <h3 className="text-2xl font-semibold text-white mb-4">Your Projects & Inquiries</h3>
            <p className="text-gray-300 mb-6">
              Sign in to view your service inquiries and track their progress.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <a 
                href="/auth" 
                className="px-6 py-3 bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl text-white transition-colors"
              >
                Sign In to View Portfolio
              </a>
              <a 
                href="/portfolio" 
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl text-white"
              >
                Browse Portfolio
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <ContactSection />
    </div>
  );
};

interface ServiceCardProps {
  title: string;
  description: string;
  linkTo: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, linkTo }) => {
  return (
    <a 
      href={linkTo}
      className="group bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden transition-all duration-300 hover:transform hover:scale-[1.02] hover:border-white/30"
    >
      <div className="aspect-video bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
        <span className="text-white/50">Service Preview</span>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors">{title}</h3>
        <p className="text-gray-300 mb-4">{description}</p>
        <div className="flex items-center text-blue-400 font-medium">
          <span>Learn more</span>
          <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </div>
      </div>
    </a>
  );
};

export default FuturisticApp;
