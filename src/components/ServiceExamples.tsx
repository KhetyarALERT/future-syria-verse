import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { X, MessageCircle, FileText, TrendingUp, Image as ImageIcon, Sparkles, BarChart3, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';
import ServiceVisualExample from './ServiceVisualExample';

// Use the Supabase generated type directly
type ServiceExample = Tables<'service_examples'>;

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
      console.log('Fetching examples for service:', serviceKey, 'language:', i18n.language);
      
      const { data, error } = await supabase
        .from('service_examples')
        .select('*')
        .eq('service_type', serviceKey)
        .eq('language', i18n.language);

      console.log('Fetched examples:', data, error);

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

  const renderImageExample = (content: any) => (
    <div className="space-y-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-xl border-2 border-dashed border-blue-200 text-center relative overflow-hidden"
      >
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(59, 130, 246, 0.3) 1px, transparent 0)',
            backgroundSize: '20px 20px'
          }} />
        </div>
        
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <ImageIcon className="w-20 h-20 mx-auto text-blue-500 mb-4" />
        </motion.div>
        <h4 className="text-lg font-bold text-gray-800 mb-2">Premium Design Example</h4>
        <p className="text-gray-600 font-medium">{content.image_description}</p>
      </motion.div>
      
      <div className="bg-white rounded-xl p-6 border shadow-sm">
        <p className="text-gray-700 mb-4">{content.description}</p>
        {content.benefits && (
          <div>
            <h5 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-yellow-500" />
              What You Get:
            </h5>
            <ul className="space-y-2">
              {content.benefits.map((benefit: string, index: number) => (
                <motion.li 
                  key={index} 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center text-sm text-gray-700"
                >
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3 flex-shrink-0" />
                  {benefit}
                </motion.li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );

  const renderGraphExample = (content: any) => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 border shadow-sm">
        <p className="text-gray-700 mb-6">{content.description}</p>
        
        {content.graph_data && (
          <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-6 rounded-xl border">
            <div className="flex items-center gap-2 mb-6">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              <h4 className="text-lg font-semibold text-center text-gray-800">{content.graph_data.title}</h4>
            </div>
            <div className="space-y-3">
              {content.graph_data.data.map((item: any, index: number) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border"
                >
                  <span className="font-medium text-gray-800">{item.month}</span>
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center">
                      <TrendingUp className="w-4 h-4 text-blue-500 mr-2" />
                      <span className="text-sm font-medium">{item.conversions} conversions</span>
                    </div>
                    <div className="text-green-600 font-bold text-lg">{item.roi}% ROI</div>
                  </div>
                  {/* Visual progress bar */}
                  <motion.div 
                    className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden ml-4"
                    initial={{ width: 0 }}
                    animate={{ width: '5rem' }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <motion.div 
                      className="h-full bg-gradient-to-r from-blue-500 to-green-500"
                      initial={{ width: '0%' }}
                      animate={{ width: `${Math.min(item.roi / 5, 100)}%` }}
                      transition={{ delay: index * 0.2 + 0.5, duration: 1 }}
                    />
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {content.benefits && (
          <div className="mt-6">
            <h5 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-yellow-500" />
              Key Benefits:
            </h5>
            <ul className="space-y-2">
              {content.benefits.map((benefit: string, index: number) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center text-sm text-gray-700"
                >
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3 flex-shrink-0" />
                  {benefit}
                </motion.li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );

  const renderDemoExample = (content: any) => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 border shadow-sm">
        <p className="text-gray-700 mb-6">{content.description}</p>

        {/* Social Media Mock Post */}
        {content.mock_post && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-purple-50 to-pink-50 border rounded-xl p-6 shadow-sm mb-6"
          >
            <h5 className="font-semibold mb-4 text-gray-800">Sample Social Media Post:</h5>
            <div className="bg-white border rounded-lg p-4 shadow-sm">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">DP</span>
                </div>
                <div className="ml-3">
                  <p className="font-semibold text-sm">DigitalPro</p>
                  <p className="text-xs text-gray-500">{content.mock_post.platform}</p>
                </div>
              </div>
              <p className="text-sm mb-4">{content.mock_post.content}</p>
              <div className="flex space-x-6 text-sm text-gray-500">
                <span className="flex items-center gap-1">❤️ {content.mock_post.engagement.likes}</span>
                <span className="flex items-center gap-1">💬 {content.mock_post.engagement.comments}</span>
                <span className="flex items-center gap-1">🔄 {content.mock_post.engagement.shares}</span>
              </div>
            </div>
          </motion.div>
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
        return <p className="text-gray-500">Example type not supported</p>;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[85vh] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Enhanced Header */}
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-cyan-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      {examples[0]?.title || t(`services.${serviceKey}.title`)}
                    </h2>
                    <p className="text-sm text-gray-600">Service delivery showcase & expected outcomes</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-gray-100">
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Content Area */}
            <div className="p-6 overflow-y-auto max-h-[55vh]">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full"
                  />
                  <span className="ml-3 text-gray-600">Loading examples...</span>
                </div>
              ) : examples.length === 0 ? (
                // Show visual service example when no database examples exist
                <ServiceVisualExample serviceKey={serviceKey} />
              ) : (
                <div className="space-y-8">
                  {examples.map((example, index) => (
                    <motion.div 
                      key={example.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {renderExample(example)}
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Enhanced Footer */}
            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex gap-3">
                <Button
                  onClick={onGetQuote}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  {i18n.language === 'ar' ? 'احصل على عرض سعر' : 'Get Quote via Chat'}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    console.log('Open form');
                  }}
                  className="flex-1 border-gray-300 hover:bg-gray-100"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  {i18n.language === 'ar' ? 'ملء النموذج' : 'Fill Form'}
                </Button>
              </div>
              
              {/* Trust indicators */}
              <div className="mt-4 flex items-center justify-center gap-6 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full" />
                  <span>24h Response</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-blue-400 rounded-full" />
                  <span>Free Consultation</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-purple-400 rounded-full" />
                  <span>Satisfaction Guaranteed</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ServiceExamples;
