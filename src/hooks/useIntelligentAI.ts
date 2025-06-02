
import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  type?: 'text' | 'form_suggestion' | 'service_recommendation';
}

interface UserIntent {
  category: 'service_inquiry' | 'pricing' | 'consultation' | 'support' | 'general';
  confidence: number;
  extractedInfo: {
    serviceType?: string;
    budget?: string;
    timeline?: string;
    businessType?: string;
    requirements?: string[];
  };
}

export const useIntelligentAI = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [conversationContext, setConversationContext] = useState<any>({});

  const serviceKnowledge = {
    'logo-design': {
      name: 'Logo Design',
      keywords: ['logo', 'brand', 'identity', 'branding', 'design', 'شعار', 'هوية', 'تصميم'],
      capabilities: 'Professional brand identity creation with unique designs',
      process: 'Discovery → Concepts → Refinement → Final delivery',
      deliverables: ['Vector files', 'Brand guidelines', 'Social media variations'],
      timeline: '3-7 business days',
      pricing: 'Starting from $150'
    },
    'web-development': {
      name: 'Website Development',
      keywords: ['website', 'web', 'site', 'development', 'موقع', 'تطوير'],
      capabilities: 'Modern responsive websites with advanced functionality',
      process: 'Planning → Design → Development → Testing → Launch',
      deliverables: ['Responsive website', 'CMS', 'SEO optimization'],
      timeline: '2-6 weeks',
      pricing: 'Starting from $800'
    },
    'ai-solutions': {
      name: 'AI Solutions',
      keywords: ['ai', 'artificial intelligence', 'chatbot', 'automation', 'ذكي', 'اصطناعي'],
      capabilities: 'Custom AI systems for business automation and customer service',
      process: 'Analysis → Training → Integration → Testing → Deployment',
      deliverables: ['Custom AI assistant', 'Integration setup', 'Analytics'],
      timeline: '2-4 weeks',
      pricing: 'Starting from $1200'
    },
    'digital-marketing': {
      name: 'Digital Marketing',
      keywords: ['marketing', 'social media', 'seo', 'ads', 'تسويق', 'إعلانات'],
      capabilities: 'Comprehensive digital marketing strategies and execution',
      process: 'Strategy → Content → Campaigns → Analytics → Optimization',
      deliverables: ['Marketing strategy', 'Content calendar', 'Campaign management'],
      timeline: 'Ongoing monthly service',
      pricing: 'Starting from $500/month'
    }
  };

  const analyzeUserIntent = useCallback((message: string): UserIntent => {
    const lowerMessage = message.toLowerCase();
    let category: UserIntent['category'] = 'general';
    let confidence = 0.3;
    const extractedInfo: UserIntent['extractedInfo'] = {};

    // Service detection
    for (const [serviceKey, service] of Object.entries(serviceKnowledge)) {
      if (service.keywords.some(keyword => lowerMessage.includes(keyword.toLowerCase()))) {
        category = 'service_inquiry';
        confidence = 0.8;
        extractedInfo.serviceType = serviceKey;
        break;
      }
    }

    // Pricing intent
    if (/price|cost|budget|expensive|cheap|how much|كم|سعر|تكلفة/.test(lowerMessage)) {
      category = 'pricing';
      confidence = Math.max(confidence, 0.7);
      
      // Extract budget hints
      const budgetMatch = lowerMessage.match(/\$?(\d+(?:,\d+)?(?:\.\d+)?)/);
      if (budgetMatch) {
        extractedInfo.budget = budgetMatch[1];
      }
    }

    // Timeline extraction
    const timelinePatterns = [
      /(\d+)\s*(day|week|month)s?/i,
      /(urgent|asap|quickly|soon|قريب|عاجل)/i,
      /(flexible|no rush|متى|وقت)/i
    ];
    
    for (const pattern of timelinePatterns) {
      const match = lowerMessage.match(pattern);
      if (match) {
        extractedInfo.timeline = match[0];
        break;
      }
    }

    // Business type extraction
    const businessTypes = ['restaurant', 'ecommerce', 'clinic', 'shop', 'startup', 'مطعم', 'عيادة', 'متجر'];
    for (const type of businessTypes) {
      if (lowerMessage.includes(type)) {
        extractedInfo.businessType = type;
        break;
      }
    }

    // Consultation intent
    if (/consult|help|advice|need|want|مساعدة|أريد|أحتاج/.test(lowerMessage)) {
      category = 'consultation';
      confidence = Math.max(confidence, 0.6);
    }

    return { category, confidence, extractedInfo };
  }, []);

  const generateIntelligentResponse = useCallback((userMessage: string, intent: UserIntent): string => {
    const { category, extractedInfo } = intent;
    const isArabic = /[\u0600-\u06FF]/.test(userMessage);

    // Update conversation context
    setConversationContext(prev => ({
      ...prev,
      ...extractedInfo,
      messageCount: (prev.messageCount || 0) + 1,
      language: isArabic ? 'ar' : 'en'
    }));

    switch (category) {
      case 'service_inquiry':
        const service = extractedInfo.serviceType ? serviceKnowledge[extractedInfo.serviceType as keyof typeof serviceKnowledge] : null;
        if (service) {
          return isArabic 
            ? `رائع! ${service.name} من تخصصاتنا المميزة! 🎨

**ما نقدمه:**
${service.capabilities}

**العملية:**
${service.process}

**ما ستحصل عليه:**
${service.deliverables.join(' • ')}

**الجدول الزمني:** ${service.timeline}

لمساعدتك بشكل أفضل، دعني أسأل:
- ما نوع عملك أو مشروعك؟
- هل لديك رؤية محددة في ذهنك؟
- ما الميزانية المتاحة تقريباً؟

يمكنني بعد ذلك تقديم اقتراح مخصص لك!`
            : `Excellent! ${service.name} is one of our specialties! 🎨

**What we offer:**
${service.capabilities}

**Our process:**
${service.process}

**What you'll get:**
${service.deliverables.join(' • ')}

**Timeline:** ${service.timeline}

To help you better, let me ask:
- What type of business or project is this for?
- Do you have a specific vision in mind?
- What's your approximate budget?

I can then provide a customized proposal for you!`;
        }
        break;

      case 'pricing':
        return isArabic
          ? `أفهم اهتمامك بالتكلفة! 💰

نحن نقدم حلول مخصصة، لذلك التسعير يعتمد على:
• نوع الخدمة المطلوبة
• حجم وتعقيد المشروع
• الجدول الزمني
• المتطلبات الخاصة

**أسعارنا التقريبية:**
${Object.entries(serviceKnowledge).map(([_, service]) => `• ${service.name}: ${service.pricing}`).join('\n')}

${extractedInfo.budget ? `أرى أن ميزانيتك حوالي $${extractedInfo.budget} - يمكننا بالتأكيد العمل ضمن هذا النطاق!` : ''}

هل تود أن نناقش مشروعك بالتفصيل لأقدم لك عرض سعر دقيق؟`
          : `I understand your interest in pricing! 💰

We provide customized solutions, so pricing depends on:
• Type of service needed
• Project size and complexity
• Timeline requirements
• Special requirements

**Our approximate pricing:**
${Object.entries(serviceKnowledge).map(([_, service]) => `• ${service.name}: ${service.pricing}`).join('\n')}

${extractedInfo.budget ? `I see your budget is around $${extractedInfo.budget} - we can definitely work within that range!` : ''}

Would you like to discuss your project in detail so I can provide an accurate quote?`;

      case 'consultation':
        const messageCount = conversationContext.messageCount || 0;
        if (messageCount >= 3) {
          return isArabic
            ? `بناءً على محادثتنا، أرى أنك مهتم بـ ${extractedInfo.serviceType ? serviceKnowledge[extractedInfo.serviceType as keyof typeof serviceKnowledge]?.name : 'خدماتنا'}.

🎯 **ملخص ما فهمته:**
${extractedInfo.serviceType ? `• الخدمة: ${serviceKnowledge[extractedInfo.serviceType as keyof typeof serviceKnowledge]?.name}` : ''}
${extractedInfo.businessType ? `• نوع العمل: ${extractedInfo.businessType}` : ''}
${extractedInfo.timeline ? `• الجدول الزمني: ${extractedInfo.timeline}` : ''}
${extractedInfo.budget ? `• الميزانية: $${extractedInfo.budget}` : ''}

هل تود أن:
1️⃣ أساعدك في ملء نموذج مفصل لفريقنا؟
2️⃣ نواصل النقاش لفهم احتياجاتك أكثر؟
3️⃣ أحجز لك استشارة مجانية مع خبرائنا؟`
            : `Based on our conversation, I see you're interested in ${extractedInfo.serviceType ? serviceKnowledge[extractedInfo.serviceType as keyof typeof serviceKnowledge]?.name : 'our services'}.

🎯 **Summary of what I understand:**
${extractedInfo.serviceType ? `• Service: ${serviceKnowledge[extractedInfo.serviceType as keyof typeof serviceKnowledge]?.name}` : ''}
${extractedInfo.businessType ? `• Business type: ${extractedInfo.businessType}` : ''}
${extractedInfo.timeline ? `• Timeline: ${extractedInfo.timeline}` : ''}
${extractedInfo.budget ? `• Budget: $${extractedInfo.budget}` : ''}

Would you like to:
1️⃣ Let me help you fill out a detailed form for our team?
2️⃣ Continue discussing to understand your needs better?
3️⃣ Book a free consultation with our experts?`;
        }
        break;

      default:
        return isArabic
          ? `شكراً لتواصلك معنا! 😊

أنا مساعدك الذكي في DigitalPro، وأنا هنا لمساعدتك في فهم احتياجاتك الرقمية وتقديم الحلول المناسبة.

🌟 **خدماتنا الرئيسية:**
• تصميم الشعارات والهوية التجارية
• تطوير المواقع الإلكترونية
• حلول الذكاء الاصطناعي
• التسويق الرقمي

أخبرني، ما الذي تحتاج مساعدة فيه اليوم؟`
          : `Thank you for reaching out! 😊

I'm your AI assistant at DigitalPro, and I'm here to help you understand your digital needs and provide the right solutions.

🌟 **Our main services:**
• Logo design and brand identity
• Website development
• AI solutions
• Digital marketing

Tell me, what do you need help with today?`;
    }

    return isArabic 
      ? 'شكراً لك! كيف يمكنني مساعدتك بشكل أفضل؟'
      : 'Thank you! How can I better assist you?';
  }, [conversationContext]);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      content,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
      // Analyze user intent
      const intent = analyzeUserIntent(content);
      
      // Generate intelligent response
      const response = generateIntelligentResponse(content, intent);
      
      // Simulate realistic thinking time
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
      
      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        content: response,
        sender: 'assistant',
        timestamp: new Date(),
        type: intent.category === 'consultation' && conversationContext.messageCount >= 3 ? 'form_suggestion' : 'text'
      };

      setMessages(prev => [...prev, assistantMessage]);

      // Save conversation to database
      await supabase.from('chat_sessions').upsert({
        session_id: `intelligent_${Date.now()}`,
        messages: JSON.stringify([userMessage, assistantMessage]),
        user_data: JSON.stringify({ 
          intent, 
          context: conversationContext,
          timestamp: new Date().toISOString() 
        }),
      });

    } catch (error) {
      console.error('Error in intelligent AI response:', error);
      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        content: 'I apologize, but I encountered an error. Please try again.',
        sender: 'assistant',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  }, [analyzeUserIntent, generateIntelligentResponse, conversationContext]);

  const clearConversation = useCallback(() => {
    setMessages([]);
    setConversationContext({});
  }, []);

  const suggestFormFill = useCallback(() => {
    const isArabic = conversationContext.language === 'ar';
    return isArabic
      ? 'بناءً على محادثتنا، هل تود ملء نموذج تفصيلي لفريقنا؟'
      : 'Based on our conversation, would you like to fill out a detailed form for our team?';
  }, [conversationContext]);

  return {
    messages,
    isTyping,
    sendMessage,
    clearConversation,
    suggestFormFill,
    conversationContext
  };
};
