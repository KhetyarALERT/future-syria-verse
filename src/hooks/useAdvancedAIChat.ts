
import { useState, useCallback, useRef, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'text' | 'form' | 'suggestion';
}

export const useAdvancedAIChat = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Enhanced AI knowledge base with comprehensive service information
  const serviceKnowledge = {
    'logo-design': {
      name: 'Logo Design',
      description: 'Professional brand identity creation with unique, memorable designs that capture your brand essence.',
      features: ['Multiple concepts', 'Vector files', 'Brand guidelines', 'Social media variations', 'Unlimited revisions'],
      process: ['Discovery & Research', 'Concept Development', 'Design Refinement', 'Final Delivery'],
      deliverables: ['AI/EPS/SVG files', 'PNG/JPG variants', 'Brand style guide', 'Social media kit'],
      timeline: '3-7 business days',
      questions: [
        'What type of business/organization is this logo for?',
        'Do you have any existing brand colors or style preferences?',
        'What feeling or message should your logo convey?',
        'Who is your target audience?',
        'Do you have any competitors whose logos you admire or want to avoid?'
      ]
    },
    'website-development': {
      name: 'Website Development',
      description: 'Modern, responsive websites built with cutting-edge technology for optimal performance and user experience.',
      features: ['Responsive design', 'SEO optimization', 'Fast loading', 'Security features', 'Analytics integration'],
      process: ['Planning & Strategy', 'Design & Prototyping', 'Development', 'Testing & Optimization', 'Launch & Support'],
      deliverables: ['Fully responsive website', 'Content management system', 'SEO setup', 'Analytics dashboard', 'Training materials'],
      timeline: '2-6 weeks',
      questions: [
        'What type of website do you need? (business, portfolio, e-commerce, etc.)',
        'How many pages approximately?',
        'Do you have existing content or need content creation?',
        'What specific features or functionality do you need?',
        'Do you have any reference websites you like?'
      ]
    },
    'ecommerce-solutions': {
      name: 'E-commerce Solutions',
      description: 'Complete online store solutions with payment processing, inventory management, and customer experience optimization.',
      features: ['Product catalog', 'Payment gateway', 'Inventory management', 'Order tracking', 'Customer dashboard'],
      process: ['Business Analysis', 'Platform Setup', 'Design & Development', 'Payment Integration', 'Launch & Training'],
      deliverables: ['Online store platform', 'Payment processing', 'Inventory system', 'Order management', 'Analytics dashboard'],
      timeline: '3-8 weeks',
      questions: [
        'What products will you be selling?',
        'How many products initially and expected growth?',
        'What payment methods do you want to accept?',
        'Do you need inventory management and shipping integration?',
        'Do you have existing product data and images?'
      ]
    },
    'ai-assistants': {
      name: 'AI Personal Assistants',
      description: 'Intelligent chatbots and virtual assistants powered by advanced AI to enhance customer service and business automation.',
      features: ['Natural language processing', 'Multi-platform integration', 'Custom training', 'Analytics dashboard', '24/7 availability'],
      process: ['Requirements Analysis', 'AI Training', 'Integration Setup', 'Testing & Optimization', 'Deployment & Monitoring'],
      deliverables: ['Custom AI assistant', 'Integration setup', 'Training data', 'Analytics dashboard', 'Documentation'],
      timeline: '2-4 weeks',
      questions: [
        'What tasks should the AI assistant handle?',
        'Where will it be deployed? (website, social media, app, etc.)',
        'What languages should it support?',
        'Do you need integration with existing systems?',
        'What type of customer interactions do you expect?'
      ]
    },
    'digital-marketing': {
      name: 'Digital Marketing',
      description: 'Comprehensive digital marketing strategies including social media management, SEO, and targeted advertising campaigns.',
      features: ['Social media management', 'SEO optimization', 'Paid advertising', 'Content creation', 'Performance analytics'],
      process: ['Market Analysis', 'Strategy Development', 'Campaign Creation', 'Implementation & Monitoring', 'Optimization & Reporting'],
      deliverables: ['Marketing strategy', 'Content calendar', 'Ad campaigns', 'Analytics reports', 'Monthly optimization'],
      timeline: 'Ongoing monthly service',
      questions: [
        'What are your main marketing goals?',
        'Who is your target audience and demographics?',
        'Which platforms are you currently using?',
        'What\'s your current marketing budget range?',
        'What type of content performs best for your audience?'
      ]
    }
  };

  // Enhanced conversation management
  const [conversationState, setConversationState] = useState({
    stage: 'greeting',
    selectedService: '',
    gatheredInfo: {} as any,
    currentQuestionIndex: 0
  });

  const generateWelcomeMessage = useCallback(() => {
    return `🚀 Welcome to DigitalPro's AI Consultant! I'm here to help you find the perfect digital solution for your needs.

🎯 **Our Premium Services:**
• **Logo Design** - Distinctive brand identities that make you unforgettable
• **Website Development** - Modern, high-performance websites that convert
• **E-commerce Solutions** - Complete online stores that drive sales
• **AI Assistants** - Intelligent automation for your business
• **Digital Marketing** - Data-driven strategies for explosive growth

Which service interests you most? Or would you like to know more about any specific service?

💡 *Tip: I can also help you determine which services would be best for your specific business needs!*`;
  }, []);

  const generateServiceResponse = useCallback((service: string, userMessage: string) => {
    const serviceInfo = serviceKnowledge[service as keyof typeof serviceKnowledge];
    if (!serviceInfo) return "I'd be happy to help you with that service. Could you tell me more about what you're looking for?";

    // Check if user is asking about pricing
    const pricingKeywords = ['price', 'cost', 'budget', 'how much', 'pricing', 'expensive', 'cheap', 'affordable'];
    const isAskingPrice = pricingKeywords.some(keyword => 
      userMessage.toLowerCase().includes(keyword)
    );

    if (isAskingPrice) {
      return `I understand you're interested in the investment details for ${serviceInfo.name}! 💼

Rather than giving you generic pricing, I'd love to understand your specific needs first so I can provide you with the most accurate and valuable proposal.

🎯 **Why this approach works better:**
• Every project is unique with different requirements
• We want to ensure you get exactly what you need
• You won't pay for features you don't use
• We can suggest the best package for your goals

Let me ask you a few quick questions to understand your project better. This way, our team can provide you with a detailed, personalized proposal within 24 hours.

**First question:** ${serviceInfo.questions[0]}

Would you like to start with this, or do you have other questions about ${serviceInfo.name}?`;
    }

    return `Excellent choice! ${serviceInfo.name} is one of our most popular services! ✨

**About ${serviceInfo.name}:**
${serviceInfo.description}

**Key Features:**
${serviceInfo.features.map(feature => `• ${feature}`).join('\n')}

**Our Process:**
${serviceInfo.process.map((step, index) => `${index + 1}. ${step}`).join('\n')}

**What You'll Receive:**
${serviceInfo.deliverables.map(item => `• ${item}`).join('\n')}

**Timeline:** ${serviceInfo.timeline}

Now, I'd love to understand your specific needs better! Let me start with some questions to ensure we create the perfect solution for you:

**${serviceInfo.questions[0]}**

This information will help our team provide you with a customized proposal that fits your exact requirements.`;
  }, []);

  const generateFollowUpQuestion = useCallback((service: string, questionIndex: number) => {
    const serviceInfo = serviceKnowledge[service as keyof typeof serviceKnowledge];
    if (!serviceInfo || questionIndex >= serviceInfo.questions.length) {
      return "Perfect! I have all the information I need. Let me prepare a summary for you.";
    }
    return serviceInfo.questions[questionIndex];
  }, []);

  const callOpenRouterAPI = useCallback(async (message: string, conversationHistory: Message[]) => {
    try {
      const response = await supabase.functions.invoke('openrouter-ai-chat', {
        body: {
          message,
          conversationHistory: conversationHistory.slice(-10).map(msg => ({
            role: msg.sender === 'user' ? 'user' : 'assistant',
            content: msg.content
          })),
          language: 'en',
          companyKnowledge: {
            services: Object.values(serviceKnowledge),
            specialties: ['Digital Innovation', 'AI Solutions', 'Business Automation', 'Brand Development']
          },
          recentInquiries: [],
          aiConfig: {
            temperature: 0.7,
            max_tokens: 1000
          }
        }
      });

      if (response.error) {
        console.error('Supabase function error:', response.error);
        throw new Error(response.error.message || 'AI service error');
      }

      return response.data?.response || 'I apologize, but I\'m having trouble processing your request right now. Please try again.';
    } catch (error) {
      console.error('AI Chat Error:', error);
      throw error;
    }
  }, []);

  const processUserMessage = useCallback(async (message: string) => {
    setIsTyping(true);
    
    try {
      let aiResponse = '';
      const lowerMessage = message.toLowerCase();

      // Detect service interest
      const serviceDetection = {
        'logo': 'logo-design',
        'website': 'website-development',
        'ecommerce': 'ecommerce-solutions',
        'e-commerce': 'ecommerce-solutions',
        'store': 'ecommerce-solutions',
        'ai': 'ai-assistants',
        'chatbot': 'ai-assistants',
        'marketing': 'digital-marketing',
        'social media': 'digital-marketing'
      };

      const detectedService = Object.entries(serviceDetection).find(([keyword]) => 
        lowerMessage.includes(keyword)
      )?.[1];

      if (conversationState.stage === 'greeting' && messages.length <= 1) {
        if (detectedService) {
          setConversationState(prev => ({
            ...prev,
            stage: 'service_selected',
            selectedService: detectedService,
            currentQuestionIndex: 0
          }));
          aiResponse = generateServiceResponse(detectedService, message);
        } else {
          // Use AI for more complex queries
          aiResponse = await callOpenRouterAPI(message, messages);
        }
      } else if (conversationState.stage === 'service_selected') {
        // Collect information step by step
        const currentInfo = { ...conversationState.gatheredInfo };
        const questionIndex = conversationState.currentQuestionIndex;
        
        // Store the answer
        currentInfo[`answer_${questionIndex}`] = message;
        
        // Move to next question or finish
        const nextQuestionIndex = questionIndex + 1;
        const serviceInfo = serviceKnowledge[conversationState.selectedService as keyof typeof serviceKnowledge];
        
        if (nextQuestionIndex < serviceInfo.questions.length) {
          setConversationState(prev => ({
            ...prev,
            gatheredInfo: currentInfo,
            currentQuestionIndex: nextQuestionIndex
          }));
          
          aiResponse = `Great! I've noted that information. 

**Next question:** ${generateFollowUpQuestion(conversationState.selectedService, nextQuestionIndex)}`;
        } else {
          // All questions answered, prepare summary
          setConversationState(prev => ({
            ...prev,
            stage: 'summary',
            gatheredInfo: currentInfo
          }));
          
          aiResponse = `Perfect! I have all the information needed. Let me prepare a comprehensive summary of your requirements:

📋 **Project Summary:**
• **Service:** ${serviceInfo.name}
• **Responses:** ${Object.values(currentInfo).join(', ')}

Now I need your contact information to send this to our team for a personalized proposal.

**What's your name?**`;
        }
      } else if (conversationState.stage === 'summary') {
        // Handle contact information collection
        if (!conversationState.gatheredInfo.name) {
          setConversationState(prev => ({
            ...prev,
            gatheredInfo: { ...prev.gatheredInfo, name: message }
          }));
          aiResponse = "Thank you! **What's your email address?**";
        } else if (!conversationState.gatheredInfo.email) {
          setConversationState(prev => ({
            ...prev,
            gatheredInfo: { ...prev.gatheredInfo, email: message }
          }));
          aiResponse = "Great! **What's your phone number?** (optional)";
        } else if (!conversationState.gatheredInfo.phone) {
          setConversationState(prev => ({
            ...prev,
            gatheredInfo: { ...prev.gatheredInfo, phone: message }
          }));
          aiResponse = "Perfect! **How would you prefer to be contacted?** (WhatsApp, Email, Phone call, etc.)";
        } else if (!conversationState.gatheredInfo.contactMethod) {
          setConversationState(prev => ({
            ...prev,
            gatheredInfo: { ...prev.gatheredInfo, contactMethod: message }
          }));
          aiResponse = "Excellent! **What time works best for you?** (Morning, afternoon, evening, or specific times)";
        } else if (!conversationState.gatheredInfo.preferredTime) {
          setConversationState(prev => ({
            ...prev,
            gatheredInfo: { ...prev.gatheredInfo, preferredTime: message },
            stage: 'completed'
          }));
          
          // Submit the inquiry
          try {
            const { error } = await supabase.from('inquiries').insert({
              name: conversationState.gatheredInfo.name,
              email: conversationState.gatheredInfo.email,
              phone: conversationState.gatheredInfo.phone || null,
              inquiry_type: 'service_inquiry',
              inquiry_text: `Service: ${serviceKnowledge[conversationState.selectedService as keyof typeof serviceKnowledge].name}\n\nProject Details:\n${JSON.stringify(conversationState.gatheredInfo, null, 2)}`,
              language: 'en',
              metadata: {
                source: 'ai_consultant',
                service: conversationState.selectedService,
                contact_method: conversationState.gatheredInfo.contactMethod,
                preferred_time: message,
                session_id: sessionId
              }
            });

            if (error) throw error;

            toast({
              title: "🎉 Request Submitted Successfully!",
              description: "Our team will contact you within 24 hours with a customized proposal.",
            });

            aiResponse = `🎉 **Perfect! Your request has been submitted successfully!**

**Summary of your submission:**
• **Service:** ${serviceKnowledge[conversationState.selectedService as keyof typeof serviceKnowledge].name}
• **Contact:** ${conversationState.gatheredInfo.name} (${conversationState.gatheredInfo.email})
• **Preferred contact:** ${conversationState.gatheredInfo.contactMethod} at ${message}

Our expert team will review your requirements and contact you within **24 hours** with a detailed, personalized proposal.

Thank you for choosing DigitalPro! 🚀

Is there anything else I can help you with today?`;
          } catch (error) {
            console.error('Error submitting inquiry:', error);
            aiResponse = "I apologize, but there was an error submitting your request. Please try again or contact us directly.";
          }
        }
      } else {
        // Use AI for general conversation
        aiResponse = await callOpenRouterAPI(message, messages);
      }

      // Add AI response
      const aiMessage: Message = {
        id: `ai_${Date.now()}`,
        content: aiResponse,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      
    } catch (error) {
      console.error('Error processing message:', error);
      
      const errorMessage: Message = {
        id: `error_${Date.now()}`,
        content: "I apologize, but I'm experiencing some technical difficulties. Please try again or contact our support team directly.",
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  }, [conversationState, messages, generateServiceResponse, callOpenRouterAPI, sessionId, toast]);

  const sendMessage = useCallback((message: string) => {
    if (!message.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: `user_${Date.now()}`,
      content: message,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    processUserMessage(message);
  }, [processUserMessage]);

  const initializeChat = useCallback(() => {
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        id: 'welcome',
        content: generateWelcomeMessage(),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [messages.length, generateWelcomeMessage]);

  return {
    messages,
    isTyping,
    sendMessage,
    initializeChat,
    messagesEndRef,
    conversationState
  };
};
