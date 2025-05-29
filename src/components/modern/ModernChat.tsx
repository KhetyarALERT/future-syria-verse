import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { X, Send, Paperclip, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAdvancedAIAgent } from '@/hooks/useAdvancedAIAgent';
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
  const {
    t,
    i18n
  } = useTranslation();
  const {
    sendMessageToAI,
    isLoading
  } = useAdvancedAIAgent();
  const [messages, setMessages] = useState<Message[]>([{
    id: '1',
    content: i18n.language === 'ar' ? "مرحباً! أهلاً بك في DigitalPro - شريكك في الحلول الرقمية المتميزة. أنا مساعدك الذكي وأنا هنا لفهم احتياجاتك وربطك بفريق الخبراء لدينا. كيف يمكنني مساعدتك اليوم؟" : "Hello! Welcome to DigitalPro - your premium digital solutions partner. I'm your intelligent assistant and I'm here to understand your needs and connect you with our expert team. How can I help you today?",
    sender: 'bot',
    timestamp: new Date()
  }]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isRTL = i18n.language === 'ar';
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Get AI response
    const aiResponse = await sendMessageToAI(input);
    const botResponse: Message = {
      id: (Date.now() + 1).toString(),
      content: aiResponse,
      sender: 'bot',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, botResponse]);
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
      // For now, just show a message about file upload
      const fileMessage: Message = {
        id: Date.now().toString(),
        content: i18n.language === 'ar' ? `تم رفع الملف: ${files[0].name}. سيتم مراجعته مع استفسارك.` : `File uploaded: ${files[0].name}. It will be reviewed with your inquiry.`,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, fileMessage]);
    }
  };
  const quickQuestions = i18n.language === 'ar' ? ["أحتاج تصميم شعار", "عرض سعر لموقع إلكتروني", "خدمات التسويق", "حل متجر إلكتروني", "باقة هوية تجارية كاملة"] : ["I need a logo design", "Website development quote", "Marketing services", "E-commerce solution", "Full branding package"];
  return <AnimatePresence>
      {isOpen && <motion.div initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} exit={{
      opacity: 0
    }} className={`fixed inset-0 z-50 bg-slate-950 ${isRTL ? 'rtl' : 'ltr'}`}>
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-900">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">
                  {i18n.language === 'ar' ? 'مساعد DigitalPro' : 'DigitalPro Assistant'}
                </h2>
                <p className="text-sm text-gray-400">
                  {isLoading ? i18n.language === 'ar' ? 'يكتب...' : 'Typing...' : i18n.language === 'ar' ? 'متصل • يرد فوراً' : 'Online • Responds instantly'}
                </p>
              </div>
            </div>
            <Button variant="ghost" onClick={onClose} className="text-gray-400 hover:text-white">
              <X className="w-6 h-6" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 h-[calc(100vh-140px)] bg-[#1d3241]/[0.48] rounded-none">
            {messages.map(message => <motion.div key={message.id} initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                {message.sender === 'bot' && <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>}
                
                <div className={`max-w-[80%] p-3 rounded-2xl whitespace-pre-line ${message.sender === 'user' ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white' : 'bg-slate-800 text-gray-200'}`}>
                  <p>{message.content}</p>
                  <p className={`text-xs mt-1 opacity-70 ${message.sender === 'user' ? 'text-blue-100' : 'text-gray-400'}`}>
                    {message.timestamp.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
              })}
                  </p>
                </div>

                {message.sender === 'user' && <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-gray-300" />
                  </div>}
              </motion.div>)}

            {isLoading && <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="flex gap-3 justify-start">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-slate-800 p-3 rounded-2xl">
                  <div className="flex gap-1">
                    {[...Array(3)].map((_, i) => <div key={i} className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{
                animationDelay: `${i * 0.2}s`
              }} />)}
                  </div>
                </div>
              </motion.div>}

            {/* Quick Questions */}
            {messages.length === 1 && <div className="flex flex-wrap gap-2 mt-4">
                {quickQuestions.map((question, index) => <button key={index} onClick={() => setInput(question)} className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-gray-300 rounded-lg text-sm transition-colors">
                    {question}
                  </button>)}
              </div>}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-slate-800 bg-slate-900">
            <div className="flex gap-2">
              <button onClick={() => fileInputRef.current?.click()} className="p-2 text-gray-400 hover:text-cyan-400 transition-colors">
                <Paperclip className="w-5 h-5" />
              </button>
              <input ref={fileInputRef} type="file" multiple onChange={handleFileUpload} className="hidden" />
              <Input value={input} onChange={e => setInput(e.target.value)} onKeyPress={handleKeyPress} placeholder={i18n.language === 'ar' ? "اكتب رسالتك..." : "Type your message..."} className="flex-1 bg-slate-800 border-slate-600 text-white placeholder:text-gray-400" disabled={isLoading} />
              <Button onClick={handleSendMessage} disabled={!input.trim() || isLoading} className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.div>}
    </AnimatePresence>;
};
export default ModernChat;