
import React, { useRef } from 'react';
import { useInView } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import ContactHeader from './ContactHeader';
import ContactInfo from './ContactInfo';
import ContactForm from './ContactForm';

const ContactSection: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { user } = useAuth();

  return (
    <section ref={ref} id="contact-section" className="min-h-screen relative py-20">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 z-0"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <ContactHeader isInView={isInView} user={user} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          <ContactInfo isInView={isInView} />
          <ContactForm isInView={isInView} />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
