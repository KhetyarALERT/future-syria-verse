
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useTranslation } from 'react-i18next';

export const useAdvancedAIAgent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { i18n } = useTranslation();

  const sendMessageToAI = async (message: string, conversationHistory: any[] = []) => {
    setIsLoading(true);
    
    try {
      console.log('Sending message to AI:', message);
      
      // Get company knowledge and recent inquiries for context
      const [servicesResponse, inquiriesResponse] = await Promise.allSettled([
        supabase.from('service_examples').select('service_type').limit(10),
        supabase.from('inquiries').select('name, inquiry_text').order('created_at', { ascending: false }).limit(5)
      ]);

      const companyKnowledge = {
        services: servicesResponse.status === 'fulfilled' 
          ? servicesResponse.value.data?.map(item => item.service_type) || []
          : ['Logo Design', 'Website Development', 'E-commerce', 'Social Media', 'AI Solutions'],
        paymentMethods: ['Stripe', 'Bank Transfer', 'Cryptocurrency'],
        locations: 'Global with focus on Arabic region'
      };

      const recentInquiries = inquiriesResponse.status === 'fulfilled' 
        ? inquiriesResponse.value.data || []
        : [];

      const { data, error } = await supabase.functions.invoke('openrouter-ai-chat', {
        body: {
          message,
          conversationHistory,
          language: i18n.language,
          companyKnowledge,
          recentInquiries
        }
      });

      console.log('Supabase function response:', data, error);

      if (error) {
        console.error('Supabase function error:', error);
        throw error;
      }

      if (!data || !data.response) {
        throw new Error('No response from AI service');
      }

      return data.response;
    } catch (error) {
      console.error('AI response error:', error);
      
      // Return a helpful fallback response in the user's language
      const fallbackResponse = i18n.language === 'ar' 
        ? 'مرحباً! أنا مساعد DigitalPro الذكي، وأنا هنا لمساعدتك في جميع احتياجاتك الرقمية. نحن نقدم خدمات تصميم الشعارات (من 50$)، تطوير المواقع (من 200$)، المتاجر الإلكترونية، إدارة وسائل التواصل، والحلول الذكية. كيف يمكنني مساعدتك اليوم؟'
        : 'Hello! I\'m DigitalPro\'s AI assistant, and I\'m here to help you with all your digital needs. We offer logo design (from $50), website development (from $200), e-commerce solutions, social media management, and smart solutions. How can I help you today?';
      
      return fallbackResponse;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    sendMessageToAI,
    isLoading
  };
};
