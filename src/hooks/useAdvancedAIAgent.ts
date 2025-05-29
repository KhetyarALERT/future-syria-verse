
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
  [key: string]: any;
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
      // Get recent inquiries and company knowledge from Supabase for context
      const { data: recentInquiries } = await supabase
        .from('inquiries')
        .select('inquiry_text, name, inquiry_type')
        .order('created_at', { ascending: false })
        .limit(5);

      const companyKnowledge = {
        services: [
          "Logo Design & Branding - Starting at $50, completed within 24-48 hours",
          "Website Development - $200-$1000, modern responsive sites in 1-2 weeks",
          "E-commerce Solutions - $500-$2000, complete online stores in 2-4 weeks",
          "AI Personal Assistants - $10-$50/month, 24/7 customer support bots",
          "Marketing & Social Media Management - Custom packages for brand growth",
          "Smart CX Systems - Advanced customer experience solutions",
          "Work Automation - Custom quotes, streamline business processes",
          "Product & Packaging Design - Professional designs for physical products",
          "Full Company ERP Solutions - Complete business management systems"
        ],
        paymentMethods: ["Stripe", "Bank transfers", "Local payment methods", "Cryptocurrency"],
        languages: ["English", "Arabic"],
        locations: "Global services with special focus on MENA region"
      };

      const response = await supabase.functions.invoke('openrouter-ai-chat', {
        body: {
          message: userMessage,
          conversationHistory: conversationHistory,
          language: i18n.language,
          companyKnowledge,
          recentInquiries: recentInquiries || []
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

      // Extract information from the conversation
      await extractUserInfo(userMessage, aiResponse);

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

  const extractUserInfo = async (userMessage: string, aiResponse: string) => {
    const lowerMessage = userMessage.toLowerCase();
    const newInfo: UserInfo = { ...userInfo };
    
    // Enhanced extraction logic
    if (lowerMessage.includes('@') && !userInfo.email) {
      const emailMatch = userMessage.match(/\S+@\S+\.\S+/);
      if (emailMatch) {
        newInfo.email = emailMatch[0];
      }
    }

    // Extract phone numbers (more comprehensive pattern)
    const phoneMatch = userMessage.match(/(?:\+?[\d\s\-\(\)]{8,})/);
    if (phoneMatch && !userInfo.phone) {
      newInfo.phone = phoneMatch[0].trim();
    }

    // Extract names from "I'm [name]" or "My name is [name]"
    const nameMatch = userMessage.match(/(?:i'm|my name is|i am)\s+([a-zA-Z\s]+)/i);
    if (nameMatch && !userInfo.name) {
      newInfo.name = nameMatch[1].trim();
    }

    // Extract company names
    const companyMatch = userMessage.match(/(?:company|business|work at|from)\s+([a-zA-Z\s&\.]+)/i);
    if (companyMatch && !userInfo.company) {
      newInfo.company = companyMatch[1].trim();
    }

    // Extract contact preferences
    const contactMethods = ['whatsapp', 'telegram', 'email', 'phone', 'call'];
    for (const method of contactMethods) {
      if (lowerMessage.includes(method) && !userInfo.preferredContactMethod) {
        newInfo.preferredContactMethod = method;
        // Extract contact details if mentioned
        if (method === 'whatsapp' || method === 'telegram') {
          const contactMatch = userMessage.match(/(\+?[\d\s\-\(\)]{8,})/);
          if (contactMatch) {
            newInfo.contactDetails = contactMatch[0].trim();
          }
        }
        break;
      }
    }

    // Update user info if new information was found
    if (JSON.stringify(newInfo) !== JSON.stringify(userInfo)) {
      setUserInfo(newInfo);
    }

    // Check if AI suggests saving or if we have enough info
    const shouldSave = (
      aiResponse.toLowerCase().includes('save') || 
      aiResponse.toLowerCase().includes('submit') || 
      aiResponse.toLowerCase().includes('حفظ') || 
      aiResponse.toLowerCase().includes('إرسال') ||
      (newInfo.name && newInfo.description && newInfo.description.length >= 10)
    );

    if (shouldSave && newInfo.name && (newInfo.description || conversationHistory.length >= 4)) {
      await saveToSupabase(newInfo);
    }
  };

  const saveToSupabase = async (info: UserInfo = userInfo) => {
    try {
      const inquiryText = `Service: ${info.serviceNeeded || 'Not specified'}
Budget: ${info.budget || 'Not specified'}  
Timeline: ${info.timeline || 'Not specified'}
Company: ${info.company || 'Not specified'}
Description: ${info.description || 'Gathered from conversation'}
Preferred Contact: ${info.preferredContactMethod || 'Not specified'}
Contact Details: ${info.contactDetails || 'Not specified'}

Conversation Summary:
${conversationHistory.map(msg => `${msg.role}: ${msg.content}`).join('\n')}`;

      // Serialize data for JSON compatibility
      const serializedUserInfo = JSON.parse(JSON.stringify(info));
      const serializedConversationHistory = JSON.parse(JSON.stringify(conversationHistory));

      const { error } = await supabase
        .from('inquiries')
        .insert({
          name: info.name || 'AI Chat User',
          email: info.email || 'no-email@example.com',
          phone: info.phone || null,
          inquiry_type: 'general' as const,
          inquiry_text: inquiryText,
          language: i18n.language,
          preferred_contact_method: info.preferredContactMethod || null,
          contact_preference_details: info.contactDetails || null,
          metadata: {
            source: 'openrouter_ai_agent',
            conversation_history: serializedConversationHistory,
            userInfo: serializedUserInfo,
            timestamp: new Date().toISOString(),
            conversation_length: conversationHistory.length,
            ai_collected: true
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
    await saveToSupabase(info);
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
