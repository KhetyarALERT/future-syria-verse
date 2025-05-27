
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  timestamp: Date;
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your AI assistant. I can help you with information about our services, pricing, and project requirements. How can I assist you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const predefinedResponses = {
    greeting: [
      "Hello! Welcome to Digital Solutions. How can I help you today?",
      "Hi there! I'm here to assist you with our services. What would you like to know?",
      "Welcome! I can help you understand our logo design, web development, AI assistants, and automation services."
    ],
    pricing: [
      "Our pricing varies by service:\n• Logo Design: $50-$200\n• Websites: $200-$1,000\n• E-commerce: $500-$2,000\n• AI Assistants: $10-$50/month\n• Automation: Custom quotes\n\nWould you like details about any specific service?",
      "We offer competitive pricing for all services. Logo design starts at $50, websites from $200, and e-commerce solutions from $500. AI assistants are subscription-based from $10/month."
    ],
    services: [
      "We offer 5 main services:\n1. 🎨 Logo Design - AI-powered brand identity\n2. 💻 Website Development - Modern, responsive sites\n3. 🛒 E-commerce Solutions - Complete online stores\n4. 🤖 AI Personal Assistants - 24/7 customer support\n5. ⚙️ Work Automation - Streamline your processes\n\nWhich one interests you most?",
      "Our comprehensive digital solutions include logo design, website development, e-commerce platforms, AI chatbots, and business automation. We serve clients globally, including Syria."
    ],
    timeline: [
      "Our typical timelines are:\n• Logo Design: 24-48 hours\n• Simple Website: 1-2 weeks\n• E-commerce Store: 2-4 weeks\n• AI Assistant Setup: 1-2 weeks\n• Automation Projects: 2-8 weeks\n\nRush orders are available for additional fees.",
      "Project timelines depend on complexity. Logo designs can be completed in 24 hours, while full e-commerce solutions typically take 2-4 weeks. We also offer rush delivery options."
    ],
    payment: [
      "We accept multiple payment methods:\n• 💳 Stripe (international cards)\n• 🏦 Bank transfers (especially for Syrian clients)\n• 📱 Local payment methods\n• 💰 Cryptocurrency (for some services)\n\nWe offer flexible payment plans for larger projects.",
      "Payment is flexible! We accept international cards via Stripe, bank transfers, and local payment methods. Syrian clients can use bank transfers or local payment solutions."
    ],
    contact: [
      "You can reach us through:\n📧 Email: hello@digitalsolutions.com\n📱 Phone: +1 (234) 567-890\n💬 This chat (I'm available 24/7!)\n📋 Requirement form on our website\n\nI can also escalate to human support if needed.",
      "Contact us anytime! Use this chat for instant responses, email us at hello@digitalsolutions.com, or fill out our requirement form. I can connect you with our human team for complex inquiries."
    ],
    default: [
      "I understand you're asking about {topic}. Let me help you with that! Could you be more specific about what you'd like to know?",
      "That's a great question! I'd be happy to help. Could you provide a bit more detail so I can give you the most accurate information?",
      "I'm here to help! You can ask me about our services, pricing, timelines, payment methods, or anything else about Digital Solutions."
    ]
  };

  const getRandomResponse = (category: keyof typeof predefinedResponses): string => {
    const responses = predefinedResponses[category];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const categorizeMessage = (text: string): keyof typeof predefinedResponses => {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('hello') || lowerText.includes('hi') || lowerText.includes('hey')) {
      return 'greeting';
    }
    if (lowerText.includes('price') || lowerText.includes('cost') || lowerText.includes('budget')) {
      return 'pricing';
    }
    if (lowerText.includes('service') || lowerText.includes('what do you') || lowerText.includes('offer')) {
      return 'services';
    }
    if (lowerText.includes('time') || lowerText.includes('when') || lowerText.includes('delivery')) {
      return 'timeline';
    }
    if (lowerText.includes('payment') || lowerText.includes('pay') || lowerText.includes('stripe')) {
      return 'payment';
    }
    if (lowerText.includes('contact') || lowerText.includes('reach') || lowerText.includes('talk')) {
      return 'contact';
    }
    
    return 'default';
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI processing delay
    setTimeout(() => {
      const category = categorizeMessage(userMessage.text);
      const responseText = getRandomResponse(category);
      
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText.replace('{topic}', userMessage.text),
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickActions = [
    "Tell me about your services",
    "What are your prices?",
    "How long does a project take?",
    "Payment methods available?",
    "I need a logo design",
    "Contact human support"
  ];

  const handleQuickAction = (action: string) => {
    setInputText(action);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 ${
          isOpen ? 'hidden' : 'flex'
        } items-center justify-center`}
      >
        <MessageSquare className="w-7 h-7" />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[32rem] bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-slate-700 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold">AI Assistant</h3>
                <p className="text-xs opacity-90">Online • Responds instantly</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.sender === 'bot' && (
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] p-3 rounded-2xl whitespace-pre-line ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      : 'bg-gray-100 dark:bg-slate-700 text-gray-800 dark:text-gray-200'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className={`text-xs mt-1 opacity-70 ${
                    message.sender === 'user' ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                {message.sender === 'user' && (
                  <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="bg-gray-100 dark:bg-slate-700 p-3 rounded-2xl">
                  <div className="flex gap-1">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"
                        style={{ animationDelay: `${i * 0.2}s` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          {messages.length === 1 && (
            <div className="p-3 border-t border-gray-200 dark:border-slate-600">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Quick questions:</p>
              <div className="flex flex-wrap gap-1">
                {quickActions.slice(0, 3).map((action, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickAction(action)}
                    className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-gray-200 dark:border-slate-600">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                disabled={isTyping}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isTyping}
                className="p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
