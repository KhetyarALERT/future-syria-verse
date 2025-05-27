
import { Language } from './types';
import { ARABIC_KEYWORDS, ENGLISH_KEYWORDS } from './constants';

export const simulateAIResponse = async (userMessage: string, language: Language): Promise<string> => {
  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
  
  const lowerMessage = userMessage.toLowerCase();
  const keywords = language === 'ar' ? ARABIC_KEYWORDS : ENGLISH_KEYWORDS;
  
  // Check for different types of inquiries
  if (keywords.greeting.some(word => lowerMessage.includes(word))) {
    return language === 'ar' 
      ? 'أهلاً وسهلاً! أنا هنا لمساعدتك. يمكنني مساعدتك في الاستفسار عن خدماتنا، تقديم الدعم، أو أي شيء آخر تحتاجه.'
      : 'Welcome! I\'m here to help you. I can assist you with inquiries about our services, provide support, or anything else you need.';
  }
  
  if (keywords.service.some(word => lowerMessage.includes(word))) {
    return language === 'ar'
      ? 'نحن نقدم خدمات متنوعة تشمل تصميم الشعارات، تطوير المواقع، المتاجر الإلكترونية، والمساعدين الأذكياء. أي خدمة تهمك أكثر؟'
      : 'We offer various services including logo design, website development, e-commerce solutions, and AI assistants. Which service interests you most?';
  }
  
  if (keywords.support.some(word => lowerMessage.includes(word))) {
    return language === 'ar'
      ? 'فهمت أنك تحتاج للمساعدة. تم تسجيل طلب الدعم الخاص بك وسيتواصل معك فريقنا قريباً. هل يمكنك تقديم المزيد من التفاصيل؟'
      : 'I understand you need help. Your support request has been logged and our team will contact you soon. Can you provide more details?';
  }
  
  if (keywords.complaint.some(word => lowerMessage.includes(word))) {
    return language === 'ar'
      ? 'أعتذر عن أي إزعاج. تم تسجيل شكواك وسيقوم فريقنا بمراجعتها والتواصل معك لحل المشكلة.'
      : 'I apologize for any inconvenience. Your complaint has been logged and our team will review it and contact you to resolve the issue.';
  }
  
  if (keywords.pricing.some(word => lowerMessage.includes(word))) {
    return language === 'ar'
      ? 'أسعارنا تنافسية وتعتمد على نوع الخدمة ومتطلباتك. يمكنني مساعدتك في الحصول على عرض سعر مخصص. ما هي الخدمة التي تهمك؟'
      : 'Our prices are competitive and depend on the service type and your requirements. I can help you get a custom quote. What service are you interested in?';
  }
  
  if (keywords.contact.some(word => lowerMessage.includes(word))) {
    return language === 'ar'
      ? 'يمكنك التواصل معنا عبر: hello@digitalsolutions.com أو +1 (234) 567-890. نحن نرحب بالعملاء من سوريا!'
      : 'You can contact us at: hello@digitalsolutions.com or +1 (234) 567-890. We welcome clients from Syria!';
  }
  
  // Default intelligent response
  return language === 'ar'
    ? 'شكراً لك على رسالتك. سأقوم بتسجيل استفسارك وسيتواصل معك فريقنا قريباً للمساعدة. هل تود إضافة أي تفاصيل أخرى؟'
    : 'Thank you for your message. I\'ll log your inquiry and our team will contact you soon to help. Would you like to add any other details?';
};
