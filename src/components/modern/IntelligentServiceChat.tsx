
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, User, FileText, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useServiceConsultantAI } from '@/hooks/useServiceConsultantAI';
import { useTranslation } from 'react-i18next';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface IntelligentServiceChatProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

const IntelligentServiceChat: React.FC<IntelligentServiceChatProps> = ({
  isOpen,
  onClose,
  initialService
}) => {
  const { t, i18n } = useTranslation();
  const {
    generateResponse,
    handleUserResponse,
    generateFormSummary,
    submitInquiry,
    conversationState,
    setConversationState,
    isLoading
  } = useServiceConsultantAI();

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [showFormPreview, setShowFormPreview] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    contactPreference: '',
    contactDetails: '',
    preferredTime: ''
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isRTL = i18n.language === 'ar';

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage = generateResponse('', i18n.language);
      setMessages([{
        id: '1',
        content: welcomeMessage,
        sender: 'bot',
        timestamp: new Date()
      }]);

      if (initialService) {
        setConversationState(prev => ({ ...prev, stage: 'service_selection' }));
      }
    }
  }, [isOpen, generateResponse, i18n.language, initialService, messages.length, setConversationState]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
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
    handleUserResponse(input, i18n.language);
    
    const aiResponse = generateResponse(input, i18n.language);
    
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: aiResponse,
      sender: 'bot',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMessage]);
    setInput('');

    // Check if we should show form preview
    if (conversationState.gatheredInfo.businessType && 
        conversationState.gatheredInfo.userNeeds && 
        !showFormPreview) {
      setTimeout(() => {
        setShowFormPreview(true);
        const formSummary = generateFormSummary();
        const summaryMessage: Message = {
          id: (Date.now() + 2).toString(),
          content: isRTL 
            ? `رائع! جمعت المعلومات التالية عن مشروعك:\n\n📋 **ملخص المشروع:**\n• الخدمة: ${formSummary.service}\n• نوع العمل: ${formSummary.details.businessType}\n• الاحتياجات: ${formSummary.details.userNeeds}\n\nالآن أحتاج بعض معلومات الاتصال لإرسال هذا الطلب لفريقنا. ما اسمك الكامل؟`
            : `Great! I've gathered the following information about your project:\n\n📋 **Project Summary:**\n• Service: ${formSummary.service}\n• Business Type: ${formSummary.details.businessType}\n• Needs: ${formSummary.details.userNeeds}\n\nNow I need some contact information to send this request to our team. What's your full name?`,
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, summaryMessage]);
        setConversationState(prev => ({ ...prev, stage: 'contact_preference' }));
      }, 1000);
    }
  };

  const handleFormSubmit = async () => {
    const summary = generateFormSummary();
    const inquiryData = {
      service: summary.service,
      userNeeds: summary.details.userNeeds || '',
      businessType: summary.details.businessType || '',
      timeline: summary.details.timeline || '',
      additionalInfo: summary.details.additionalInfo || '',
      ...formData
    };

    const success = await submitInquiry(inquiryData);
    if (success) {
      const successMessage: Message = {
        id: Date.now().toString(),
        content: isRTL 
          ? `تم إرسال طلبك بنجاح! 🎉\n\nسيتواصل معك فريقنا خلال 24 ساعة عبر ${formData.contactPreference} في ${formData.preferredTime}.\n\nشكراً لثقتك في DigitalPro!`
          : `Your request has been submitted successfully! 🎉\n\nOur team will contact you within 24 hours via ${formData.contactPreference} at ${formData.preferredTime}.\n\nThank you for trusting DigitalPro!`,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, successMessage]);
      setConversationState(prev => ({ ...prev, stage: 'completed' }));
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className={`fixed inset-0 z-50 ${isRTL ? 'rtl' : 'ltr'}`}
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900/10 to-purple-900/20" />

          {/* Header */}
          <div className="relative flex items-center justify-between p-6 border-b border-blue-500/20 bg-slate-900/95 backdrop-blur-xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  {isRTL ? 'مستشار الخدمات الذكي' : 'Intelligent Service Consultant'}
                </h2>
                <p className="text-sm text-gray-300">
                  {isRTL ? 'سأساعدك في اختيار الخدمة المناسبة' : 'I\'ll help you choose the right service'}
                </p>
              </div>
            </div>
            <Button variant="ghost" onClick={onClose} className="text-gray-400 hover:text-white">
              <X className="w-6 h-6" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 h-[calc(100vh-200px)]">
            {messages.map(message => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.sender === 'bot' && (
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                )}
                
                <div className={`max-w-[80%] p-4 rounded-2xl whitespace-pre-line ${
                  message.sender === 'user' 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                    : 'bg-slate-800/80 text-gray-100 border border-blue-500/20'
                }`}>
                  <p className="leading-relaxed">{message.content}</p>
                  <p className={`text-xs mt-2 opacity-70 ${
                    message.sender === 'user' ? 'text-blue-100' : 'text-gray-400'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>

                {message.sender === 'user' && (
                  <div className="w-10 h-10 bg-slate-700 rounded-xl flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-gray-300" />
                  </div>
                )}
              </motion.div>
            ))}

            {/* Form Preview */}
            {showFormPreview && conversationState.stage === 'contact_preference' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-800/80 rounded-2xl p-6 border border-blue-500/20"
              >
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="w-5 h-5 text-blue-400" />
                  <h3 className="font-semibold text-white">
                    {isRTL ? 'معلومات الاتصال' : 'Contact Information'}
                  </h3>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-300 mb-1">
                      {isRTL ? 'الاسم الكامل' : 'Full Name'}
                    </label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-300 mb-1">
                      {isRTL ? 'البريد الإلكتروني' : 'Email'}
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-300 mb-1">
                      {isRTL ? 'رقم الهاتف (اختياري)' : 'Phone (Optional)'}
                    </label>
                    <Input
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-300 mb-1">
                      {isRTL ? 'طريقة التواصل المفضلة' : 'Preferred Contact Method'}
                    </label>
                    <Input
                      value={formData.contactPreference}
                      onChange={(e) => setFormData(prev => ({ ...prev, contactPreference: e.target.value }))}
                      placeholder={isRTL ? 'واتساب، إيميل، مكالمة، إلخ' : 'WhatsApp, Email, Call, etc.'}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-300 mb-1">
                      {isRTL ? 'تفاصيل التواصل' : 'Contact Details'}
                    </label>
                    <Input
                      value={formData.contactDetails}
                      onChange={(e) => setFormData(prev => ({ ...prev, contactDetails: e.target.value }))}
                      placeholder={isRTL ? 'رقم الواتساب، اسم المستخدم، إلخ' : 'WhatsApp number, username, etc.'}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-300 mb-1">
                      {isRTL ? 'الوقت المناسب للتواصل' : 'Preferred Contact Time'}
                    </label>
                    <Input
                      value={formData.preferredTime}
                      onChange={(e) => setFormData(prev => ({ ...prev, preferredTime: e.target.value }))}
                      placeholder={isRTL ? 'الصباح، المساء، أي وقت، إلخ' : 'Morning, Evening, Anytime, etc.'}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                  
                  <Button
                    onClick={handleFormSubmit}
                    disabled={!formData.name || !formData.email || !formData.contactPreference || isLoading}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        {isRTL ? 'جاري الإرسال...' : 'Submitting...'}
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        {isRTL ? 'إرسال الطلب' : 'Submit Request'}
                      </div>
                    )}
                  </Button>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          {conversationState.stage !== 'completed' && !showFormPreview && (
            <div className="p-6 border-t border-blue-500/20 bg-slate-900/95 backdrop-blur-xl">
              <div className="flex gap-3">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder={isRTL ? "اكتب رسالتك..." : "Type your message..."}
                  className="bg-slate-800 border-slate-600 text-white"
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!input.trim() || isLoading}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntelligentServiceChat;
