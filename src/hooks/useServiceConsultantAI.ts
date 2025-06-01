
import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface ServiceInquiry {
  service: string;
  userNeeds: string;
  businessType: string;
  timeline: string;
  additionalInfo: string;
  contactPreference: string;
  contactDetails: string;
  preferredTime: string;
  name: string;
  email: string;
  phone?: string;
}

interface ConversationState {
  stage: 'greeting' | 'service_selection' | 'needs_gathering' | 'form_preview' | 'contact_preference' | 'completed';
  selectedService?: string;
  gatheredInfo: Partial<ServiceInquiry>;
}

export const useServiceConsultantAI = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [conversationState, setConversationState] = useState<ConversationState>({
    stage: 'greeting',
    gatheredInfo: {}
  });

  const serviceKnowledge = {
    'logo-design': {
      name: 'Logo Design',
      description: 'Professional brand identity creation with unique, memorable designs that capture your brand essence.',
      process: 'Discovery → Concepts → Refinement → Final Files',
      deliverables: ['Multiple logo concepts', 'Vector files (AI, EPS, SVG)', 'High-resolution PNG/JPG', 'Brand guidelines', 'Social media variations'],
      timeline: '3-7 business days',
      questions: [
        'What type of business/organization is this logo for?',
        'Do you have any existing brand colors or preferences?',
        'What style are you looking for? (modern, classic, playful, etc.)',
        'Who is your target audience?',
        'Any specific elements you want included or avoided?'
      ]
    },
    'website-development': {
      name: 'Website Development',
      description: 'Modern, responsive websites built with cutting-edge technology for optimal performance and user experience.',
      process: 'Planning → Design → Development → Testing → Launch',
      deliverables: ['Fully responsive website', 'Content management system', 'SEO optimization', 'Security features', 'Analytics integration'],
      timeline: '2-6 weeks',
      questions: [
        'What type of website do you need? (business, e-commerce, portfolio, etc.)',
        'How many pages approximately?',
        'Do you need e-commerce functionality?',
        'Do you have existing content or need content creation?',
        'Any specific features or integrations required?'
      ]
    },
    'ecommerce-solutions': {
      name: 'E-commerce Solutions',
      description: 'Complete online store solutions with payment processing, inventory management, and customer experience optimization.',
      process: 'Strategy → Design → Development → Integration → Launch',
      deliverables: ['Online store platform', 'Payment gateway integration', 'Inventory management', 'Order processing system', 'Analytics dashboard'],
      timeline: '3-8 weeks',
      questions: [
        'What products will you be selling?',
        'How many products initially?',
        'Do you need inventory management?',
        'What payment methods do you want to accept?',
        'Do you have existing product data/images?'
      ]
    },
    'ai-assistants': {
      name: 'AI Personal Assistants',
      description: 'Intelligent chatbots and virtual assistants powered by advanced AI to enhance customer service and business automation.',
      process: 'Analysis → Training → Integration → Testing → Deployment',
      deliverables: ['Custom AI assistant', 'Integration setup', 'Training data', 'Analytics dashboard', 'Ongoing support'],
      timeline: '2-4 weeks',
      questions: [
        'What tasks should the AI assistant handle?',
        'Where will it be deployed? (website, social media, etc.)',
        'What languages should it support?',
        'Do you need it integrated with existing systems?',
        'What type of customer interactions do you expect?'
      ]
    },
    'digital-marketing': {
      name: 'Digital Marketing',
      description: 'Comprehensive digital marketing strategies including social media management, SEO, and targeted advertising campaigns.',
      process: 'Audit → Strategy → Implementation → Monitoring → Optimization',
      deliverables: ['Marketing strategy', 'Content calendar', 'Ad campaigns', 'Analytics reports', 'Performance optimization'],
      timeline: 'Ongoing monthly service',
      questions: [
        'What are your main marketing goals?',
        'Who is your target audience?',
        'Which platforms are you currently using?',
        'What\'s your current marketing approach?',
        'Do you have existing marketing materials?'
      ]
    }
  };

  const generateResponse = useCallback((userMessage: string, language: string = 'en') => {
    const isArabic = language === 'ar';
    const lowerMessage = userMessage.toLowerCase();
    
    // Check for pricing inquiries and redirect to form
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('سعر') || lowerMessage.includes('تكلفة')) {
      return isArabic 
        ? `أفهم اهتمامك بمعرفة التفاصيل المالية! 💼

نحن نؤمن بتقديم عروض مخصصة تناسب احتياجاتك تماماً، لذلك نفضل أولاً فهم مشروعك بالتفصيل.

🎯 **لماذا نتبع هذا النهج؟**
• كل مشروع فريد ومتطلباته مختلفة
• نريد تقديم أفضل قيمة مقابل استثمارك
• نضمن عدم دفعك مقابل خدمات لا تحتاجها

📝 **الخطوة التالية:**
دعني أساعدك في ملء نموذج سريع يوضح احتياجاتك، وسيقوم فريقنا بالتواصل معك خلال 24 ساعة بعرض مفصل ومخصص.

هل تود أن نبدأ في فهم احتياجاتك؟`
        : `I understand you're interested in the financial details! 💼

We believe in providing customized quotes that perfectly match your needs, so we prefer to first understand your project in detail.

🎯 **Why do we follow this approach?**
• Every project is unique with different requirements
• We want to provide the best value for your investment
• We ensure you don't pay for services you don't need

📝 **Next Step:**
Let me help you fill out a quick form that outlines your needs, and our team will contact you within 24 hours with a detailed, customized proposal.

Would you like to start understanding your needs?`;
    }

    switch (conversationState.stage) {
      case 'greeting':
        return isArabic
          ? `مرحباً! 🌟 أنا مستشارك الرقمي في DigitalPro

أنا هنا لمساعدتك في اختيار الخدمة المثالية لاحتياجاتك وجمع المعلومات اللازمة لتقديم أفضل حل مخصص لك.

🎯 **خدماتنا الرئيسية:**
• تصميم الشعارات - هويات بصرية مميزة ولا تُنسى
• تطوير المواقع - مواقع حديثة وسريعة
• المتاجر الإلكترونية - حلول تجارة شاملة
• المساعدين الأذكياء - روبوتات محادثة متطورة
• التسويق الرقمي - استراتيجيات نمو فعالة

ما الخدمة التي تهمك أكثر؟ أم تريد معرفة المزيد عن خدمة معينة؟`
          : `Hello! 🌟 I'm your digital consultant at DigitalPro

I'm here to help you choose the perfect service for your needs and gather the necessary information to provide the best customized solution for you.

🎯 **Our Main Services:**
• Logo Design - Distinctive and memorable visual identities
• Website Development - Modern and fast websites
• E-commerce Solutions - Comprehensive commerce solutions
• AI Assistants - Advanced chatbots
• Digital Marketing - Effective growth strategies

Which service interests you most? Or would you like to know more about a specific service?`;

      case 'service_selection':
        // Handle service selection based on user input
        let selectedService = '';
        if (lowerMessage.includes('logo') || lowerMessage.includes('شعار')) {
          selectedService = 'logo-design';
        } else if (lowerMessage.includes('website') || lowerMessage.includes('موقع')) {
          selectedService = 'website-development';
        } else if (lowerMessage.includes('ecommerce') || lowerMessage.includes('متجر')) {
          selectedService = 'ecommerce-solutions';
        } else if (lowerMessage.includes('ai') || lowerMessage.includes('chatbot') || lowerMessage.includes('ذكي')) {
          selectedService = 'ai-assistants';
        } else if (lowerMessage.includes('marketing') || lowerMessage.includes('تسويق')) {
          selectedService = 'digital-marketing';
        }

        if (selectedService && serviceKnowledge[selectedService as keyof typeof serviceKnowledge]) {
          const service = serviceKnowledge[selectedService as keyof typeof serviceKnowledge];
          setConversationState(prev => ({
            ...prev,
            stage: 'needs_gathering',
            selectedService,
            gatheredInfo: { ...prev.gatheredInfo, service: service.name }
          }));

          return isArabic
            ? `ممتاز! ${service.name} خيار رائع! 🎨

**عن هذه الخدمة:**
${service.description}

**عمليتنا:**
${service.process}

**ما ستحصل عليه:**
${service.deliverables.map(item => `• ${item}`).join('\n')}

**الجدول الزمني المتوقع:** ${service.timeline}

الآن دعني أفهم احتياجاتك بالتفصيل لأقدم لك أفضل حل:

${service.questions[0]}`
            : `Excellent! ${service.name} is a great choice! 🎨

**About This Service:**
${service.description}

**Our Process:**
${service.process}

**What You'll Get:**
${service.deliverables.map(item => `• ${item}`).join('\n')}

**Expected Timeline:** ${service.timeline}

Now let me understand your needs in detail to provide you with the best solution:

${service.questions[0]}`;
        }

        return isArabic
          ? 'يمكنك اختيار من الخدمات المذكورة أعلاه، أو إخباري بالتفصيل عما تحتاجه؟'
          : 'You can choose from the services mentioned above, or tell me in detail what you need?';

      default:
        return isArabic
          ? 'شكراً لك! كيف يمكنني مساعدتك اليوم؟'
          : 'Thank you! How can I help you today?';
    }
  }, [conversationState]);

  const handleUserResponse = useCallback((message: string, language: string = 'en') => {
    // Update conversation state based on current stage and user response
    const currentService = conversationState.selectedService;
    const service = currentService ? serviceKnowledge[currentService as keyof typeof serviceKnowledge] : null;

    if (conversationState.stage === 'needs_gathering' && service) {
      // Collect information gradually
      const updatedInfo = { ...conversationState.gatheredInfo };
      
      // Simple logic to map responses to fields (can be enhanced)
      if (!updatedInfo.businessType) {
        updatedInfo.businessType = message;
      } else if (!updatedInfo.userNeeds) {
        updatedInfo.userNeeds = message;
      } else if (!updatedInfo.timeline) {
        updatedInfo.timeline = message;
      }

      setConversationState(prev => ({
        ...prev,
        gatheredInfo: updatedInfo
      }));
    }
  }, [conversationState]);

  const generateFormSummary = useCallback(() => {
    const info = conversationState.gatheredInfo;
    const service = conversationState.selectedService ? 
      serviceKnowledge[conversationState.selectedService as keyof typeof serviceKnowledge] : null;

    return {
      service: service?.name || '',
      details: info
    };
  }, [conversationState]);

  const submitInquiry = useCallback(async (inquiryData: ServiceInquiry) => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('inquiries')
        .insert({
          name: inquiryData.name,
          email: inquiryData.email,
          phone: inquiryData.phone,
          inquiry_type: 'service_inquiry',
          inquiry_text: `Service: ${inquiryData.service}\n\nDetails:\n${JSON.stringify(inquiryData, null, 2)}`,
          language: 'en',
          metadata: {
            source: 'ai_consultant',
            service: inquiryData.service,
            contact_preference: inquiryData.contactPreference,
            contact_details: inquiryData.contactDetails,
            preferred_time: inquiryData.preferredTime
          }
        });

      if (error) throw error;

      toast({
        title: "Inquiry Submitted Successfully! 🎉",
        description: "Our team will contact you within 24 hours with a customized proposal.",
      });

      return true;
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      toast({
        title: "Submission Error",
        description: "Please try again or contact us directly.",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  return {
    generateResponse,
    handleUserResponse,
    generateFormSummary,
    submitInquiry,
    conversationState,
    setConversationState,
    isLoading
  };
};
