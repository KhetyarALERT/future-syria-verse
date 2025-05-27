
import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useChatbot } from './chatbot/useChatbot';
import ChatHeader from './chatbot/ChatHeader';
import ChatMessages from './chatbot/ChatMessages';
import ChatInput from './chatbot/ChatInput';

const AIChatbot: React.FC = () => {
  const {
    isOpen,
    setIsOpen,
    isMinimized,
    setIsMinimized,
    messages,
    input,
    setInput,
    isTyping,
    language,
    setLanguage,
    handleSendMessage,
    messagesEndRef,
    t
  } = useChatbot();

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
      <ChatHeader
        isMinimized={isMinimized}
        setIsMinimized={setIsMinimized}
        setIsOpen={setIsOpen}
        language={language}
        setLanguage={setLanguage}
        t={t}
      />

      {!isMinimized && (
        <>
          <ChatMessages
            messages={messages}
            isTyping={isTyping}
            language={language}
            t={t}
            messagesEndRef={messagesEndRef}
          />

          <ChatInput
            input={input}
            setInput={setInput}
            handleSendMessage={handleSendMessage}
            isTyping={isTyping}
            language={language}
            t={t}
          />
        </>
      )}
    </div>
  );
};

export default AIChatbot;
