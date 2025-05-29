
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface UserInfo {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  serviceNeeded?: string;
  budget?: string;
  timeline?: string;
  description?: string;
  preferredContactMethod?: string;
  contactDetails?: string;
  [key: string]: string | undefined;
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export const useAdvancedAIAgent = () => {
  const { i18n } = useTranslation();
  const { toast } = useToast();
  const [userInfo, setUserInfo] = useState<UserInfo>({});
  const [conversationHistory, setConversationHistory] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessageToAI = async (userMessage: string): Promise<string> => {
    setIsLoading(true);
    
    try {
      const response = await supabase.functions.invoke('openrouter-ai-chat', {
        body: {
          message: userMessage,
          conversationHistory: conversationHistory,
          language: i18n.language
        }
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      const aiResponse = response.data.response;
      
      // Update conversation history
      setConversationHistory(prev => [
        ...prev,
        { role: 'user', content: userMessage },
        { role: 'assistant', content: aiResponse }
      ]);

      // Try to extract information from the conversation
      extractUserInfo(userMessage, aiResponse);

      return aiResponse;
    } catch (error) {
      console.error('AI response error:', error);
      return i18n.language === 'ar' 
        ? 'عذراً، حدث خطأ. يرجى المحاولة مرة أخرى.'
        : 'Sorry, there was an error. Please try again.';
    } finally {
      setIsLoading(false);
    }
  };

  const extractUserInfo = (userMessage: string, aiResponse: string) => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Simple extraction logic - you can make this more sophisticated
    if (lowerMessage.includes('@') && !userInfo.email) {
      const emailMatch = userMessage.match(/\S+@\S+\.\S+/);
      if (emailMatch) {
        setUserInfo(prev => ({ ...prev, email: emailMatch[0] }));
      }
    }

    // Extract phone numbers
    const phoneMatch = userMessage.match(/[\+]?[\d\s\-\(\)]{8,}/);
    if (phoneMatch && !userInfo.phone) {
      setUserInfo(prev => ({ ...prev, phone: phoneMatch[0] }));
    }

    // Check if AI is asking to save information
    if (aiResponse.toLowerCase().includes('save') || aiResponse.toLowerCase().includes('submit') || 
        aiResponse.toLowerCase().includes('حفظ') || aiResponse.toLowerCase().includes('إرسال')) {
      // If we have enough info, save to database
      if (userInfo.name && userInfo.description && userInfo.description.length >= 10) {
        saveToSupabase();
      }
    }
  };

  const saveToSupabase = async () => {
    try {
      const inquiryText = `Service: ${userInfo.serviceNeeded || 'Not specified'}
Budget: ${userInfo.budget || 'Not specified'}  
Timeline: ${userInfo.timeline || 'Not specified'}
Company: ${userInfo.company || 'Not specified'}
Description: ${userInfo.description || 'Not specified'}
Preferred Contact: ${userInfo.preferredContactMethod || 'Not specified'}
Contact Details: ${userInfo.contactDetails || 'Not specified'}`;

      const { error } = await supabase
        .from('inquiries')
        .insert({
          name: userInfo.name || 'AI Chat User',
          email: userInfo.email || null,
          phone: userInfo.phone || null,
          inquiry_type: 'general' as const,
          inquiry_text: inquiryText,
          language: i18n.language,
          preferred_contact_method: userInfo.preferredContactMethod || null,
          contact_preference_details: userInfo.contactDetails || null,
          metadata: {
            source: 'openrouter_ai_agent',
            conversation_history: conversationHistory,
            userInfo: JSON.parse(JSON.stringify(userInfo)),
            timestamp: new Date().toISOString()
          }
        });

      if (error) throw error;

      toast({
        title: i18n.language === 'ar' ? "تم حفظ المعلومات بنجاح" : "Information saved successfully",
        description: i18n.language === 'ar' ? "سيتواصل معك فريقنا قريباً" : "Our team will contact you soon.",
      });

      // Reset for next conversation
      setUserInfo({});
      setConversationHistory([]);

    } catch (error) {
      console.error('Error saving to Supabase:', error);
      toast({
        title: i18n.language === 'ar' ? "خطأ في حفظ المعلومات" : "Error saving information",
        description: i18n.language === 'ar' ? "يرجى المحاولة مرة أخرى" : "Please try again or contact us directly.",
        variant: "destructive",
      });
    }
  };

  const manualSave = async (info: UserInfo) => {
    setUserInfo(info);
    await saveToSupabase();
  };

  return {
    sendMessageToAI,
    userInfo,
    isLoading,
    conversationHistory,
    manualSave,
    setUserInfo
  };
};
