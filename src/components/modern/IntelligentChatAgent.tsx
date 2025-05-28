
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface UserInfo {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  serviceNeeded?: string;
  budget?: string;
  timeline?: string;
  description?: string;
  [key: string]: string | undefined;
}

interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export const useIntelligentAgent = () => {
  const { i18n } = useTranslation();
  const { toast } = useToast();
  const [userInfo, setUserInfo] = useState<UserInfo>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [isCollectingInfo, setIsCollectingInfo] = useState(false);

  const collectionSteps = [
    { key: 'name', question: 'What\'s your name?', validation: (value: string) => value.length > 1 },
    { key: 'email', question: 'What\'s your email address?', validation: (value: string) => /\S+@\S+\.\S+/.test(value) },
    { key: 'phone', question: 'What\'s your phone number? (optional)', validation: () => true },
    { key: 'company', question: 'What\'s your company name? (optional)', validation: () => true },
    { key: 'serviceNeeded', question: 'Which service are you interested in?', validation: (value: string) => value.length > 0 },
    { key: 'budget', question: 'What\'s your budget range? (optional)', validation: () => true },
    { key: 'timeline', question: 'When do you need this completed?', validation: (value: string) => value.length > 0 },
    { key: 'description', question: 'Please describe your project in detail:', validation: (value: string) => value.length > 10 }
  ];

  const getAIResponse = (userMessage: string, messages: ChatMessage[]): string => {
    const lowerMessage = userMessage.toLowerCase();

    // Check if user wants to start info collection
    if (lowerMessage.includes('quote') || lowerMessage.includes('price') || lowerMessage.includes('cost') || 
        lowerMessage.includes('service') || lowerMessage.includes('help') || lowerMessage.includes('project')) {
      if (!isCollectingInfo && !userInfo.name) {
        setIsCollectingInfo(true);
        setCurrentStep(0);
        return "I'd be happy to help you with that! To provide you with the best service and accurate quote, I need to collect some information. " + collectionSteps[0].question;
      }
    }

    // If we're collecting info, handle the current step
    if (isCollectingInfo && currentStep < collectionSteps.length) {
      const step = collectionSteps[currentStep];
      if (step.validation(userMessage)) {
        setUserInfo(prev => ({ ...prev, [step.key]: userMessage }));
        
        if (currentStep + 1 < collectionSteps.length) {
          setCurrentStep(currentStep + 1);
          return `Great! ${collectionSteps[currentStep + 1].question}`;
        } else {
          // All info collected
          setIsCollectingInfo(false);
          saveToSupabase();
          return "Perfect! I have all the information I need. Our team will review your requirements and get back to you within 24 hours with a detailed proposal. Is there anything else you'd like to know about our services?";
        }
      } else {
        return `Please provide a valid ${step.key.replace(/([A-Z])/g, ' $1').toLowerCase()}. ${step.question}`;
      }
    }

    // Regular responses
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return "Hello! Welcome to DigitalPro. I'm here to help you with our premium digital solutions. What can I assist you with today?";
    }

    if (lowerMessage.includes('services') || lowerMessage.includes('what do you')) {
      return "We offer comprehensive digital solutions including:\n• Logo Design & Branding\n• Product & Packaging Design\n• Marketing & Social Media Management\n• Smart CX Systems\n• Web & E-commerce Development\n• AI Personal Assistants\n• Full Company ERP Solutions\n\nWhich service interests you most?";
    }

    if (lowerMessage.includes('contact') || lowerMessage.includes('reach')) {
      return "You can reach us through:\n• This chat (I'm available 24/7)\n• Email: contact@digitalpro.com\n• Our inquiry form\n\nI can also connect you with our human team for complex discussions. How would you prefer to proceed?";
    }

    return "I understand you're asking about that. I'm here to help with information about our services, pricing, and to collect your project requirements. Could you tell me more about what you're looking for?";
  };

  const saveToSupabase = async () => {
    try {
      const inquiryText = `Service: ${userInfo.serviceNeeded || 'Not specified'}
Budget: ${userInfo.budget || 'Not specified'}
Timeline: ${userInfo.timeline || 'Not specified'}
Company: ${userInfo.company || 'Not specified'}
Description: ${userInfo.description || 'Not specified'}`;

      const { error } = await supabase
        .from('inquiries')
        .insert({
          name: userInfo.name || 'Chat User',
          email: userInfo.email || 'pending@digitalpro.com',
          phone: userInfo.phone || null,
          inquiry_type: 'general' as const,
          inquiry_text: inquiryText,
          language: i18n.language,
          metadata: {
            source: 'intelligent_chat_agent',
            userInfo: JSON.parse(JSON.stringify(userInfo)),
            timestamp: new Date().toISOString()
          }
        });

      if (error) throw error;

      toast({
        title: "Information saved successfully",
        description: "Our team will contact you soon.",
      });

    } catch (error) {
      console.error('Error saving to Supabase:', error);
      toast({
        title: "Error saving information",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    }
  };

  return {
    getAIResponse,
    userInfo,
    isCollectingInfo,
    currentStep,
    collectionSteps
  };
};
