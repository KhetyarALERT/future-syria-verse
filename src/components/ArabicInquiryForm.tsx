
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Send, User, Mail, Phone, MessageSquare, Globe } from 'lucide-react';

const ArabicInquiryForm: React.FC = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiry_type: 'general' as 'service_inquiry' | 'support_request' | 'complaint' | 'suggestion' | 'general',
    inquiry_text: ''
  });

  const labels = {
    ar: {
      title: 'نموذج الاستفسار',
      subtitle: 'شاركنا استفسارك وسنتواصل معك قريباً',
      name: 'الاسم الكامل',
      email: 'البريد الإلكتروني',
      phone: 'رقم الهاتف',
      inquiryType: 'نوع الاستفسار',
      inquiryText: 'تفاصيل الاستفسار',
      submit: 'إرسال الاستفسار',
      submitting: 'جاري الإرسال...',
      success: 'تم إرسال استفسارك بنجاح! سنتواصل معك قريباً.',
      error: 'حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.',
      placeholders: {
        name: 'أدخل اسمك الكامل',
        email: 'أدخل بريدك الإلكتروني',
        phone: 'أدخل رقم هاتفك',
        inquiryText: 'اكتب استفسارك بالتفصيل...'
      },
      types: {
        general: 'استفسار عام',
        service_inquiry: 'استفسار عن خدمة',
        support_request: 'طلب دعم',
        complaint: 'شكوى',
        suggestion: 'اقتراح'
      }
    },
    en: {
      title: 'Inquiry Form',
      subtitle: 'Share your inquiry and we\'ll contact you soon',
      name: 'Full Name',
      email: 'Email Address',
      phone: 'Phone Number',
      inquiryType: 'Inquiry Type',
      inquiryText: 'Inquiry Details',
      submit: 'Submit Inquiry',
      submitting: 'Submitting...',
      success: 'Your inquiry has been submitted successfully! We\'ll contact you soon.',
      error: 'An error occurred while submitting. Please try again.',
      placeholders: {
        name: 'Enter your full name',
        email: 'Enter your email address',
        phone: 'Enter your phone number',
        inquiryText: 'Write your inquiry in detail...'
      },
      types: {
        general: 'General Inquiry',
        service_inquiry: 'Service Inquiry',
        support_request: 'Support Request',
        complaint: 'Complaint',
        suggestion: 'Suggestion'
      }
    }
  };

  const t = labels[language];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('inquiries')
        .insert([{
          ...formData,
          language
        }]);

      if (error) throw error;

      toast({
        title: "✅ " + (language === 'ar' ? 'تم بنجاح' : 'Success'),
        description: t.success,
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        inquiry_type: 'general',
        inquiry_text: ''
      });

    } catch (error) {
      console.error('Error submitting inquiry:', error);
      toast({
        title: language === 'ar' ? 'خطأ' : 'Error',
        description: t.error,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`max-w-4xl mx-auto p-6 ${language === 'ar' ? 'rtl' : 'ltr'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/50">
        {/* Language Toggle */}
        <div className="p-4 border-b border-gray-200 dark:border-slate-600">
          <div className="flex justify-between items-center">
            <h1 className={`text-2xl font-bold text-gray-800 dark:text-white ${language === 'ar' ? 'font-arabic' : ''}`}>
              {t.title}
            </h1>
            <div className="flex gap-2">
              <button
                onClick={() => setLanguage('ar')}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                  language === 'ar' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 dark:bg-slate-600 text-gray-700 dark:text-gray-300'
                }`}
              >
                العربية
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                  language === 'en' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 dark:bg-slate-600 text-gray-700 dark:text-gray-300'
                }`}
              >
                English
              </button>
            </div>
          </div>
          <p className={`text-gray-600 dark:text-gray-300 mt-2 ${language === 'ar' ? 'font-arabic' : ''}`}>
            {t.subtitle}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className={`block text-sm font-medium text-gray-700 dark:text-gray-300 ${language === 'ar' ? 'font-arabic' : ''}`}>
                <User className="inline w-4 h-4 mr-1" />
                {t.name} *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className={`w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white/50 dark:bg-slate-700/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${language === 'ar' ? 'font-arabic text-right' : ''}`}
                placeholder={t.placeholders.name}
              />
            </div>

            <div className="space-y-2">
              <label className={`block text-sm font-medium text-gray-700 dark:text-gray-300 ${language === 'ar' ? 'font-arabic' : ''}`}>
                <Mail className="inline w-4 h-4 mr-1" />
                {t.email} *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className={`w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white/50 dark:bg-slate-700/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${language === 'ar' ? 'text-right' : ''}`}
                placeholder={t.placeholders.email}
              />
            </div>

            <div className="space-y-2">
              <label className={`block text-sm font-medium text-gray-700 dark:text-gray-300 ${language === 'ar' ? 'font-arabic' : ''}`}>
                <Phone className="inline w-4 h-4 mr-1" />
                {t.phone}
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className={`w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white/50 dark:bg-slate-700/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${language === 'ar' ? 'text-right' : ''}`}
                placeholder={t.placeholders.phone}
              />
            </div>

            <div className="space-y-2">
              <label className={`block text-sm font-medium text-gray-700 dark:text-gray-300 ${language === 'ar' ? 'font-arabic' : ''}`}>
                <MessageSquare className="inline w-4 h-4 mr-1" />
                {t.inquiryType} *
              </label>
              <select
                required
                value={formData.inquiry_type}
                onChange={(e) => setFormData(prev => ({ ...prev, inquiry_type: e.target.value as any }))}
                className={`w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white/50 dark:bg-slate-700/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${language === 'ar' ? 'font-arabic text-right' : ''}`}
              >
                <option value="general">{t.types.general}</option>
                <option value="service_inquiry">{t.types.service_inquiry}</option>
                <option value="support_request">{t.types.support_request}</option>
                <option value="complaint">{t.types.complaint}</option>
                <option value="suggestion">{t.types.suggestion}</option>
              </select>
            </div>
          </div>

          {/* Inquiry Details */}
          <div className="space-y-2">
            <label className={`block text-sm font-medium text-gray-700 dark:text-gray-300 ${language === 'ar' ? 'font-arabic' : ''}`}>
              {t.inquiryText} *
            </label>
            <textarea
              required
              rows={5}
              value={formData.inquiry_text}
              onChange={(e) => setFormData(prev => ({ ...prev, inquiry_text: e.target.value }))}
              className={`w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white/50 dark:bg-slate-700/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none ${language === 'ar' ? 'font-arabic text-right' : ''}`}
              placeholder={t.placeholders.inquiryText}
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full group flex items-center justify-center gap-2 py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:scale-100 shadow-lg hover:shadow-xl ${language === 'ar' ? 'font-arabic' : ''}`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {t.submitting}
                </>
              ) : (
                <>
                  <Send className={`w-5 h-5 group-hover:translate-x-1 transition-transform ${language === 'ar' ? 'rotate-180' : ''}`} />
                  {t.submit}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ArabicInquiryForm;
