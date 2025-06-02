
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface KnowledgeItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  tags: string[];
  language: string;
}

export function useEnhancedAI() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [knowledgeBase, setKnowledgeBase] = useState<KnowledgeItem[]>([]);

  const loadKnowledgeBase = useCallback(async (language: string = 'en') => {
    try {
      // Use hardcoded knowledge base since ai_knowledge_base table may not exist
      const defaultKnowledge: KnowledgeItem[] = [
        {
          id: '1',
          category: 'services',
          question: 'What services do you offer?',
          answer: 'We offer logo design, website development, e-commerce solutions, digital marketing, AI systems, and social media management.',
          tags: ['services', 'general'],
          language: 'en'
        },
        {
          id: '2',
          category: 'services',
          question: 'ما هي الخدمات التي تقدمونها؟',
          answer: 'نحن نقدم تصميم الشعارات، تطوير المواقع، حلول التجارة الإلكترونية، التسويق الرقمي، أنظمة الذكاء الاصطناعي، وإدارة وسائل التواصل الاجتماعي.',
          tags: ['services', 'general'],
          language: 'ar'
        },
        {
          id: '3',
          category: 'pricing',
          question: 'How do you price your services?',
          answer: 'We provide customized quotes based on your specific needs. Each project is unique, so we prefer to understand your requirements first through a free consultation.',
          tags: ['pricing', 'consultation'],
          language: 'en'
        },
        {
          id: '4',
          category: 'process',
          question: 'What is your development process?',
          answer: 'Our process includes: 1) Free consultation, 2) Requirement analysis, 3) Design & development, 4) Testing & refinement, 5) Delivery & support.',
          tags: ['process', 'workflow'],
          language: 'en'
        }
      ];
      
      setKnowledgeBase(defaultKnowledge.filter(item => item.language === language));
    } catch (error) {
      console.error('Error loading knowledge base:', error);
    }
  }, []);

  const findBestMatch = useCallback((userMessage: string, language: string = 'en'): string | null => {
    const relevantKnowledge = knowledgeBase.filter(item => item.language === language);
    
    for (const item of relevantKnowledge) {
      const questionWords = item.question.toLowerCase().split(' ');
      const messageWords = userMessage.toLowerCase().split(' ');
      
      const matchCount = questionWords.filter(word => 
        messageWords.some(msgWord => msgWord.includes(word) || word.includes(msgWord))
      ).length;
      
      if (matchCount >= 2) {
        return item.answer;
      }
    }
    
    return null;
  }, [knowledgeBase]);

  const sendMessage = useCallback(async (content: string, language: string = 'en') => {
    setIsLoading(true);
    
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    try {
      // First, try to find an answer in the knowledge base
      let response = findBestMatch(content, language);
      
      if (!response) {
        // If no match found, generate a contextual response
        if (content.toLowerCase().includes('price') || content.toLowerCase().includes('cost')) {
          response = language === 'ar' 
            ? 'نحن نقدم عروض أسعار مخصصة بناءً على احتياجاتك المحددة. يرجى ملء نموذج الاستشارة المجانية وسنتواصل معك خلال 24 ساعة.'
            : 'We provide customized quotes based on your specific needs. Please fill out our free consultation form and we\'ll get back to you within 24 hours.';
        } else if (content.toLowerCase().includes('contact') || content.toLowerCase().includes('reach')) {
          response = language === 'ar'
            ? 'يمكنك التواصل معنا عبر نموذج الاتصال، أو عبر البريد الإلكتروني: hello@digitalpro.ai، أو الهاتف: +1 (123) 456-7890'
            : 'You can reach us through our contact form, email us at hello@digitalpro.ai, or call us at +1 (123) 456-7890';
        } else {
          response = language === 'ar'
            ? 'شكراً لك على استفسارك. فريقنا سيقوم بالرد عليك قريباً. هل يمكنني مساعدتك في شيء محدد حول خدماتنا؟'
            : 'Thank you for your inquiry. Our team will get back to you soon. Is there something specific about our services I can help you with?';
        }
      }
      
      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      
      // Save chat session to Supabase
      const sessionId = `session_${Date.now()}`;
      await supabase.from('chat_sessions').upsert({
        session_id: sessionId,
        messages: JSON.stringify([userMessage, assistantMessage]),
        user_data: JSON.stringify({ language, timestamp: new Date().toISOString() }),
      });
      
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: language === 'ar' 
          ? 'عذراً، حدث خطأ. يرجى المحاولة مرة أخرى.'
          : 'Sorry, something went wrong. Please try again.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [findBestMatch]);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    messages,
    isLoading,
    sendMessage,
    clearMessages,
    loadKnowledgeBase,
  };
}
