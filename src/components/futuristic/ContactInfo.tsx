
import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ContactInfoProps {
  isInView: boolean;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ isInView }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="space-y-8"
    >
      <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10">
        <h3 className="text-2xl font-semibold text-white mb-6">Contact Information</h3>
        
        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <div className="bg-blue-600/20 p-3 rounded-lg">
              <Mail className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Email us at</p>
              <a href="mailto:hello@digitalpro.ai" className="text-white hover:text-blue-400 transition-colors">hello@digitalpro.ai</a>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="bg-purple-600/20 p-3 rounded-lg">
              <Phone className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Call us at</p>
              <a href="tel:+11234567890" className="text-white hover:text-purple-400 transition-colors">+1 (123) 456-7890</a>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="bg-pink-600/20 p-3 rounded-lg">
              <MapPin className="w-6 h-6 text-pink-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Visit our office</p>
              <address className="not-italic text-white">
                123 Innovation Street<br />
                Tech Valley, CA 94103
              </address>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10">
        <h3 className="text-2xl font-semibold text-white mb-4">AI Consultation</h3>
        <p className="text-gray-300 mb-6">
          Want immediate assistance? Chat with our AI consultant to get quick answers.
        </p>
        <Button
          onClick={() => document.getElementById('chat-trigger')?.click()}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
        >
          <MessageSquare className="w-5 h-5 mr-2" />
          Start AI Chat
        </Button>
      </div>
    </motion.div>
  );
};

export default ContactInfo;
