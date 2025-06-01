import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { X, Send, Paperclip, Bot, User, Sparkles, MessageSquare, Zap, Brain, Mic, MicOff, Copy, Download, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useOptimizedAIAgent } from '@/hooks/useOptimizedAIAgent';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import IntelligentServiceChat from './IntelligentServiceChat';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  attachments?: string[];
}

interface PerformanceOptimizedChatProps {
  isOpen: boolean;
  onClose: () => void;
}

const PerformanceOptimizedChat: React.FC<PerformanceOptimizedChatProps> = ({
  isOpen,
  onClose
}) => {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const { sendMessageToAI, isLoading, shouldRedirectToForm } = useOptimizedAIAgent();
  const prefersReducedMotion = useReducedMotion();
  
  const [messages, setMessages] = useState<Message[]>([{
    id: '1',
    content: i18n.language === 'ar' 
      ? "مرحباً! 🌟 أهلاً بك في DigitalPro - مركز الحلول الرقمية المتطورة. أنا مساعدك الذكي المدعوم بالذكاء الاصطناعي، وأنا هنا لفهم احتياجاتك وتقديم أفضل الحلول المبتكرة. كيف يمكنني مساعدتك في تحويل رؤيتك الرقمية إلى واقع؟ ✨" 
      : "Hello! 🌟 Welcome to DigitalPro - Your Advanced Digital Solutions Hub. I'm your AI-powered intelligent assistant, here to understand your needs and provide cutting-edge solutions. How can I help transform your digital vision into reality today? ✨",
    sender: 'bot',
    timestamp: new Date()
  }]);
  
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);
  const isRTL = i18n.language === 'ar';

  // Memoized animation variants for better performance
  const modalVariants = useMemo(() => ({
    hidden: { opacity: 0, scale: prefersReducedMotion ? 1 : 0.9 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: prefersReducedMotion ? 1 : 0.9 }
  }), [prefersReducedMotion]);

  const messageVariants = useMemo(() => ({
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: { opacity: 1, y: 0 }
  }), [prefersReducedMotion]);

  // Optimized scroll function
  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Voice recognition setup
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = i18n.language === 'ar' ? 'ar-SA' : 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };
    }
  }, [i18n.language]);

  // Optimized message saving
  const saveChatSession = useCallback(async (updatedMessages: Message[]) => {
    try {
      await supabase
        .from('user_chat_sessions')
        .upsert({
          session_id: sessionId,
          messages: JSON.stringify(updatedMessages),
          user_data: JSON.stringify({ language: i18n.language }),
          updated_at: new Date().toISOString()
        });
    } catch (error) {
      console.error('Error saving chat session:', error);
    }
  }, [sessionId, i18n.language]);

  const [showServiceChat, setShowServiceChat] = useState(false);

  const handleSendMessage = useCallback(async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date()
    };

    const updatedMessagesWithUser = [...messages, userMessage];
    setMessages(updatedMessagesWithUser);
    setInput('');

    const conversationHistory = messages.slice(1).map(msg => ({
      role: msg.sender === 'user' ? 'user' as const : 'assistant' as const,
      content: msg.content
    }));

    try {
      const aiResponse = await sendMessageToAI(input, conversationHistory);
      
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        sender: 'bot',
        timestamp: new Date()
      };

      const finalMessages = [...updatedMessagesWithUser, botResponse];
      setMessages(finalMessages);
      await saveChatSession(finalMessages);

      if (shouldRedirectToForm) {
        setTimeout(() => {
          const redirectMessage: Message = {
            id: (Date.now() + 2).toString(),
            content: i18n.language === 'ar' 
              ? `🎯 **دعني أساعدك بشكل أفضل!**\n\nسأفتح لك نافذة استشارة ذكية حيث يمكنني:\n• فهم احتياجاتك بالتفصيل\n• جمع المعلومات اللازمة\n• إعداد نموذج مخصص لمشروعك\n• ترتيب التواصل مع فريقنا\n\nهذا سيضمن حصولك على أفضل عرض مخصص لاحتياجاتك!`
              : `🎯 **Let me help you better!**\n\nI'll open an intelligent consultation window where I can:\n• Understand your needs in detail\n• Gather necessary information\n• Prepare a custom form for your project\n• Arrange communication with our team\n\nThis will ensure you get the best customized proposal for your needs!`,
            sender: 'bot',
            timestamp: new Date()
          };
          setMessages(prev => [...prev, redirectMessage]);
          
          setTimeout(() => {
            setShowServiceChat(true);
          }, 1500);
        }, 2000);
      }
    } catch (error) {
      console.error('Error getting AI response:', error);
      
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: i18n.language === 'ar' 
          ? 'شكراً لك على تواصلك! 😊 أنا هنا لمساعدتك في جميع احتياجاتك الرقمية. هل تود البدء بجلسة استشارة مجانية لفهم مشروعك بالتفصيل؟'
          : 'Thank you for reaching out! 😊 I\'m here to help with all your digital needs. Would you like to start with a free consultation to understand your project in detail?',
        sender: 'bot',
        timestamp: new Date()
      };
      
      const errorMessages = [...updatedMessagesWithUser, errorResponse];
      setMessages(errorMessages);
      await saveChatSession(errorMessages);
    }
  }, [input, isLoading, messages, sendMessageToAI, saveChatSession, i18n.language, shouldRedirectToForm]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }, [handleSendMessage]);

  const toggleVoiceRecognition = useCallback(() => {
    if (!recognitionRef.current) {
      toast({
        title: "Voice Recognition",
        description: "Voice recognition is not supported in your browser.",
        variant: "destructive"
      });
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  }, [isListening, toast]);

  const copyMessage = useCallback((content: string) => {
    navigator.clipboard.writeText(content);
    toast({
      title: "Copied",
      description: "Message copied to clipboard"
    });
  }, [toast]);

  const exportChat = useCallback(() => {
    const chatData = JSON.stringify(messages, null, 2);
    const blob = new Blob([chatData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat-export-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [messages]);

  const quickQuestions = useMemo(() => 
    i18n.language === 'ar' 
      ? ["🎨 أحتاج تصميم شعار احترافي ومميز", "💻 عرض سعر لموقع إلكتروني حديث", "📈 خدمات التسويق الرقمي المتقدمة", "🛒 حل متجر إلكتروني متكامل"] 
      : ["🎨 I need a professional logo design", "💻 Website development quote", "📈 Advanced digital marketing services", "🛒 Complete e-commerce solution"], 
    [i18n.language]
  );

  return (
    <>
      <AnimatePresence>
        {isOpen && !showServiceChat && (
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
            className={`fixed inset-0 z-50 ${isRTL ? 'rtl' : 'ltr'}`}
          >
            {/* Enhanced Header */}
            <div className="relative flex items-center justify-between p-6 border-b border-cyan-500/20 bg-slate-900/95 backdrop-blur-xl">
              <div className="flex items-center gap-4">
                <motion.div 
                  className="relative w-14 h-14 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-2xl flex items-center justify-center"
                  animate={prefersReducedMotion ? {} : {
                    boxShadow: [
                      "0 0 20px rgba(6, 182, 212, 0.5)",
                      "0 0 40px rgba(139, 92, 246, 0.7)",
                      "0 0 20px rgba(6, 182, 212, 0.5)"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Brain className="w-8 h-8 text-white" />
                </motion.div>
                
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-white via-cyan-400 to-purple-400 bg-clip-text text-transparent flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-cyan-400" />
                    {i18n.language === 'ar' ? 'مساعد DigitalPro الذكي' : 'DigitalPro AI Assistant'}
                  </h2>
                  <p className="text-sm text-gray-300 flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                    {isLoading 
                      ? (i18n.language === 'ar' ? 'يفكر...' : 'Thinking...') 
                      : (i18n.language === 'ar' ? 'متصل • ذكي • سريع الاستجابة' : 'Online • Intelligent • Lightning Fast')
                    }
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button 
                  onClick={() => setShowServiceChat(true)}
                  className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white rounded-xl"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  {i18n.language === 'ar' ? 'استشارة ذكية' : 'Smart Consultation'}
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={exportChat}
                  className="text-gray-400 hover:text-cyan-400 hover:bg-slate-800/50 rounded-xl"
                >
                  <Download className="w-5 h-5" />
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={onClose} 
                  className="text-gray-400 hover:text-white hover:bg-slate-800/50 rounded-xl"
                >
                  <X className="w-6 h-6" />
                </Button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 h-[calc(100vh-200px)]">
              {messages.map(message => (
                <motion.div
                  key={message.id}
                  variants={messageVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.3 }}
                  className={`flex gap-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.sender === 'bot' && (
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <Bot className="w-6 h-6 text-white" />
                    </div>
                  )}
                  
                  <div className={`group max-w-[80%] p-6 rounded-3xl whitespace-pre-line relative backdrop-blur-sm ${
                    message.sender === 'user' 
                      ? 'bg-gradient-to-r from-blue-600/90 via-cyan-600/90 to-purple-600/90 text-white border border-blue-400/30' 
                      : 'bg-gradient-to-r from-slate-800/95 via-slate-700/95 to-slate-800/95 text-gray-100 border border-cyan-500/20'
                  }`}>
                    <p className="leading-relaxed text-lg">{message.content}</p>
                    
                    <div className="flex items-center justify-between mt-4">
                      <p className={`text-xs opacity-70 ${
                        message.sender === 'user' ? 'text-blue-100' : 'text-gray-400'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyMessage(message.content)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {message.sender === 'user' && (
                    <div className="w-12 h-12 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 rounded-2xl flex items-center justify-center flex-shrink-0 border border-slate-500/50">
                      <User className="w-6 h-6 text-gray-300" />
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Loading Animation */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-4 justify-start"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                    <motion.div
                      animate={prefersReducedMotion ? {} : { rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <Brain className="w-6 h-6 text-white" />
                    </motion.div>
                  </div>
                  <div className="bg-gradient-to-r from-slate-800/95 via-slate-700/95 to-slate-800/95 p-6 rounded-3xl border border-cyan-500/20">
                    <div className="flex gap-3">
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-4 h-4 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"
                          animate={prefersReducedMotion ? {} : {
                            scale: [1, 1.4, 1],
                            opacity: [0.5, 1, 0.5],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.3,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Quick Questions */}
              {messages.length === 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-3 text-gray-300">
                    <MessageSquare className="w-5 h-5 text-cyan-400" />
                    <span className="text-lg font-medium bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                      {i18n.language === 'ar' ? 'أسئلة سريعة للبدء:' : 'Quick start questions:'}
                    </span>
                  </div>
                  <div className="grid gap-4">
                    {quickQuestions.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => setInput(question)}
                        className="group relative px-6 py-4 bg-gradient-to-r from-slate-800/50 to-slate-700/50 hover:from-cyan-600/20 hover:to-purple-600/20 text-gray-300 hover:text-white rounded-2xl text-left transition-all duration-300 border border-slate-600/30 hover:border-cyan-500/50"
                      >
                        <span className="font-medium">{question}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Enhanced Input Area */}
            <div className="p-6 border-t border-cyan-500/20 bg-slate-900/98 backdrop-blur-xl">
              <div className="flex gap-4 items-end">
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-cyan-400 hover:bg-slate-800/50 rounded-2xl"
                >
                  <Paperclip className="w-6 h-6" />
                </Button>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  className="hidden"
                />
                
                <div className="flex-1 relative">
                  <Input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={i18n.language === 'ar' ? "اكتب رسالتك..." : "Type your message..."}
                    className="bg-gradient-to-r from-slate-800/70 to-slate-700/70 border-slate-600/50 hover:border-cyan-500/50 focus:border-cyan-500/70 text-white placeholder:text-gray-400 rounded-2xl py-4 px-6 text-lg transition-all duration-300"
                    disabled={isLoading}
                  />
                </div>

                <Button
                  onClick={toggleVoiceRecognition}
                  variant="ghost"
                  size="icon"
                  className={`text-gray-400 hover:text-cyan-400 hover:bg-slate-800/50 rounded-2xl ${isListening ? 'text-red-400' : ''}`}
                >
                  {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                </Button>
                
                <Button
                  onClick={handleSendMessage}
                  disabled={!input.trim() || isLoading}
                  className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 hover:from-cyan-700 hover:via-blue-700 hover:to-purple-700 rounded-2xl px-8 py-4 transition-all duration-300"
                >
                  {isLoading ? (
                    <motion.div
                      animate={prefersReducedMotion ? {} : { rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Zap className="w-6 h-6" />
                    </motion.div>
                  ) : (
                    <Send className="w-6 h-6" />
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Service Consultation Chat */}
      <IntelligentServiceChat
        isOpen={showServiceChat}
        onClose={() => {
          setShowServiceChat(false);
          if (!isOpen) onClose();
        }}
      />
    </>
  );
};

export default PerformanceOptimizedChat;
