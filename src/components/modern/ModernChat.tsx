
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { X, Send, Paperclip, Bot, User, Sparkles, MessageSquare, Zap, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAdvancedAIAgent } from '@/hooks/useAdvancedAIAgent';
import { supabase } from '@/integrations/supabase/client';

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
      ? "مرحباً! 🌟 أهلاً بك في DigitalPro - مركز الحلول الرقمية المتطورة. أنا مساعدك الذكي المدعوم بالذكاء الاصطناعي، وأنا هنا لفهم احتياجاتك وتقديم أفضل الحلول المبتكرة. كيف يمكنني مساعدتك في تحويل رؤيتك الرقمية إلى واقع؟ ✨" 
      : "Hello! 🌟 Welcome to DigitalPro - Your Advanced Digital Solutions Hub. I'm your AI-powered intelligent assistant, here to understand your needs and provide cutting-edge solutions. How can I help transform your digital vision into reality today? ✨",
    sender: 'bot',
    timestamp: new Date()
  }]);
  
  const [input, setInput] = useState('');
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isRTL = i18n.language === 'ar';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
          ? 'شكراً لك على تواصلك! 😊 أنا هنا لمساعدتك في جميع احتياجاتك الرقمية. يمكنني مساعدتك في تصميم الشعارات، تطوير المواقع، التسويق الرقمي، وأكثر من ذلك. ما هي الخدمة التي تحتاجها؟'
          : 'Thank you for reaching out! 😊 I\'m here to help with all your digital needs. I can assist with logo design, website development, digital marketing, and much more. What service are you looking for?',
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
          ? `✅ تم رفع الملف: ${files[0].name}. سيتم مراجعته مع استفسارك من قبل فريق الخبراء لدينا.` 
          : `✅ File uploaded: ${files[0].name}. It will be reviewed with your inquiry by our expert team.`,
        sender: 'bot',
        timestamp: new Date()
      };
      const updatedMessages = [...messages, fileMessage];
      setMessages(updatedMessages);
      saveChatSession(updatedMessages);
    }
  };

  const quickQuestions = i18n.language === 'ar' 
    ? ["🎨 أحتاج تصميم شعار احترافي ومميز", "💻 عرض سعر لموقع إلكتروني حديث", "📈 خدمات التسويق الرقمي المتقدمة", "🛒 حل متجر إلكتروني متكامل", "🏢 باقة هوية تجارية شاملة"] 
    : ["🎨 I need a professional logo design", "💻 Website development quote", "📈 Advanced digital marketing services", "🛒 Complete e-commerce solution", "🏢 Full branding package"];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`fixed inset-0 z-50 ${isRTL ? 'rtl' : 'ltr'}`}
        >
          {/* Enhanced futuristic background */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950/20 to-purple-950/30">
            {/* Animated grid pattern */}
            <div className="absolute inset-0 opacity-10">
              <div 
                className="absolute inset-0"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)
                  `,
                  backgroundSize: '50px 50px',
                  animation: 'grid-move 20s linear infinite'
                }}
              />
            </div>

            {/* Floating geometric shapes */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${20 + (i * 15)}%`,
                  top: `${10 + (i * 10)}%`,
                  width: `${20 + (i * 5)}px`,
                  height: `${20 + (i * 5)}px`,
                }}
                animate={{
                  y: [-20, 20, -20],
                  rotate: [0, 360],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 8 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.5
                }}
              >
                <div className={`w-full h-full ${i % 2 === 0 ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20' : 'bg-gradient-to-r from-purple-500/20 to-pink-500/20'} ${i % 3 === 0 ? 'rounded-full' : 'rounded-lg'} backdrop-blur-sm`} />
              </motion.div>
            ))}

            {/* Neural network lines */}
            <svg className="absolute inset-0 w-full h-full opacity-20">
              <defs>
                <linearGradient id="neural-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.5"/>
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.5"/>
                </linearGradient>
              </defs>
              {[...Array(5)].map((_, i) => (
                <motion.line
                  key={i}
                  x1={`${i * 25}%`}
                  y1="0%"
                  x2={`${100 - i * 15}%`}
                  y2="100%"
                  stroke="url(#neural-gradient)"
                  strokeWidth="2"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.6 }}
                  transition={{ duration: 3, delay: i * 0.5, repeat: Infinity, repeatType: "reverse" }}
                />
              ))}
            </svg>
          </div>

          {/* Enhanced Header with holographic effect */}
          <div className="relative flex items-center justify-between p-6 border-b border-cyan-500/20 bg-gradient-to-r from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl">
            {/* Holographic overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-purple-500/5 animate-pulse" />
            
            <div className="relative flex items-center gap-4">
              <motion.div 
                className="relative w-14 h-14 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-2xl flex items-center justify-center"
                animate={{
                  boxShadow: [
                    "0 0 30px rgba(6, 182, 212, 0.5), 0 0 60px rgba(139, 92, 246, 0.3)",
                    "0 0 50px rgba(139, 92, 246, 0.7), 0 0 80px rgba(6, 182, 212, 0.4)",
                    "0 0 30px rgba(6, 182, 212, 0.5), 0 0 60px rgba(139, 92, 246, 0.3)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                  <Brain className="w-8 h-8 text-white" />
                </motion.div>
                
                {/* Orbital rings */}
                <motion.div
                  className="absolute inset-0 border-2 border-cyan-400/30 rounded-full"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute inset-1 border border-purple-400/30 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>
              
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-white via-cyan-400 to-purple-400 bg-clip-text text-transparent flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-cyan-400" />
                  {i18n.language === 'ar' ? 'مساعد DigitalPro الذكي' : 'DigitalPro AI Assistant'}
                </h2>
                <p className="text-sm text-gray-300 flex items-center gap-2">
                  <motion.div 
                    className="w-3 h-3 bg-gradient-to-r from-green-400 to-cyan-400 rounded-full"
                    animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  {isLoading 
                    ? (i18n.language === 'ar' ? 'يفكر...' : 'Thinking...') 
                    : (i18n.language === 'ar' ? 'متصل • ذكي • سريع الاستجابة' : 'Online • Intelligent • Lightning Fast')
                  }
                </p>
              </div>
            </div>
            
            <Button 
              variant="ghost" 
              onClick={onClose} 
              className="relative text-gray-400 hover:text-white hover:bg-slate-800/50 rounded-xl transition-all duration-300 group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-pink-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <X className="w-6 h-6 relative z-10" />
            </Button>
          </div>

          {/* Enhanced Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 h-[calc(100vh-200px)] relative">
            {messages.map(message => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
                className={`flex gap-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.sender === 'bot' && (
                  <motion.div 
                    className="w-12 h-12 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-2xl flex items-center justify-center flex-shrink-0 relative"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <Bot className="w-6 h-6 text-white" />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>
                )}
                
                <motion.div 
                  className={`max-w-[80%] p-6 rounded-3xl whitespace-pre-line relative backdrop-blur-sm ${
                    message.sender === 'user' 
                      ? 'bg-gradient-to-r from-blue-600/90 via-cyan-600/90 to-purple-600/90 text-white shadow-2xl shadow-blue-500/25 border border-blue-400/30' 
                      : 'bg-gradient-to-r from-slate-800/95 via-slate-700/95 to-slate-800/95 text-gray-100 border border-cyan-500/20 shadow-2xl shadow-cyan-500/10'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {message.sender === 'bot' && (
                    <motion.div 
                      className="absolute -top-2 -left-2 w-4 h-4 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"
                      animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                  
                  <p className="leading-relaxed text-lg">{message.content}</p>
                  <p className={`text-xs mt-3 opacity-70 flex items-center gap-2 ${
                    message.sender === 'user' ? 'text-blue-100' : 'text-gray-400'
                  }`}>
                    <motion.div 
                      className="w-2 h-2 bg-current rounded-full"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </motion.div>

                {message.sender === 'user' && (
                  <motion.div 
                    className="w-12 h-12 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 rounded-2xl flex items-center justify-center flex-shrink-0 border border-slate-500/50 backdrop-blur-sm"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <User className="w-6 h-6 text-gray-300" />
                  </motion.div>
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
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-2xl flex items-center justify-center relative">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <Brain className="w-6 h-6 text-white" />
                  </motion.div>
                </div>
                <div className="bg-gradient-to-r from-slate-800/95 via-slate-700/95 to-slate-800/95 backdrop-blur-sm p-6 rounded-3xl border border-cyan-500/20">
                  <div className="flex gap-3">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-4 h-4 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"
                        animate={{
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

            {/* Enhanced Quick Questions */}
            {messages.length === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 text-gray-300">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  >
                    <MessageSquare className="w-5 h-5 text-cyan-400" />
                  </motion.div>
                  <span className="text-lg font-medium bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    {i18n.language === 'ar' ? 'أسئلة سريعة للبدء:' : 'Quick start questions:'}
                  </span>
                </div>
                <div className="grid gap-4">
                  {quickQuestions.map((question, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setInput(question)}
                      className="group relative px-6 py-4 bg-gradient-to-r from-slate-800/50 via-slate-700/50 to-slate-800/50 hover:from-cyan-600/20 hover:via-blue-600/20 hover:to-purple-600/20 text-gray-300 hover:text-white rounded-2xl text-left transition-all duration-500 border border-slate-600/30 hover:border-cyan-500/50 backdrop-blur-sm overflow-hidden"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1 + index * 0.1 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-blue-500/0 to-purple-500/0 group-hover:from-cyan-500/10 group-hover:via-blue-500/10 group-hover:to-purple-500/10 transition-all duration-500" />
                      <span className="relative z-10 font-medium">{question}</span>
                      <motion.div
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-cyan-400 opacity-0 group-hover:opacity-100"
                        initial={{ x: -10 }}
                        whileHover={{ x: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        →
                      </motion.div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Enhanced Input Area */}
          <div className="relative p-6 border-t border-cyan-500/20 bg-gradient-to-r from-slate-900/98 via-slate-800/98 to-slate-900/98 backdrop-blur-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-purple-500/5" />
            
            <div className="relative flex gap-4 items-end">
              <motion.button
                onClick={() => fileInputRef.current?.click()}
                className="p-4 text-gray-400 hover:text-cyan-400 hover:bg-slate-800/50 rounded-2xl transition-all duration-300 group relative"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title={i18n.language === 'ar' ? 'رفع ملف' : 'Upload file'}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <Paperclip className="w-6 h-6 relative z-10" />
              </motion.button>
              
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
                  placeholder={i18n.language === 'ar' ? "اكتب رسالتك السحرية..." : "Type your message..."}
                  className="bg-gradient-to-r from-slate-800/70 via-slate-700/70 to-slate-800/70 border-slate-600/50 hover:border-cyan-500/50 focus:border-cyan-500/70 text-white placeholder:text-gray-400 rounded-2xl py-4 px-6 text-lg backdrop-blur-sm transition-all duration-300"
                  disabled={isLoading}
                />
                
                {input.trim() && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2"
                  >
                    <motion.div
                      className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"
                      animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  </motion.div>
                )}
              </div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={handleSendMessage}
                  disabled={!input.trim() || isLoading}
                  className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 hover:from-cyan-700 hover:via-blue-700 hover:to-purple-700 rounded-2xl px-8 py-4 shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="relative z-10"
                    >
                      <Zap className="w-6 h-6" />
                    </motion.div>
                  ) : (
                    <Send className="w-6 h-6 relative z-10" />
                  )}
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModernChat;
