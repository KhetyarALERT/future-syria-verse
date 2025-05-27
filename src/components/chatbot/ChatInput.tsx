
import React from 'react';
import { Send } from 'lucide-react';
import { Language, ChatLabels } from './types';

interface ChatInputProps {
  input: string;
  setInput: (input: string) => void;
  handleSendMessage: () => void;
  isTyping: boolean;
  language: Language;
  t: ChatLabels;
}

const ChatInput: React.FC<ChatInputProps> = ({
  input,
  setInput,
  handleSendMessage,
  isTyping,
  language,
  t
}) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
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
  );
};

export default ChatInput;
