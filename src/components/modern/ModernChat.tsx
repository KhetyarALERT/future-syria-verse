
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { X, Send, Paperclip, Bot, User, Sparkles, MessageSquare, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAdvancedAIAgent } from '@/hooks/useAdvancedAIAgent';
import { supabase } from '@/integrations/supabase/client';
import ApiKeySetup from './ApiKeySetup';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  attachments?: string[];
}

interface ModernChatProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModernChat: React.FC<ModernChatProps> = ({
  isOpen,
  onClose
}) => {
  const { t, i18n } = useTranslation();
  const { sendMessageToAI, isLoading } = useAdvancedAIAgent();
  
  const [messages, setMessages] = useState<Message[]>([{
    id: '1',
    content: i18n.language === 'ar' 
      ? "مرحباً! أهلاً بك في DigitalPro - شريكك في الحلول الرقمية المتميزة. أنا مساعدك الذكي وأنا هنا لفهم احتياجاتك وربطك بفريق الخبراء لدينا. كيف يمكنني مساعدتك اليوم؟" 
      : "Hello! Welcome to DigitalPro - your premium digital solutions partner. I'm your intelligent assistant and I'm here to understand your needs and connect you with our expert team. How can I help you today?",
    sender: 'bot',
    timestamp: new Date()
  }]);
  
  const [input, setInput] = useState('');
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const [showApiKeySetup, setShowApiKeySetup] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isRTL = i18n.language === 'ar';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Check if API key is set
  useEffect(() => {
    const apiKey = localStorage.getItem('openrouter_api_key');
    setShowApiKeySetup(!apiKey);
  }, []);

  // Save chat session to database
  const saveChatSession = async (updatedMessages: Message[]) => {
    try {
      const { error } = await supabase
        .from('user_chat_sessions')
        .upsert({
          session_id: sessionId,
          messages: JSON.stringify(updatedMessages),
          user_data: JSON.stringify({ language: i18n.language }),
          updated_at: new Date().toISOString()
        });

      if (error) {
        console.error('Error saving chat session:', error);
      }
    } catch (error) {
      console.error('Error saving chat session:', error);
    }
  };

  const handleSendMessage = async () => {
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

    // Prepare conversation history for AI context
    const conversationHistory = messages.slice(1).map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'assistant',
      content: msg.content
    }));

    try {
      console.log('Sending message to AI with history:', { input, conversationHistory });
      const aiResponse = await sendMessageToAI(input, conversationHistory);
      
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        sender: 'bot',
        timestamp: new Date()
      };

      const finalMessages = [...updatedMessagesWithUser, botResponse];
      setMessages(finalMessages);
      
      // Save to database
      await saveChatSession(finalMessages);
    } catch (error) {
      console.error('Error getting AI response:', error);
      
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: i18n.language === 'ar' 
          ? 'أعتذر، حدث خطأ في النظام. دعني أساعدك بطريقة أخرى. ما هي الخدمة التي تحتاجها من DigitalPro؟'
          : 'I apologize, there was a system error. Let me help you another way. What service do you need from DigitalPro?',
        sender: 'bot',
        timestamp: new Date()
      };
      
      const errorMessages = [...updatedMessagesWithUser, errorResponse];
      setMessages(errorMessages);
      await saveChatSession(errorMessages);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const fileMessage: Message = {
        id: Date.now().toString(),
        content: i18n.language === 'ar' 
          ? `تم رفع الملف: ${files[0].name}. سيتم مراجعته مع استفسارك.` 
          : `File uploaded: ${files[0].name}. It will be reviewed with your inquiry.`,
        sender: 'bot',
        timestamp: new Date()
      };
      const updatedMessages = [...messages, fileMessage];
      setMessages(updatedMessages);
      saveChatSession(updatedMessages);
    }
  };

  const quickQuestions = i18n.language === 'ar' 
    ? ["أحتاج تصميم شعار احترافي", "عرض سعر لموقع إلكتروني", "خدمات التسويق الرقمي", "حل متجر إلكتروني متكامل", "باقة هوية تجارية كاملة"] 
    : ["I need a professional logo design", "Website development quote", "Digital marketing services", "Complete e-commerce solution", "Full branding package"];

  const handleApiKeySet = () => {
    setShowApiKeySetup(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`fixed inset-0 z-50 bg-gradient-to-br from-slate-950/95 via-blue-950/30 to-purple-950/95 backdrop-blur-sm ${isRTL ? 'rtl' : 'ltr'}`}
        >
          {/* Animated background grid */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(6, 182, 212, 0.3) 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }} />
          </div>

          {/* Enhanced Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-800/50 bg-gradient-to-r from-slate-900/90 to-slate-800/90 backdrop-blur-md">
            <div className="flex items-center gap-4">
              <motion.div 
                className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center relative"
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(59, 130, 246, 0.5)",
                    "0 0 30px rgba(6, 182, 212, 0.7)",
                    "0 0 20px rgba(59, 130, 246, 0.5)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Bot className="w-7 h-7 text-white" />
                <motion.div
                  className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </motion.div>
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-cyan-400" />
                  {i18n.language === 'ar' ? 'مساعد DigitalPro الذكي' : 'DigitalPro AI Assistant'}
                </h2>
                <p className="text-sm text-gray-400 flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  {isLoading 
                    ? (i18n.language === 'ar' ? 'يكتب...' : 'Typing...') 
                    : (i18n.language === 'ar' ? 'متصل • يرد فوراً' : 'Online • Responds instantly')
                  }
                </p>
              </div>
            </div>
            <Button variant="ghost" onClick={onClose} className="text-gray-400 hover:text-white hover:bg-slate-800/50 rounded-xl">
              <X className="w-6 h-6" />
            </Button>
          </div>

          {/* Show API Key Setup if needed */}
          {showApiKeySetup ? (
            <div className="flex-1 flex items-center justify-center p-6">
              <ApiKeySetup onApiKeySet={handleApiKeySet} />
            </div>
          ) : (
            <>
              {/* Enhanced Messages Area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 h-[calc(100vh-180px)] bg-gradient-to-b from-slate-950/50 to-slate-900/50">
                {messages.map(message => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className={`flex gap-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.sender === 'bot' && (
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                    )}
                    
                    <div className={`max-w-[80%] p-4 rounded-2xl whitespace-pre-line relative ${
                      message.sender === 'user' 
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/25' 
                        : 'bg-slate-800/70 backdrop-blur-sm text-gray-100 border border-slate-700/50 shadow-lg'
                    }`}>
                      {message.sender === 'bot' && (
                        <div className="absolute -top-1 -left-1 w-3 h-3 bg-cyan-400 rounded-full animate-pulse" />
                      )}
                      <p className="leading-relaxed">{message.content}</p>
                      <p className={`text-xs mt-2 opacity-70 ${
                        message.sender === 'user' ? 'text-blue-100' : 'text-gray-400'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>

                    {message.sender === 'user' && (
                      <div className="w-10 h-10 bg-slate-700/70 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0 border border-slate-600/50">
                        <User className="w-5 h-5 text-gray-300" />
                      </div>
                    )}
                  </motion.div>
                ))}

                {/* Enhanced Loading Animation */}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-4 justify-start"
                  >
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div className="bg-slate-800/70 backdrop-blur-sm p-4 rounded-2xl border border-slate-700/50">
                      <div className="flex gap-2">
                        {[...Array(3)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="w-3 h-3 bg-cyan-400 rounded-full"
                            animate={{
                              scale: [1, 1.2, 1],
                              opacity: [0.5, 1, 0.5],
                            }}
                            transition={{
                              duration: 1.2,
                              repeat: Infinity,
                              delay: i * 0.2,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Enhanced Quick Questions */}
                {messages.length === 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center gap-2 text-gray-400">
                      <MessageSquare className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        {i18n.language === 'ar' ? 'أسئلة سريعة:' : 'Quick questions:'}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {quickQuestions.map((question, index) => (
                        <motion.button
                          key={index}
                          onClick={() => setInput(question)}
                          className="px-4 py-2 bg-slate-800/50 hover:bg-slate-700/70 text-gray-300 hover:text-white rounded-xl text-sm transition-all duration-300 border border-slate-700/50 hover:border-cyan-500/50 backdrop-blur-sm"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.7 + index * 0.1 }}
                        >
                          {question}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Enhanced Input Area */}
              <div className="p-6 border-t border-slate-800/50 bg-gradient-to-r from-slate-900/90 to-slate-800/90 backdrop-blur-md">
                <div className="flex gap-3 items-end">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="p-3 text-gray-400 hover:text-cyan-400 hover:bg-slate-800/50 rounded-xl transition-all duration-300"
                    title={i18n.language === 'ar' ? 'رفع ملف' : 'Upload file'}
                  >
                    <Paperclip className="w-5 h-5" />
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <div className="flex-1 relative">
                    <Input
                      value={input}
                      onChange={e => setInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder={i18n.language === 'ar' ? "اكتب رسالتك..." : "Type your message..."}
                      className="bg-slate-800/70 border-slate-600/50 text-white placeholder:text-gray-400 rounded-xl py-3 px-4 focus:border-cyan-500/50 focus:ring-cyan-500/25 backdrop-blur-sm"
                      disabled={isLoading}
                    />
                    {input.trim() && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2"
                      >
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                      </motion.div>
                    )}
                  </div>
                  <Button
                    onClick={handleSendMessage}
                    disabled={!input.trim() || isLoading}
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-xl px-6 py-3 shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
                  >
                    {isLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Zap className="w-5 h-5" />
                      </motion.div>
                    ) : (
                      <Send className="w-5 h-5" />
                    )}
                  </Button>
                </div>
              </div>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModernChat;
