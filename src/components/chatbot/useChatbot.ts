
import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Message, Language } from './types';
import { CHAT_LABELS } from './constants';
import { simulateAIResponse } from './aiResponseUtils';

export const useChatbot = () => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [language, setLanguage] = useState<Language>('ar');
  const [sessionId, setSessionId] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const t = CHAT_LABELS[language];

  useEffect(() => {
    if (isOpen && !sessionId) {
      const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      setSessionId(newSessionId);
      
      // Add welcome message
      const welcomeMessage: Message = {
        id: 'welcome',
        type: 'bot',
        content: t.welcome,
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, sessionId, t.welcome]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const createSupportRequest = async (message: string, type: 'support_request' | 'complaint' | 'suggestion' = 'support_request') => {
    try {
      const { error } = await supabase
        .from('inquiries')
        .insert([{
          name: 'Chat User',
          email: 'chatbot@temp.com',
          inquiry_type: type,
          inquiry_text: message,
          language,
          metadata: { 
            source: 'chatbot',
            session_id: sessionId,
            timestamp: new Date().toISOString()
          }
        }]);

      if (error) throw error;
    } catch (error) {
      console.error('Error creating support request:', error);
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: `user_${Date.now()}`,
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      // Save chat session to Supabase - convert messages to JSON format
      const messagesJson = JSON.stringify([...messages, userMessage]);
      const userDataJson = JSON.stringify({ language });

      const { error: upsertError } = await supabase
        .from('chat_sessions')
        .upsert({
          session_id: sessionId,
          messages: messagesJson,
          user_data: userDataJson
        });

      if (upsertError) {
        console.error('Error saving chat session:', upsertError);
      }

      // Get AI response
      const aiResponse = await simulateAIResponse(input, language);
      
      const botMessage: Message = {
        id: `bot_${Date.now()}`,
        type: 'bot',
        content: aiResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      
      // Update chat session with bot response
      const updatedMessagesJson = JSON.stringify([...messages, userMessage, botMessage]);

      const { error: updateError } = await supabase
        .from('chat_sessions')
        .upsert({
          session_id: sessionId,
          messages: updatedMessagesJson,
          user_data: userDataJson
        });

      if (updateError) {
        console.error('Error updating chat session:', updateError);
      }

    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: `error_${Date.now()}`,
        type: 'bot',
        content: t.error,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return {
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
    t,
    createSupportRequest
  };
};
