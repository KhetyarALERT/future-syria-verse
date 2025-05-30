
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
        serviceExamples: serviceExamples.slice(0, 10),
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

      // Check if OpenRouter API key is available
      const storedApiKey = localStorage.getItem('openrouter_api_key');
      
      if (storedApiKey) {
        // Try to use the actual OpenRouter API
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
      }

      // Fallback to intelligent local responses based on message content
      return generateIntelligentResponse(message, i18n.language, companyKnowledge);

    } catch (error) {
      console.error('AI response error:', error);
      return generateIntelligentResponse(message, i18n.language);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    sendMessageToAI,
    isLoading
  };
};

// Intelligent response generator
const generateIntelligentResponse = (message: string, language: string, companyKnowledge?: any) => {
  const lowerMessage = message.toLowerCase();
  const isArabic = language === 'ar';

  // Greeting responses
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('مرحبا') || lowerMessage.includes('السلام')) {
    return isArabic 
      ? `مرحباً وأهلاً وسهلاً! 🌟 أنا مساعد DigitalPro الذكي، وأنا سعيد جداً لرؤيتك هنا!

🎨 **خدماتنا المميزة:**
• تصميم الشعارات - من 50$ (هويات تجارية لا تُنسى)
• تطوير المواقع - من 200$ (مواقع حديثة ومتجاوبة)
• المتاجر الإلكترونية - من 500$ (حلول تجارة شاملة)
• إدارة وسائل التواصل - 300$/شهر (نمو مضمون)
• الحملات التسويقية - من 400$ (عائد استثمار مضاعف)

💬 **كيف يمكنني مساعدتك اليوم؟**
- استشارة مجانية لمشروعك
- عرض سعر مخصص
- أمثلة من أعمالنا السابقة
- خطة نمو رقمية لعملك

أخبرني عن مشروعك وسأقدم لك أفضل الحلول! 🚀`
      : `Hello and welcome! 🌟 I'm DigitalPro's AI assistant, and I'm excited to help you today!

🎨 **Our Premium Services:**
• Logo Design - from $50 (Memorable brand identities)
• Website Development - from $200 (Modern, responsive sites)
• E-commerce Solutions - from $500 (Complete online stores)
• Social Media Management - $300/month (Guaranteed growth)
• Digital Marketing - from $400 (ROI-focused campaigns)

💬 **How can I help you today?**
- Free consultation for your project
- Custom quote and pricing
- Examples of our previous work
- Digital growth strategy for your business

Tell me about your project and I'll provide the best solutions! 🚀`;
  }

  // Service-specific responses
  if (lowerMessage.includes('logo') || lowerMessage.includes('شعار')) {
    return isArabic
      ? `🎨 **تصميم الشعارات - تخصصنا الأول!**

**ماذا نقدم:**
• تصاميم فريدة ومميزة 100%
• تعديلات غير محدودة حتى الرضا التام
• جميع التنسيقات (PNG, SVG, AI, PDF)
• دليل إرشادات العلامة التجارية
• تكييف للاستخدامات المختلفة

**الأسعار:**
• شعار بسيط: 50$ - 100$
• شعار متقدم: 100$ - 200$
• باقة هوية كاملة: 200$ - 500$

**مثال من أعمالنا:**
شعار شركة تقنية حديث بخطوط نظيفة وألوان عصرية، زاد من узнаваемость العلامة التجارية بنسبة 300%!

💡 هل تريد مشاهدة أمثلة أكثر أم تفضل البدء بعرض سعر مخصص؟`
      : `🎨 **Logo Design - Our Specialty!**

**What we deliver:**
• 100% unique and custom designs
• Unlimited revisions until perfect
• All formats (PNG, SVG, AI, PDF)
• Brand guideline documentation
• Adaptations for different uses

**Pricing:**
• Simple logo: $50 - $100
• Advanced logo: $100 - $200
• Complete brand package: $200 - $500

**Example from our work:**
Modern tech company logo with clean lines and contemporary colors that increased brand recognition by 300%!

💡 Would you like to see more examples or start with a custom quote?`;
  }

  if (lowerMessage.includes('website') || lowerMessage.includes('web') || lowerMessage.includes('موقع')) {
    return isArabic
      ? `💻 **تطوير المواقع الإلكترونية**

**خدماتنا تشمل:**
• مواقع شخصية وتجارية
• متاجر إلكترونية متكاملة
• تطبيقات ويب تفاعلية
• تحسين محركات البحث SEO
• تصميم متجاوب لجميع الأجهزة

**الأسعار:**
• موقع تعريفي: 200$ - 500$
• موقع تجاري: 500$ - 1500$
• متجر إلكتروني: 800$ - 3000$

**مثال حقيقي:**
متجر إلكتروني لعميل حقق زيادة 150% في المبيعات خلال 3 أشهر!

⚡ ما نوع الموقع الذي تحتاجه؟ سأقدم لك خطة مفصلة!`
      : `💻 **Website Development**

**Our services include:**
• Personal and business websites
• Complete e-commerce stores
• Interactive web applications
• SEO optimization
• Responsive design for all devices

**Pricing:**
• Landing page: $200 - $500
• Business website: $500 - $1,500
• E-commerce store: $800 - $3,000

**Real example:**
E-commerce store that achieved 150% sales increase in 3 months!

⚡ What type of website do you need? I'll provide a detailed plan!`;
  }

  if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('سعر') || lowerMessage.includes('تكلفة')) {
    return isArabic
      ? `💰 **أسعارنا الشفافة والتنافسية**

**الخدمات الرئيسية:**
🎨 تصميم الشعارات: 50$ - 200$
💻 تطوير المواقع: 200$ - 3000$
🛒 المتاجر الإلكترونية: 500$ - 5000$
📱 إدارة وسائل التواصل: 300$/شهر
📈 الحملات التسويقية: 400$ - 2000$
🤖 المساعدين الأذكياء: 600$ - 2500$

**عروض خاصة:**
• خصم 20% للمشاريع الجديدة
• باقات مدمجة بأسعار مخفضة
• خطط دفع مرنة
• ضمان الرضا 100%

🎯 أخبرني عن مشروعك وسأقدم لك عرض سعر دقيق خلال 30 دقيقة!`
      : `💰 **Our Transparent & Competitive Pricing**

**Main Services:**
🎨 Logo Design: $50 - $200
💻 Website Development: $200 - $3,000
🛒 E-commerce Solutions: $500 - $5,000
📱 Social Media Management: $300/month
📈 Marketing Campaigns: $400 - $2,000
🤖 AI Assistants: $600 - $2,500

**Special Offers:**
• 20% discount for new projects
• Bundled packages at reduced rates
• Flexible payment plans
• 100% satisfaction guarantee

🎯 Tell me about your project and I'll provide an accurate quote in 30 minutes!`;
  }

  if (lowerMessage.includes('example') || lowerMessage.includes('portfolio') || lowerMessage.includes('مثال') || lowerMessage.includes('أعمال')) {
    return isArabic
      ? `🌟 **أمثلة من أعمالنا المميزة:**

**تصميم الشعارات:**
• شعار شركة تقنية - تصميم هندسي حديث
• شعار مطعم - هوية بصرية دافئة وجذابة
• شعار عيادة طبية - تصميم احترافي وموثوق

**المواقع الإلكترونية:**
• متجر إلكتروني - زيادة 300% في التحويلات
• موقع شركة خدمات - تحسن 250% في الظهور
• تطبيق ويب - 50,000 مستخدم في 6 أشهر

**الحملات التسويقية:**
• حملة وسائل التواصل - 450% عائد استثمار
• حملة إعلانات Google - 65% تقليل في تكلفة الاكتساب

💡 **هل تريد رؤية تفاصيل أكثر لأي مشروع؟** أم تفضل مناقشة مشروعك الخاص؟`
      : `🌟 **Examples of Our Outstanding Work:**

**Logo Design:**
• Tech company logo - Modern geometric design
• Restaurant logo - Warm and attractive visual identity
• Medical clinic logo - Professional and trustworthy design

**Websites:**
• E-commerce store - 300% increase in conversions
• Service company website - 250% improvement in visibility
• Web application - 50,000 users in 6 months

**Marketing Campaigns:**
• Social media campaign - 450% ROI
• Google Ads campaign - 65% reduction in acquisition cost

💡 **Want to see more details about any project?** Or would you prefer to discuss your own project?`;
  }

  // Default intelligent response
  return isArabic
    ? `شكراً لك على التواصل! 😊

أنا هنا لمساعدتك في جميع احتياجاتك الرقمية. سواء كنت تريد:
• تصميم هوية تجارية مميزة
• تطوير موقع أو متجر إلكتروني
• حملات تسويقية فعالة
• حلول ذكية لأعمالك

💬 **أخبرني بالتفصيل عن:**
- نوع العمل أو المشروع
- الخدمة التي تحتاجها
- الميزانية المتاحة
- الجدول الزمني المطلوب

وسأقدم لك أفضل الحلول والاقتراحات! 🚀`
    : `Thank you for reaching out! 😊

I'm here to help with all your digital needs. Whether you want:
• Distinctive brand identity design
• Website or e-commerce development
• Effective marketing campaigns
• Smart business solutions

💬 **Tell me in detail about:**
- Your business or project type
- The service you need
- Available budget
- Required timeline

And I'll provide you with the best solutions and suggestions! 🚀`;
};
