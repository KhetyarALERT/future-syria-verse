
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
  const [shouldRedirectToForm, setShouldRedirectToForm] = useState(false);

  // Intelligent response patterns without pricing
  const responsePatterns = useMemo(() => ({
    ar: {
      greeting: [
        "مرحباً! أنا مساعدك الذكي في DigitalPro. كيف يمكنني مساعدتك اليوم؟ 🌟",
        "أهلاً وسهلاً! أنا هنا لمساعدتك في جميع احتياجاتك الرقمية. ما الذي تبحث عنه؟ ✨"
      ],
      services: {
        logo: "تصميم الشعارات هو تخصصنا! نقوم بإنشاء هويات بصرية مميزة وفريدة تعكس جوهر علامتك التجارية. عمليتنا تشمل البحث والتحليل، ثم تطوير مفاهيم متعددة، والتنقيح حتى الوصول للتصميم المثالي. 🎨\n\nهل تود معرفة المزيد عن عمليتنا أم تفضل البدء في نموذج طلب مخصص؟",
        website: "تطوير المواقع الإلكترونية الحديثة والمتجاوبة هو من أقوى خدماتنا. نبني مواقع سريعة وآمنة مع تحسين محركات البحث وتجربة مستخدم استثنائية باستخدام أحدث التقنيات. 💻\n\nما نوع الموقع الذي تحتاجه؟ سأساعدك في تحديد المتطلبات المناسبة.",
        marketing: "التسويق الرقمي المتقدم يشمل إدارة وسائل التواصل الاجتماعي، والإعلانات المدفوعة، وتحسين محركات البحث، وتحليل البيانات لتحقيق أفضل النتائج. 📈\n\nما هي أهدافك التسويقية؟ دعني أساعدك في وضع الاستراتيجية المناسبة.",
        ecommerce: "حلول التجارة الإلكترونية المتكاملة تشمل بناء المتاجر الإلكترونية، وأنظمة الدفع، وإدارة المخزون، والشحن، مع لوحة تحكم سهلة الاستخدام. 🛒\n\nما نوع المنتجات التي تريد بيعها؟ سأساعدك في تصميم المتجر المثالي."
      },
      priceRedirect: "أفهم اهتمامك بمعرفة التكلفة! نحن نقدم عروض أسعار مخصصة حسب احتياجاتك المحددة. دعني أوجهك لملء نموذج سريع يساعدنا في فهم مشروعك وتقديم عرض دقيق ومفصل. 📋",
      consultation: "أقترح أن نبدأ بجلسة استشارة مجانية لفهم احتياجاتك بالتفصيل. هل تود ملء نموذج سريع ليتواصل معك فريقنا؟ 💼"
    },
    en: {
      greeting: [
        "Hello! I'm your AI assistant at DigitalPro. How can I help you today? 🌟",
        "Welcome! I'm here to assist with all your digital needs. What are you looking for? ✨"
      ],
      services: {
        logo: "Logo design is our specialty! We create distinctive and unique visual identities that reflect your brand essence. Our process includes research and analysis, then developing multiple concepts, and refining until we reach the perfect design. 🎨\n\nWould you like to know more about our process or prefer to start with a custom request form?",
        website: "Modern and responsive website development is one of our strongest services. We build fast and secure websites with SEO optimization and exceptional user experience using the latest technologies. 💻\n\nWhat type of website do you need? I'll help you determine the right requirements.",
        marketing: "Advanced digital marketing includes social media management, paid advertising, SEO optimization, and data analytics to achieve the best results. 📈\n\nWhat are your marketing goals? Let me help you create the right strategy.",
        ecommerce: "Complete e-commerce solutions include building online stores, payment systems, inventory management, and shipping, with an easy-to-use control panel. 🛒\n\nWhat type of products do you want to sell? I'll help you design the perfect store."
      },
      priceRedirect: "I understand your interest in knowing the cost! We provide customized quotes based on your specific needs. Let me guide you to fill out a quick form that helps us understand your project and provide an accurate, detailed proposal. 📋",
      consultation: "I suggest we start with a free consultation to understand your needs in detail. Would you like to fill out a quick form for our team to contact you? 💼"
    }
  }), []);

  const generateContextualResponse = useCallback((input: string, language: string, history: ConversationMessage[]) => {
    const patterns = responsePatterns[language as 'ar' | 'en'] || responsePatterns.en;
    const lowerInput = input.toLowerCase();
    
    // Check for pricing inquiries and set redirect flag
    if (lowerInput.includes('price') || lowerInput.includes('cost') || lowerInput.includes('سعر') || lowerInput.includes('تكلفة') || lowerInput.includes('budget') || lowerInput.includes('quote')) {
      setShouldRedirectToForm(true);
      return patterns.priceRedirect;
    }

    // Check cache first
    const cacheKey = `${language}-${lowerInput}`;
    if (responseCache.has(cacheKey)) {
      return responseCache.get(cacheKey)!;
    }

    let response = '';

    // Context-aware responses without pricing
    if (lowerInput.includes('logo') || lowerInput.includes('شعار')) {
      response = patterns.services.logo;
    } else if (lowerInput.includes('website') || lowerInput.includes('موقع')) {
      response = patterns.services.website;
    } else if (lowerInput.includes('marketing') || lowerInput.includes('تسويق')) {
      response = patterns.services.marketing;
    } else if (lowerInput.includes('ecommerce') || lowerInput.includes('متجر')) {
      response = patterns.services.ecommerce;
    } else if (lowerInput.includes('consultation') || lowerInput.includes('استشارة')) {
      response = patterns.consultation;
    } else if (history.length <= 1) {
      // First interaction
      response = patterns.greeting[Math.floor(Math.random() * patterns.greeting.length)];
    } else {
      // Default helpful response
      response = language === 'ar' 
        ? `شكراً لك على استفسارك! يمكنني مساعدتك في تصميم الشعارات، تطوير المواقع، التسويق الرقمي، والتجارة الإلكترونية. ما الخدمة التي تهمك أكثر؟ أم تفضل البدء بجلسة استشارة مجانية؟ 😊`
        : `Thank you for your inquiry! I can help you with logo design, website development, digital marketing, and e-commerce solutions. Which service interests you most? Or would you prefer to start with a free consultation? 😊`;
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
    setShouldRedirectToForm(false);
    
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
    shouldRedirectToForm,
    clearCache: () => setResponseCache(new Map())
  };
};
