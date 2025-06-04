
import React from 'react';
import { Check } from 'lucide-react';

const ContactFormSuccess: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
        <Check className="w-8 h-8 text-green-500" />
      </div>
      <h4 className="text-xl font-medium text-white mb-2">Message Sent!</h4>
      <p className="text-gray-300">
        Thank you for reaching out. We&apos;ll get back to you shortly.
      </p>
    </div>
  );
};

export default ContactFormSuccess;
