
import { useState, useCallback, useMemo } from 'react';
import { useToast } from '@/hooks/use-toast';

interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
}

export const useOptimizedAIAgent = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [responseCache, setResponseCache] = useState<Map<string, string>>(new Map());

  // Intelligent response patterns
  const responsePatterns = useMemo(() => ({
    ar: {
      greeting: [
        "مرحباً! أنا مساعدك الذكي في DigitalPro. كيف يمكنني مساعدتك اليوم؟ 🌟",
        "أهلاً وسهلاً! أنا هنا لمساعدتك في جميع احتياجاتك الرقمية. ما الذي تبحث عنه؟ ✨"
      ],
      services: {
        logo: "تصميم الشعارات هو تخصصنا! يمكننا إنشاء شعار احترافي ومميز يعكس هوية علامتك التجارية. نقدم تصاميم حديثة ومبتكرة مع مراجعات مجانية حتى تحصل على النتيجة المثالية. 🎨",
        website: "تطوير المواقع الإلكترونية الحديثة والمتجاوبة هو من أقوى خدماتنا. نبني مواقع سريعة وآمنة مع تحسين محركات البحث وتجربة مستخدم استثنائية. 💻",
        marketing: "التسويق الرقمي المتقدم يشمل إدارة وسائل التواصل الاجتماعي، والإعلانات المدفوعة، وتحسين محركات البحث، وتحليل البيانات لتحقيق أفضل النتائج. 📈",
        ecommerce: "حلول التجارة الإلكترونية المتكاملة تشمل بناء المتاجر الإلكترونية، وأنظمة الدفع، وإدارة المخزون، والشحن، مع لوحة تحكم سهلة الاستخدام. 🛒"
      },
      quote: "للحصول على عرض سعر مخصص، أحتاج لمعرفة تفاصيل أكثر عن مشروعك. يمكنك ملء النموذج وسنتواصل معك خلال 24 ساعة بعرض مفصل. 💼",
      contact: "يمكنك التواصل معنا عبر الواتساب أو البريد الإلكتروني أو هذه المحادثة المباشرة. فريقنا متاح لخدمتك 24/7. 📞"
    },
    en: {
      greeting: [
        "Hello! I'm your AI assistant at DigitalPro. How can I help you today? 🌟",
        "Welcome! I'm here to assist with all your digital needs. What are you looking for? ✨"
      ],
      services: {
        logo: "Logo design is our specialty! We create professional and unique logos that reflect your brand identity. We offer modern and innovative designs with free revisions until you get the perfect result. 🎨",
        website: "Modern and responsive website development is one of our strongest services. We build fast and secure websites with SEO optimization and exceptional user experience. 💻",
        marketing: "Advanced digital marketing includes social media management, paid advertising, SEO optimization, and data analytics to achieve the best results. 📈",
        ecommerce: "Complete e-commerce solutions include building online stores, payment systems, inventory management, and shipping, with an easy-to-use control panel. 🛒"
      },
      quote: "To get a custom quote, I need to know more details about your project. You can fill out the form and we'll contact you within 24 hours with a detailed proposal. 💼",
      contact: "You can contact us via WhatsApp, email, or this live chat. Our team is available to serve you 24/7. 📞"
    }
  }), []);

  const generateContextualResponse = useCallback((input: string, language: string, history: ConversationMessage[]) => {
    const patterns = responsePatterns[language as 'ar' | 'en'] || responsePatterns.en;
    const lowerInput = input.toLowerCase();
    
    // Check cache first
    const cacheKey = `${language}-${lowerInput}`;
    if (responseCache.has(cacheKey)) {
      return responseCache.get(cacheKey)!;
    }

    let response = '';

    // Context-aware responses
    if (lowerInput.includes('logo') || lowerInput.includes('شعار')) {
      response = patterns.services.logo;
    } else if (lowerInput.includes('website') || lowerInput.includes('موقع')) {
      response = patterns.services.website;
    } else if (lowerInput.includes('marketing') || lowerInput.includes('تسويق')) {
      response = patterns.services.marketing;
    } else if (lowerInput.includes('ecommerce') || lowerInput.includes('متجر')) {
      response = patterns.services.ecommerce;
    } else if (lowerInput.includes('quote') || lowerInput.includes('price') || lowerInput.includes('سعر') || lowerInput.includes('عرض')) {
      response = patterns.quote;
    } else if (lowerInput.includes('contact') || lowerInput.includes('تواصل')) {
      response = patterns.contact;
    } else if (history.length <= 1) {
      // First interaction
      response = patterns.greeting[Math.floor(Math.random() * patterns.greeting.length)];
    } else {
      // Default helpful response
      response = language === 'ar' 
        ? `شكراً لك على استفسارك! يمكنني مساعدتك في تصميم الشعارات، تطوير المواقع، التسويق الرقمي، والتجارة الإلكترونية. ما الخدمة التي تهمك أكثر؟ 😊`
        : `Thank you for your inquiry! I can help you with logo design, website development, digital marketing, and e-commerce solutions. Which service interests you most? 😊`;
    }

    // Cache the response
    setResponseCache(prev => new Map(prev.set(cacheKey, response)));
    
    return response;
  }, [responsePatterns, responseCache]);

  const sendMessageToAI = useCallback(async (
    message: string, 
    conversationHistory: ConversationMessage[] = []
  ): Promise<string> => {
    if (!message.trim()) {
      throw new Error('Message cannot be empty');
    }

    setIsLoading(true);
    
    try {
      // Simulate network delay for realism
      await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1200));
      
      // Detect language
      const language = /[\u0600-\u06FF]/.test(message) ? 'ar' : 'en';
      
      // Generate contextual response
      const response = generateContextualResponse(message, language, conversationHistory);
      
      return response;
    } catch (error) {
      console.error('AI Agent Error:', error);
      
      // Fallback response
      const fallbackResponse = /[\u0600-\u06FF]/.test(message)
        ? 'أعتذر، حدث خطأ تقني. يرجى المحاولة مرة أخرى أو التواصل مع فريق الدعم.'
        : 'I apologize for the technical error. Please try again or contact our support team.';
      
      return fallbackResponse;
    } finally {
      setIsLoading(false);
    }
  }, [generateContextualResponse]);

  return {
    sendMessageToAI,
    isLoading,
    clearCache: () => setResponseCache(new Map())
  };
};
