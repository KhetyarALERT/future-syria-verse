
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { X, MessageCircle, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

interface ServiceExample {
  id: string;
  service_type: string;
  title: string;
  content: any;
  example_type: 'chat' | 'image' | 'graph' | 'demo';
  language: string;
}

interface ServiceExamplesProps {
  serviceKey: string;
  isOpen: boolean;
  onClose: () => void;
  onGetQuote: () => void;
}

const ServiceExamples: React.FC<ServiceExamplesProps> = ({ 
  serviceKey, 
  isOpen, 
  onClose, 
  onGetQuote 
}) => {
  const { t, i18n } = useTranslation();
  const [examples, setExamples] = useState<ServiceExample[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen && serviceKey) {
      fetchServiceExamples();
    }
  }, [isOpen, serviceKey, i18n.language]);

  const fetchServiceExamples = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('service_examples')
        .select('*')
        .eq('service_type', serviceKey)
        .eq('language', i18n.language);

      if (error) {
        console.error('Error fetching examples:', error);
        // Fallback to default examples if database doesn't have data
        setExamples(getDefaultExamples());
      } else {
        setExamples(data || getDefaultExamples());
      }
    } catch (error) {
      console.error('Error:', error);
      setExamples(getDefaultExamples());
    } finally {
      setLoading(false);
    }
  };

  const getDefaultExamples = (): ServiceExample[] => {
    const isArabic = i18n.language === 'ar';
    
    const defaultExamples: { [key: string]: ServiceExample } = {
      personalAssistant: {
        id: '1',
        service_type: 'personalAssistant',
        title: isArabic ? 'مساعد شخصي ذكي' : 'Personal AI Assistant',
        content: {
          messages: [
            {
              sender: 'user',
              text: isArabic ? 'مرحبا، هل يمكنك تنظيم يومي؟' : 'Hi, can you help organize my day?'
            },
            {
              sender: 'ai',
              text: isArabic ? 'بالتأكيد! لقد جدولت اجتماعك في الساعة 10 صباحاً وحجزت وقتاً من 2 إلى 4 عصراً لمشروع التقرير. هل تحتاج مني ترتيب أي شيء آخر؟' : 'Absolutely! I\'ve scheduled your 10 AM meeting and blocked 2-4 PM for your report project. Do you need me to arrange anything else?'
            },
            {
              sender: 'user',
              text: isArabic ? 'ممتاز! هل يمكنك تذكيري بمراجعة الإيميلات؟' : 'Perfect! Can you remind me to check emails?'
            },
            {
              sender: 'ai',
              text: isArabic ? 'تم إضافة تذكير لمراجعة الإيميلات في الساعة 9 صباحاً و 5 مساءً. يومك منظم بالكامل!' : 'Added email check reminders for 9 AM and 5 PM. Your day is all set!'
            }
          ]
        },
        example_type: 'chat',
        language: i18n.language
      },
      agenticAgent: {
        id: '2',
        service_type: 'agenticAgent',
        title: isArabic ? 'وكيل ذكي متقدم' : 'Advanced Agentic Agent',
        content: {
          description: isArabic ? 'نظام ذكي يدير المهام تلقائياً ويحسن كفاءة العمل بنسبة تصل إلى 75%' : 'Smart system that manages tasks automatically and improves work efficiency by up to 75%',
          benefits: [
            isArabic ? 'أتمتة المهام المتكررة' : 'Automate repetitive tasks',
            isArabic ? 'تحليل البيانات الفوري' : 'Real-time data analysis',
            isArabic ? 'تقارير ذكية تلقائية' : 'Automated intelligent reports'
          ]
        },
        example_type: 'demo',
        language: i18n.language
      }
    };

    return [defaultExamples[serviceKey] || defaultExamples.personalAssistant];
  };

  const renderChatExample = (content: any) => (
    <div className="space-y-4 max-h-96 overflow-y-auto">
      {content.messages?.map((msg: any, index: number) => (
        <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
          <div className={`max-w-[80%] p-3 rounded-lg ${
            msg.sender === 'user' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 text-gray-800'
          }`}>
            <p className="text-sm">{msg.text}</p>
          </div>
        </div>
      ))}
    </div>
  );

  const renderDemoExample = (content: any) => (
    <div className="space-y-4">
      <p className="text-gray-600">{content.description}</p>
      {content.benefits && (
        <ul className="space-y-2">
          {content.benefits.map((benefit: string, index: number) => (
            <li key={index} className="flex items-center text-sm text-gray-700">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3" />
              {benefit}
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">
                {examples[0]?.title || t(`services.${serviceKey}.title`)}
              </h2>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="p-6">
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
                </div>
              ) : (
                <div className="space-y-6">
                  {examples.map((example) => (
                    <div key={example.id}>
                      {example.example_type === 'chat' && renderChatExample(example.content)}
                      {example.example_type === 'demo' && renderDemoExample(example.content)}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-6 border-t border-gray-200 flex gap-3">
              <Button
                onClick={onGetQuote}
                className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                {i18n.language === 'ar' ? 'احصل على عرض سعر' : 'Get Quote via Chat'}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  // Open form modal or navigate to form
                  console.log('Open form');
                }}
                className="flex-1"
              >
                <FileText className="w-4 h-4 mr-2" />
                {i18n.language === 'ar' ? 'ملء النموذج' : 'Fill Form'}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ServiceExamples;
