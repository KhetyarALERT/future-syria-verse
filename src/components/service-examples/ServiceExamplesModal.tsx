
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { X, MessageCircle, FileText, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Tables } from '@/integrations/supabase/types';
import { ExampleRenderer } from './ExampleRenderer';
import ServiceVisualExample from '../ServiceVisualExample';

type ServiceExample = Tables<'service_examples'>;

interface ServiceExamplesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGetQuote: () => void;
  serviceKey: string;
  examples: ServiceExample[];
  loading: boolean;
}

export const ServiceExamplesModal: React.FC<ServiceExamplesModalProps> = ({
  isOpen,
  onClose,
  onGetQuote,
  serviceKey,
  examples,
  loading
}) => {
  const { t, i18n } = useTranslation();

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
                      <ExampleRenderer example={example} />
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
