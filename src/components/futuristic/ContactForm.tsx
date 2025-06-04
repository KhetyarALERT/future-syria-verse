
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '@/hooks/useAuth';
import ContactFormFields from './ContactFormFields';
import ContactFormSuccess from './ContactFormSuccess';

interface ContactFormProps {
  isInView: boolean;
}

const ContactForm: React.FC<ContactFormProps> = ({ isInView }) => {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitComplete, setIsSubmitComplete] = useState(false);
  
  const [formData, setFormData] = useState({
    name: user?.user_metadata?.full_name || '',
    email: user?.email || '',
    phone: '',
    message: '',
    inquiryType: 'general' as 'general' | 'service_inquiry' | 'support_request' | 'complaint' | 'suggestion'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('inquiries')
        .insert({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          inquiry_type: formData.inquiryType,
          inquiry_text: formData.message,
          language: 'en',
          metadata: {
            source: 'contact_form',
            user_agent: navigator.userAgent,
            timestamp: new Date().toISOString()
          }
        });
        
      if (error) throw error;
      
      setIsSubmitComplete(true);
      
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you soon.",
      });
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          name: user?.user_metadata?.full_name || '',
          email: user?.email || '',
          phone: '',
          message: '',
          inquiryType: 'general'
        });
        setIsSubmitComplete(false);
      }, 3000);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error sending message",
        description: "Please try again or contact us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10"
    >
      <h3 className="text-2xl font-semibold text-white mb-6">Send Us a Message</h3>
      
      {isSubmitComplete ? (
        <ContactFormSuccess />
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <ContactFormFields 
            formData={formData}
            onInputChange={handleInputChange}
            user={user}
          />
          
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </>
            )}
          </Button>
        </form>
      )}
    </motion.div>
  );
};

export default ContactForm;
