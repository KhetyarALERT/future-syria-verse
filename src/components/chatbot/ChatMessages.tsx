
import React from 'react';
import { Bot, User } from 'lucide-react';
import { Message, Language, ChatLabels } from './types';

interface ChatMessagesProps {
  messages: Message[];
  isTyping: boolean;
  language: Language;
  t: ChatLabels;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({
  messages,
  isTyping,
  language,
  t,
  messagesEndRef
}) => {
  return (
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
  );
};

export default ChatMessages;
