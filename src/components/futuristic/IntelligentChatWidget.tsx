
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, Bot, User, X, Minimize2, Maximize2, FileText, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useIntelligentAI } from '@/hooks/useIntelligentAI';

interface IntelligentChatWidgetProps {
  onFormSuggestion?: () => void;
}

const IntelligentChatWidget: React.FC<IntelligentChatWidgetProps> = ({ onFormSuggestion }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { 
    messages, 
    isTyping, 
    sendMessage, 
    clearConversation, 
    suggestFormFill,
    conversationContext 
  } = useIntelligentAI();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Add welcome message
      const welcomeMessage = {
        id: 'welcome',
        content: `Hello! 👋 I'm your intelligent AI assistant at DigitalPro. 

I'm here to understand your needs and help you find the perfect digital solution. I can:

🎯 Analyze your requirements
💡 Recommend the best services
📋 Guide you through our process
💬 Answer all your questions

What digital challenge can I help you solve today?`,
        sender: 'assistant' as const,
        timestamp: new Date(),
      };
      
      // Add welcome message without using sendMessage to avoid triggering the hook
      setTimeout(() => {
        // This simulates adding the welcome message directly
      }, 100);
    }
  }, [isOpen, messages.length]);

  const handleSendMessage = () => {
    if (!input.trim() || isTyping) return;
    sendMessage(input);
    setInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFormSuggestion = () => {
    if (onFormSuggestion) {
      onFormSuggestion();
    }
  };

  if (!isOpen) {
    return (
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="relative">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 rounded-full shadow-2xl flex items-center justify-center">
            <MessageCircle className="w-8 h-8 text-white" />
          </div>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse">
            <Sparkles className="w-3 h-3 text-white ml-0.5 mt-0.5" />
          </div>
        </div>
        <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-slate-800 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap">
            Ask me anything! 🤖
          </div>
        </div>
      </motion.button>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
          isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'
        }`}
      >
        <Card className="h-full bg-slate-900/95 backdrop-blur-xl border-blue-500/20 shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b border-blue-500/20 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-500/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">AI Assistant</h3>
                  <p className="text-xs text-gray-300">
                    {isTyping ? 'Thinking...' : 'Online'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="text-gray-400 hover:text-white"
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 h-[calc(100%-140px)]">
                {/* Welcome message */}
                {messages.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-3"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-slate-800/80 text-gray-100 p-3 rounded-2xl max-w-[80%] border border-blue-500/20">
                      <p className="leading-relaxed">
                        Hello! 👋 I'm your intelligent AI assistant at DigitalPro. 
                        <br /><br />
                        I'm here to understand your needs and help you find the perfect digital solution. I can:
                        <br /><br />
                        🎯 Analyze your requirements<br />
                        💡 Recommend the best services<br />
                        📋 Guide you through our process<br />
                        💬 Answer all your questions
                        <br /><br />
                        What digital challenge can I help you solve today?
                      </p>
                    </div>
                  </motion.div>
                )}

                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.sender === 'assistant' && (
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                    )}
                    
                    <div className={`p-3 rounded-2xl max-w-[80%] whitespace-pre-line ${
                      message.sender === 'user' 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                        : 'bg-slate-800/80 text-gray-100 border border-blue-500/20'
                    }`}>
                      <p className="leading-relaxed">{message.content}</p>
                      
                      {/* Form suggestion button */}
                      {message.type === 'form_suggestion' && (
                        <Button
                          onClick={handleFormSuggestion}
                          className="mt-3 w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                          size="sm"
                        >
                          <FileText className="w-4 h-4 mr-2" />
                          Fill Detailed Form
                        </Button>
                      )}
                      
                      <p className={`text-xs mt-2 opacity-70 ${
                        message.sender === 'user' ? 'text-blue-100' : 'text-gray-400'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>

                    {message.sender === 'user' && (
                      <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-gray-300" />
                      </div>
                    )}
                  </motion.div>
                ))}

                {/* Typing indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-3"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-slate-800/80 text-gray-100 p-3 rounded-2xl border border-blue-500/20">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-blue-500/20 bg-slate-900/80">
                <div className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="bg-slate-800 border-slate-600 text-white placeholder-gray-400 focus:border-blue-500"
                    disabled={isTyping}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!input.trim() || isTyping}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                
                {messages.length > 0 && (
                  <div className="flex justify-between items-center mt-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearConversation}
                      className="text-gray-400 hover:text-white text-xs"
                    >
                      Clear chat
                    </Button>
                    {conversationContext.messageCount >= 3 && (
                      <Button
                        onClick={handleFormSuggestion}
                        size="sm"
                        className="text-xs bg-green-600 hover:bg-green-700"
                      >
                        <FileText className="w-3 h-3 mr-1" />
                        Fill Form
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </>
          )}
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};

export default IntelligentChatWidget;
