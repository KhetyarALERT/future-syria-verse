
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { X, MessageCircle, FileText, TrendingUp, Image as ImageIcon } from 'lucide-react';
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
        setExamples([]);
      } else {
        setExamples(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
      setExamples([]);
    } finally {
      setLoading(false);
    }
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

  const renderImageExample = (content: any) => (
    <div className="space-y-4">
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg border-2 border-dashed border-blue-200 text-center">
        <ImageIcon className="w-16 h-16 mx-auto text-blue-500 mb-4" />
        <p className="text-gray-600 font-medium">{content.image_description}</p>
      </div>
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

  const renderGraphExample = (content: any) => (
    <div className="space-y-4">
      <p className="text-gray-600">{content.description}</p>
      
      {content.graph_data && (
        <div className="bg-white p-4 rounded-lg border">
          <h4 className="text-lg font-semibold mb-4 text-center">{content.graph_data.title}</h4>
          <div className="space-y-2">
            {content.graph_data.data.map((item: any, index: number) => (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="font-medium">{item.month}</span>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <TrendingUp className="w-4 h-4 text-blue-500 mr-1" />
                    <span className="text-sm">{item.conversions} conversions</span>
                  </div>
                  <div className="text-green-600 font-semibold">{item.roi}% ROI</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

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

  const renderDemoExample = (content: any) => (
    <div className="space-y-4">
      <p className="text-gray-600">{content.description}</p>

      {/* Social Media Mock Post */}
      {content.mock_post && (
        <div className="bg-white border rounded-lg p-4 shadow-sm">
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">DP</span>
            </div>
            <div className="ml-3">
              <p className="font-semibold text-sm">DigitalPro</p>
              <p className="text-xs text-gray-500">{content.mock_post.platform}</p>
            </div>
          </div>
          <p className="text-sm mb-3">{content.mock_post.content}</p>
          <div className="flex space-x-4 text-xs text-gray-500">
            <span>❤️ {content.mock_post.engagement.likes}</span>
            <span>💬 {content.mock_post.engagement.comments}</span>
            <span>🔄 {content.mock_post.engagement.shares}</span>
          </div>
        </div>
      )}

      {/* Flowchart for Smart CX */}
      {content.flowchart && (
        <div className="space-y-3">
          <h4 className="font-semibold">Customer Experience Flow:</h4>
          <div className="space-y-2">
            {content.flowchart.steps.map((step: string, index: number) => (
              <div key={index} className="flex items-center">
                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3">
                  {index + 1}
                </div>
                <span className="text-sm">{step}</span>
                {index < content.flowchart.steps.length - 1 && (
                  <div className="ml-4 text-blue-400">→</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ERP Modules */}
      {content.modules && (
        <div className="space-y-3">
          <h4 className="font-semibold">System Modules:</h4>
          <div className="grid grid-cols-2 gap-2">
            {content.modules.map((module: string, index: number) => (
              <div key={index} className="bg-blue-50 p-2 rounded text-sm text-center">
                {module}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Features List */}
      {content.features && (
        <ul className="space-y-2">
          {content.features.map((feature: string, index: number) => (
            <li key={index} className="flex items-center text-sm text-gray-700">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3" />
              {feature}
            </li>
          ))}
        </ul>
      )}

      {/* Benefits List */}
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

      {/* Dashboard Features */}
      {content.dashboard_features && (
        <div className="space-y-3">
          <h4 className="font-semibold">Dashboard Features:</h4>
          <ul className="space-y-2">
            {content.dashboard_features.map((feature: string, index: number) => (
              <li key={index} className="flex items-center text-sm text-gray-700">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-3" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  const renderExample = (example: ServiceExample) => {
    switch (example.example_type) {
      case 'chat':
        return renderChatExample(example.content);
      case 'image':
        return renderImageExample(example.content);
      case 'graph':
        return renderGraphExample(example.content);
      case 'demo':
        return renderDemoExample(example.content);
      default:
        return <p>Example type not supported</p>;
    }
  };

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

            <div className="p-6 overflow-y-auto max-h-[50vh]">
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
                </div>
              ) : examples.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No examples available for this service.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {examples.map((example) => (
                    <div key={example.id}>
                      {renderExample(example)}
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
