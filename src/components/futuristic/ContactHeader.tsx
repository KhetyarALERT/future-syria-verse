
import React from 'react';
import { motion } from 'framer-motion';

interface ContactHeaderProps {
  isInView: boolean;
  user: any;
}

const ContactHeader: React.FC<ContactHeaderProps> = ({ isInView, user }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="max-w-3xl mx-auto text-center mb-12"
    >
      <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
        Get In Touch
      </h2>
      <p className="text-xl text-gray-300">
        Ready to transform your digital presence? Reach out to us for a personalized consultation.
      </p>
      {user && (
        <p className="text-sm text-blue-400 mt-2">
          Welcome back, {user.user_metadata?.full_name || user.email}! Your details are pre-filled.
        </p>
      )}
    </motion.div>
  );
};

export default ContactHeader;
