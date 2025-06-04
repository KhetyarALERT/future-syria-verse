
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  inquiryType: 'general' | 'service_inquiry' | 'support_request' | 'complaint' | 'suggestion';
}

interface ContactFormFieldsProps {
  formData: FormData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  user: any;
}

const ContactFormFields: React.FC<ContactFormFieldsProps> = ({ formData, onInputChange, user }) => {
  return (
    <>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-200 mb-1">
          Your Name
        </label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={onInputChange}
          required
          placeholder="John Doe"
          className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
        />
      </div>
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-1">
          Email Address
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={onInputChange}
          required
          placeholder="you@example.com"
          className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
          disabled={!!user}
        />
      </div>
      
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-200 mb-1">
          Phone Number (Optional)
        </label>
        <Input
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={onInputChange}
          placeholder="+1 (123) 456-7890"
          className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
        />
      </div>
      
      <div>
        <label htmlFor="inquiryType" className="block text-sm font-medium text-gray-200 mb-1">
          Inquiry Type
        </label>
        <select
          id="inquiryType"
          name="inquiryType"
          value={formData.inquiryType}
          onChange={onInputChange}
          required
          className="w-full rounded-md border border-white/20 bg-white/10 py-2 px-3 text-white placeholder:text-gray-400"
        >
          <option value="general" className="bg-gray-900">General Inquiry</option>
          <option value="service_inquiry" className="bg-gray-900">Service Inquiry</option>
          <option value="support_request" className="bg-gray-900">Support Request</option>
          <option value="suggestion" className="bg-gray-900">Suggestion</option>
        </select>
      </div>
      
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-200 mb-1">
          Your Message
        </label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={onInputChange}
          required
          placeholder="How can we help you?"
          rows={4}
          className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
        />
      </div>
    </>
  );
};

export default ContactFormFields;
