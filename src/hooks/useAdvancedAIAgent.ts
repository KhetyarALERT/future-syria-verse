
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
      
      // Get enhanced company knowledge, recent inquiries, and AI config for context
      const [servicesResponse, inquiriesResponse, configResponse] = await Promise.allSettled([
        supabase.from('service_examples').select('*').limit(20),
        supabase.from('inquiries').select('name, inquiry_text, inquiry_type').order('created_at', { ascending: false }).limit(10),
        supabase.from('ai_chat_config').select('*')
      ]);

      // Enhanced company knowledge with realistic data
      const serviceExamples = servicesResponse.status === 'fulfilled' 
        ? servicesResponse.value.data || []
        : [];

      const companyKnowledge = {
        services: [
          'Logo Design (starting from $50) - Premium brand identity creation',
          'Website Development (starting from $200) - Modern, responsive web solutions',
          'E-commerce Solutions (starting from $500) - Complete online stores',
          'Social Media Management ($300/month) - Full social media presence',
          'Digital Marketing Campaigns (starting from $400) - ROI-focused marketing',
          'Smart CX Systems (starting from $800) - AI-powered customer experience',
          'Personal AI Assistants (starting from $600) - Business automation',
          'ERP Solutions (starting from $1200) - Enterprise resource planning'
        ],
        serviceExamples: serviceExamples.slice(0, 10), // Include actual examples
        paymentMethods: ['Credit Card via Stripe', 'Bank Transfer', 'PayPal', 'Cryptocurrency'],
        locations: 'Global with focus on Middle East and Arabic-speaking regions',
        languages: ['English', 'Arabic'],
        specialties: [
          'Bilingual Arabic-English content creation',
          'Middle East market expertise',
          'Islamic finance compliant solutions',
          'Cultural adaptation services'
        ]
      };

      const recentInquiries = inquiriesResponse.status === 'fulfilled' 
        ? inquiriesResponse.value.data || []
        : [];

      const aiConfig = configResponse.status === 'fulfilled' 
        ? configResponse.value.data || []
        : [];

      const { data, error } = await supabase.functions.invoke('openrouter-ai-chat', {
        body: {
          message,
          conversationHistory,
          language: i18n.language,
          companyKnowledge,
          recentInquiries,
          aiConfig
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
      
      // Enhanced fallback response with more context
      const fallbackResponse = i18n.language === 'ar' 
        ? `مرحباً! أنا مساعد DigitalPro الذكي، وأنا هنا لمساعدتك في جميع احتياجاتك الرقمية. 

🎨 خدماتنا الرئيسية:
• تصميم الشعارات (من 50$)
• تطوير المواقع (من 200$) 
• المتاجر الإلكترونية (من 500$)
• إدارة وسائل التواصل (300$/شهر)
• الحملات التسويقية (من 400$)
• أنظمة تجربة العملاء الذكية (من 800$)

💬 كيف يمكنني مساعدتك اليوم؟ يمكنك:
- طلب عرض سعر مخصص
- مناقشة متطلبات مشروعك
- الاستفسار عن خدماتنا
- جدولة استشارة مجانية

أنا متاح على مدار الساعة لمساعدتك!`
        : `Hello! I'm DigitalPro's AI assistant, here to help with all your digital needs.

🎨 Our Core Services:
• Logo Design (from $50)
• Website Development (from $200)
• E-commerce Solutions (from $500)
• Social Media Management ($300/month)
• Digital Marketing Campaigns (from $400)
• Smart CX Systems (from $800)

💬 How can I help you today? You can:
- Request a custom quote
- Discuss your project requirements  
- Ask about our services
- Schedule a free consultation

I'm available 24/7 to assist you!`;
      
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
