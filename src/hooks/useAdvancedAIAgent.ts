
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useTranslation } from 'react-i18next';

export const useAdvancedAIAgent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [shouldRedirectToForm, setShouldRedirectToForm] = useState(false);
  const { i18n } = useTranslation();

  const sendMessageToAI = async (message: string, conversationHistory: any[] = []) => {
    setIsLoading(true);
    setShouldRedirectToForm(false);
    
    try {
      console.log('Sending message to AI:', message);
      
      // Check for pricing inquiries first
      const lowerMessage = message.toLowerCase();
      if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('سعر') || lowerMessage.includes('تكلفة') || lowerMessage.includes('budget') || lowerMessage.includes('quote')) {
        setShouldRedirectToForm(true);
        return generatePriceRedirectResponse(i18n.language);
      }

      // Get enhanced company knowledge without pricing
      const [servicesResponse, inquiriesResponse, configResponse] = await Promise.allSettled([
        supabase.from('service_examples').select('*').limit(20),
        supabase.from('inquiries').select('name, inquiry_text, inquiry_type').order('created_at', { ascending: false }).limit(10),
        supabase.from('ai_chat_config').select('*')
      ]);

      const serviceExamples = servicesResponse.status === 'fulfilled' 
        ? servicesResponse.value.data || []
        : [];

      const companyKnowledge = {
        services: [
          'Logo Design - Premium brand identity creation with comprehensive design process',
          'Website Development - Modern, responsive web solutions with latest technologies',
          'E-commerce Solutions - Complete online stores with advanced features',
          'Social Media Management - Full social media presence and engagement',
          'Digital Marketing Campaigns - ROI-focused marketing strategies',
          'Smart CX Systems - AI-powered customer experience solutions',
          'Personal AI Assistants - Business automation and intelligent support',
          'ERP Solutions - Enterprise resource planning systems'
        ],
        serviceExamples: serviceExamples.slice(0, 10),
        paymentMethods: ['Consultation required for payment options'],
        locations: 'Global with focus on Middle East and Arabic-speaking regions',
        languages: ['English', 'Arabic'],
        specialties: [
          'Bilingual Arabic-English content creation',
          'Middle East market expertise',
          'Custom solutions for each client',
          'Comprehensive consultation process'
        ],
        approach: 'We focus on understanding your needs first through detailed consultation before providing customized solutions and quotes.'
      };

      const recentInquiries = inquiriesResponse.status === 'fulfilled' 
        ? inquiriesResponse.value.data || []
        : [];

      const aiConfig = configResponse.status === 'fulfilled' 
        ? configResponse.value.data || []
        : [];

      // Try to use the actual OpenRouter API if key is available
      const storedApiKey = localStorage.getItem('openrouter_api_key');
      
      if (storedApiKey) {
        try {
          const { data, error } = await supabase.functions.invoke('openrouter-ai-chat', {
            body: {
              message,
              conversationHistory,
              language: i18n.language,
              companyKnowledge,
              recentInquiries,
              aiConfig,
              apiKey: storedApiKey
            }
          });

          console.log('Supabase function response:', data, error);

          if (!error && data?.response) {
            return data.response;
          }
        } catch (error) {
          console.log('API call failed, using intelligent fallback:', error);
        }
      }

      // Always use intelligent local responses for better user experience
      return generateIntelligentResponse(message, i18n.language, companyKnowledge, conversationHistory);

    } catch (error) {
      console.error('AI response error:', error);
      return generateIntelligentResponse(message, i18n.language, undefined, conversationHistory);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    sendMessageToAI,
    isLoading,
    shouldRedirectToForm
  };
};

// Enhanced intelligent response generator without pricing
const generateIntelligentResponse = (
  message: string, 
  language: string, 
  companyKnowledge?: any, 
  conversationHistory: any[] = []
) => {
  const lowerMessage = message.toLowerCase();
  const isArabic = language === 'ar';

  // Greeting responses
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('مرحبا') || lowerMessage.includes('السلام')) {
    return isArabic 
      ? `مرحباً وأهلاً وسهلاً! 🌟 أنا مساعد DigitalPro الذكي

🎯 **ما يميزنا:**
• حلول رقمية مخصصة ومبتكرة
• فريق خبراء متخصص في أحدث التقنيات
• خدمة استشارية شاملة ومجانية
• نتائج مضمونة وقابلة للقياس

🚀 **خدماتنا الرئيسية:**
• تصميم الشعارات - هويات بصرية مميزة ولا تُنسى
• تطوير المواقع - مواقع حديثة وسريعة
• المتاجر الإلكترونية - حلول تجارة متكاملة
• إدارة وسائل التواصل - نمو مضمون وتفاعل عالي
• التسويق الرقمي - استراتيجيات نمو فعالة
• أنظمة الذكاء الاصطناعي - تقنيات المستقبل

💡 **نهجنا:**
نبدأ بفهم احتياجاتك من خلال استشارة مجانية مفصلة، ثم نقدم حلول مخصصة تماماً لمشروعك.

ما الخدمة التي تهمك؟ أم تفضل البدء بجلسة استشارة مجانية؟ ✨`
      : `Hello and welcome! 🌟 I'm DigitalPro's intelligent assistant

🎯 **What sets us apart:**
• Custom and innovative digital solutions
• Expert team specializing in latest technologies
• Comprehensive free consultation service
• Guaranteed and measurable results

🚀 **Our Core Services:**
• Logo Design - Distinctive and memorable visual identities
• Website Development - Modern and fast websites
• E-commerce Solutions - Complete commerce solutions
• Social Media Management - Guaranteed growth and high engagement
• Digital Marketing - Effective growth strategies
• AI Systems - Future technologies

💡 **Our Approach:**
We start by understanding your needs through a detailed free consultation, then provide completely customized solutions for your project.

Which service interests you? Or would you prefer to start with a free consultation? ✨`;
  }

  // Service-specific responses without pricing
  if (lowerMessage.includes('logo') || lowerMessage.includes('شعار')) {
    return isArabic
      ? `🎨 **تصميم الشعارات - خبرتنا وشغفنا!**

**🌟 عمليتنا الإبداعية:**
1️⃣ **البحث والتحليل** - دراسة عميقة لمجال عملك ومنافسيك
2️⃣ **العصف الذهني** - جلسات إبداعية مع فريق التصميم
3️⃣ **التصميم الأولي** - 3-5 مفاهيم أولية مختلفة
4️⃣ **التطوير والتحسين** - تعديلات غير محدودة
5️⃣ **التسليم النهائي** - جميع الملفات بأعلى جودة

**💎 ما تحصل عليه:**
• شعار فريد 100% (ليس قالب جاهز!)
• تعديلات غير محدودة حتى الرضا التام
• جميع التنسيقات (PNG, SVG, AI, PDF, EPS)
• دليل إرشادات العلامة التجارية الكامل

هل تود معرفة المزيد عن عمليتنا أم تفضل البدء بجلسة استشارة مجانية لمناقشة مشروعك؟ 🎯`
      : `🎨 **Logo Design - Our Expertise & Passion!**

**🌟 Our Creative Process:**
1️⃣ **Research & Analysis** - Deep study of your industry & competitors
2️⃣ **Brainstorming** - Creative sessions with our design team
3️⃣ **Initial Design** - 3-5 different initial concepts
4️⃣ **Development & Refinement** - Unlimited revisions
5️⃣ **Final Delivery** - All files in highest quality

**💎 What You Get:**
• 100% unique logo (not a template!)
• Unlimited revisions until perfect satisfaction
• All formats (PNG, SVG, AI, PDF, EPS)
• Complete brand guideline documentation

Would you like to know more about our process or prefer to start with a free consultation to discuss your project? 🎯`;
  }

  // Default intelligent response
  return isArabic
    ? `شكراً لك على تواصلك معنا! 😊 

أنا هنا لمساعدتك في تحقيق أهدافك الرقمية بأحدث التقنيات والحلول المبتكرة.

🎯 **يمكنني مساعدتك في:**
• فهم خدماتنا المختلفة
• تحديد الحل الأمثل لاحتياجاتك
• ترتيب جلسة استشارة مجانية
• الإجابة على جميع أسئلتك

💬 **أخبرني عن:**
- نوع عملك أو مشروعك
- التحديات التي تواجهها
- أهدافك المستقبلية

سأقوم بتوجيهك للحل الأمثل وترتيب استشارة مجانية مع فريقنا المتخصص! 🚀`
    : `Thank you for reaching out! 😊

I'm here to help you achieve your digital goals with the latest technologies and innovative solutions.

🎯 **I can help you with:**
• Understanding our different services
• Identifying the optimal solution for your needs
• Arranging a free consultation
• Answering all your questions

💬 **Tell me about:**
- Your business or project type
- Challenges you're facing
- Your future goals

I'll guide you to the optimal solution and arrange a free consultation with our specialized team! 🚀`;
};

// Generate price redirect response
const generatePriceRedirectResponse = (language: string) => {
  return language === 'ar'
    ? `أفهم اهتمامك بمعرفة التفاصيل المالية! 💼

نحن نؤمن بتقديم عروض مخصصة تناسب احتياجاتك تماماً، لذلك نفضل أولاً فهم مشروعك بالتفصيل.

🎯 **لماذا نتبع هذا النهج؟**
• كل مشروع فريد ومتطلباته مختلفة
• نريد تقديم أفضل قيمة مقابل استثمارك
• نضمن عدم دفعك مقابل خدمات لا تحتاجها

📝 **الخطوة التالية:**
سأساعدك في فهم احتياجاتك وترتيب جلسة استشارة مجانية مع فريقنا، وسيقومون بتقديم عرض مفصل ومخصص خلال 24 ساعة.

هل تود البدء في مناقشة مشروعك؟`
    : `I understand your interest in the financial details! 💼

We believe in providing customized proposals that perfectly match your needs, so we prefer to first understand your project in detail.

🎯 **Why do we follow this approach?**
• Every project is unique with different requirements
• We want to provide the best value for your investment
• We ensure you don't pay for services you don't need

📝 **Next Step:**
I'll help you understand your needs and arrange a free consultation with our team, and they'll provide a detailed, customized proposal within 24 hours.

Would you like to start discussing your project?`;
};
