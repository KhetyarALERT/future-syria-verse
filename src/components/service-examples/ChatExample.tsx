
import React from 'react';
import { motion } from 'framer-motion';

interface ChatExampleProps {
  content: any;
}

export const ChatExample: React.FC<ChatExampleProps> = ({ content }) => (
  <div className="space-y-4 max-h-96 overflow-y-auto bg-slate-50/50 rounded-xl p-4">
    {content.messages?.map((msg: any, index: number) => (
      <motion.div 
        key={index} 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
      >
        <div className={`max-w-[80%] p-3 rounded-lg shadow-sm ${
          msg.sender === 'user' 
            ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white' 
            : 'bg-white text-gray-800 border'
        }`}>
          <p className="text-sm whitespace-pre-line">{msg.text}</p>
        </div>
      </motion.div>
    ))}
  </div>
);
