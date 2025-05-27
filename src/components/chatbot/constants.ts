
import { ChatLabels } from './types';

export const CHAT_LABELS: Record<'ar' | 'en', ChatLabels> = {
  ar: {
    title: 'المساعد الذكي',
    placeholder: 'اكتب رسالتك هنا...',
    send: 'إرسال',
    typing: 'المساعد يكتب...',
    welcome: 'مرحباً! أنا مساعدك الذكي. كيف يمكنني مساعدتك اليوم؟',
    error: 'عذراً، حدث خطأ. يرجى المحاولة مرة أخرى.',
    inquiryCreated: 'تم إنشاء استفسار جديد بناء على محادثتنا.',
    supportOptions: {
      complaint: 'شكوى',
      inquiry: 'استفسار جديد',
      suggestion: 'اقتراح',
      other: 'أخرى'
    }
  },
  en: {
    title: 'AI Assistant',
    placeholder: 'Type your message here...',
    send: 'Send',
    typing: 'Assistant is typing...',
    welcome: 'Hello! I\'m your AI assistant. How can I help you today?',
    error: 'Sorry, an error occurred. Please try again.',
    inquiryCreated: 'A new inquiry has been created based on our conversation.',
    supportOptions: {
      complaint: 'Complaint',
      inquiry: 'New Inquiry',
      suggestion: 'Suggestion',
      other: 'Other'
    }
  }
};

export const ARABIC_KEYWORDS = {
  greeting: ['مرحبا', 'أهلا', 'السلام', 'صباح', 'مساء'],
  service: ['خدمة', 'خدمات', 'تصميم', 'موقع', 'متجر', 'ذكي'],
  support: ['مساعدة', 'دعم', 'مشكلة', 'خطأ', 'عطل'],
  complaint: ['شكوى', 'غير راضي', 'سيء', 'بطيء', 'لا يعمل'],
  pricing: ['سعر', 'أسعار', 'تكلفة', 'مجاني', 'رخيص'],
  contact: ['تواصل', 'اتصال', 'هاتف', 'إيميل', 'عنوان']
};

export const ENGLISH_KEYWORDS = {
  greeting: ['hello', 'hi', 'hey', 'good morning', 'good evening'],
  service: ['service', 'design', 'website', 'logo', 'ecommerce', 'ai'],
  support: ['help', 'support', 'problem', 'issue', 'error'],
  complaint: ['complaint', 'unsatisfied', 'bad', 'slow', 'not working'],
  pricing: ['price', 'pricing', 'cost', 'free', 'cheap', 'expensive'],
  contact: ['contact', 'call', 'phone', 'email', 'address']
};
