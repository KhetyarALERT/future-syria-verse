
import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, X, Bot, User, Minimize2, Maximize2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

const AIChatbot: React.FC = () => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');
  const [sessionId, setSessionId] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const labels = {
    ar: {
      title: 'المساعد الذكي',
      placeholder: 'اكتب رسالتك هنا...',
      send: 'إرسال',
      typing: 'المساعد يكتب...',
      welcome: 'مرحباً! أنا مساعدك الذكي. كيف يمكنني مساعدتك اليوم؟',
      error: 'عذراً، حدث خطأ. يرجى المحاولة مرة أخرى.',
      inquiryCreated: 'تم إنشاء استفسار جديد بناء على محادثتنا.',
      supportOptions: {
        complaint: 'شكوى',
        inquiry: 'استفسار جديد',
        suggestion: 'اقتراح',
        other: 'أخرى'
      }
    },
    en: {
      title: 'AI Assistant',
      placeholder: 'Type your message here...',
      send: 'Send',
      typing: 'Assistant is typing...',
      welcome: 'Hello! I\'m your AI assistant. How can I help you today?',
      error: 'Sorry, an error occurred. Please try again.',
      inquiryCreated: 'A new inquiry has been created based on our conversation.',
      supportOptions: {
        complaint: 'Complaint',
        inquiry: 'New Inquiry',
        suggestion: 'Suggestion',
        other: 'Other'
      }
    }
  };

  const t = labels[language];

  useEffect(() => {
    if (isOpen && !sessionId) {
      const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      setSessionId(newSessionId);
      
      // Add welcome message
      const welcomeMessage: Message = {
        id: 'welcome',
        type: 'bot',
        content: t.welcome,
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, sessionId, t.welcome]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const simulateAIResponse = async (userMessage: string): Promise<string> => {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    const lowerMessage = userMessage.toLowerCase();
    
    // Arabic keywords
    const arabicKeywords = {
      greeting: ['مرحبا', 'أهلا', 'السلام', 'صباح', 'مساء'],
      service: ['خدمة', 'خدمات', 'تصميم', 'موقع', 'متجر', 'ذكي'],
      support: ['مساعدة', 'دعم', 'مشكلة', 'خطأ', 'عطل'],
      complaint: ['شكوى', 'غير راضي', 'سيء', 'بطيء', 'لا يعمل'],
      pricing: ['سعر', 'أسعار', 'تكلفة', 'مجاني', 'رخيص'],
      contact: ['تواصل', 'اتصال', 'هاتف', 'إيميل', 'عنوان']
    };

    // English keywords
    const englishKeywords = {
      greeting: ['hello', 'hi', 'hey', 'good morning', 'good evening'],
      service: ['service', 'design', 'website', 'logo', 'ecommerce', 'ai'],
      support: ['help', 'support', 'problem', 'issue', 'error'],
      complaint: ['complaint', 'unsatisfied', 'bad', 'slow', 'not working'],
      pricing: ['price', 'pricing', 'cost', 'free', 'cheap', 'expensive'],
      contact: ['contact', 'call', 'phone', 'email', 'address']
    };

    const keywords = language === 'ar' ? arabicKeywords : englishKeywords;
    
    // Check for different types of inquiries
    if (keywords.greeting.some(word => lowerMessage.includes(word))) {
      return language === 'ar' 
        ? 'أهلاً وسهلاً! أنا هنا لمساعدتك. يمكنني مساعدتك في الاستفسار عن خدماتنا، تقديم الدعم، أو أي شيء آخر تحتاجه.'
        : 'Welcome! I\'m here to help you. I can assist you with inquiries about our services, provide support, or anything else you need.';
    }
    
    if (keywords.service.some(word => lowerMessage.includes(word))) {
      return language === 'ar'
        ? 'نحن نقدم خدمات متنوعة تشمل تصميم الشعارات، تطوير المواقع، المتاجر الإلكترونية، والمساعدين الأذكياء. أي خدمة تهمك أكثر؟'
        : 'We offer various services including logo design, website development, e-commerce solutions, and AI assistants. Which service interests you most?';
    }
    
    if (keywords.support.some(word => lowerMessage.includes(word))) {
      await createSupportRequest(userMessage, 'support_request');
      return language === 'ar'
        ? 'فهمت أنك تحتاج للمساعدة. تم تسجيل طلب الدعم الخاص بك وسيتواصل معك فريقنا قريباً. هل يمكنك تقديم المزيد من التفاصيل؟'
        : 'I understand you need help. Your support request has been logged and our team will contact you soon. Can you provide more details?';
    }
    
    if (keywords.complaint.some(word => lowerMessage.includes(word))) {
      await createSupportRequest(userMessage, 'complaint');
      return language === 'ar'
        ? 'أعتذر عن أي إزعاج. تم تسجيل شكواك وسيقوم فريقنا بمراجعتها والتواصل معك لحل المشكلة.'
        : 'I apologize for any inconvenience. Your complaint has been logged and our team will review it and contact you to resolve the issue.';
    }
    
    if (keywords.pricing.some(word => lowerMessage.includes(word))) {
      return language === 'ar'
        ? 'أسعارنا تنافسية وتعتمد على نوع الخدمة ومتطلباتك. يمكنني مساعدتك في الحصول على عرض سعر مخصص. ما هي الخدمة التي تهمك؟'
        : 'Our prices are competitive and depend on the service type and your requirements. I can help you get a custom quote. What service are you interested in?';
    }
    
    if (keywords.contact.some(word => lowerMessage.includes(word))) {
      return language === 'ar'
        ? 'يمكنك التواصل معنا عبر: hello@digitalsolutions.com أو +1 (234) 567-890. نحن نرحب بالعملاء من سوريا!'
        : 'You can contact us at: hello@digitalsolutions.com or +1 (234) 567-890. We welcome clients from Syria!';
    }
    
    // Default intelligent response
    return language === 'ar'
      ? 'شكراً لك على رسالتك. سأقوم بتسجيل استفسارك وسيتواصل معك فريقنا قريباً للمساعدة. هل تود إضافة أي تفاصيل أخرى؟'
      : 'Thank you for your message. I\'ll log your inquiry and our team will contact you soon to help. Would you like to add any other details?';
  };

  const createSupportRequest = async (message: string, type: 'support_request' | 'complaint' | 'suggestion' = 'support_request') => {
    try {
      const { error } = await supabase
        .from('inquiries')
        .insert([{
          name: 'Chat User',
          email: 'chatbot@temp.com',
          inquiry_type: type,
          inquiry_text: message,
          language,
          metadata: { 
            source: 'chatbot',
            session_id: sessionId,
            timestamp: new Date().toISOString()
          }
        }]);

      if (error) throw error;
    } catch (error) {
      console.error('Error creating support request:', error);
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: `user_${Date.now()}`,
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      // Save chat session to Supabase
      const { error: upsertError } = await supabase
        .from('chat_sessions')
        .upsert([{
          session_id: sessionId,
          messages: [...messages, userMessage],
          user_data: { language }
        }], {
          onConflict: 'session_id'
        });

      if (upsertError) {
        console.error('Error saving chat session:', upsertError);
      }

      // Get AI response
      const aiResponse = await simulateAIResponse(input);
      
      const botMessage: Message = {
        id: `bot_${Date.now()}`,
        type: 'bot',
        content: aiResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      
      // Update chat session with bot response
      const { error: updateError } = await supabase
        .from('chat_sessions')
        .upsert([{
          session_id: sessionId,
          messages: [...messages, userMessage, botMessage],
          user_data: { language }
        }], {
          onConflict: 'session_id'
        });

      if (updateError) {
        console.error('Error updating chat session:', updateError);
      }

    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: `error_${Date.now()}`,
        type: 'bot',
        content: t.error,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-slate-600 transition-all duration-300 ${
      isMinimized ? 'w-80 h-16' : 'w-96 h-[500px]'
    }`}>
      {/* Header */}
      <div className={`flex items-center justify-between p-4 border-b border-gray-200 dark:border-slate-600 rounded-t-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white ${language === 'ar' ? 'rtl' : 'ltr'}`}>
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5" />
          <span className={`font-semibold ${language === 'ar' ? 'font-arabic' : ''}`}>{t.title}</span>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Language Toggle */}
          <div className="flex gap-1">
            <button
              onClick={() => setLanguage('ar')}
              className={`px-2 py-1 rounded text-xs ${language === 'ar' ? 'bg-white/20' : 'bg-white/10 hover:bg-white/20'}`}
            >
              ع
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-1 rounded text-xs ${language === 'en' ? 'bg-white/20' : 'bg-white/10 hover:bg-white/20'}`}
            >
              EN
            </button>
          </div>
          
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 hover:bg-white/20 rounded"
          >
            {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
          </button>
          
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-white/20 rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className={`flex-1 overflow-y-auto p-4 space-y-4 h-[360px] ${language === 'ar' ? 'rtl' : 'ltr'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`flex items-start gap-2 max-w-[80%] ${
                    message.type === 'user' ? 'flex-row-reverse' : ''
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.type === 'user' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 dark:bg-slate-600 text-gray-600 dark:text-gray-300'
                  }`}>
                    {message.type === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  
                  <div
                    className={`px-4 py-2 rounded-2xl ${
                      message.type === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-slate-700 text-gray-800 dark:text-gray-200'
                    } ${language === 'ar' ? 'font-arabic' : ''}`}
                  >
                    {message.content}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-slate-600 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                  </div>
                  <div className={`px-4 py-2 rounded-2xl bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 ${language === 'ar' ? 'font-arabic' : ''}`}>
                    {t.typing}
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className={`p-4 border-t border-gray-200 dark:border-slate-600 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={t.placeholder}
                className={`flex-1 px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${language === 'ar' ? 'font-arabic text-right' : ''}`}
              />
              <button
                onClick={handleSendMessage}
                disabled={!input.trim() || isTyping}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition-colors"
              >
                <Send className={`w-4 h-4 ${language === 'ar' ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AIChatbot;
