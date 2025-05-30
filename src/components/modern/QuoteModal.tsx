
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { X, Send, Sparkles, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose }) => {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    description: ''
  });

  const isRTL = i18n.language === 'ar';

  const services = [
    { key: 'logoDesign', price: '$50+' },
    { key: 'productPackaging', price: '$100+' }, 
    { key: 'branding', price: '$200+' },
    { key: 'marketing', price: '$400+' },
    { key: 'socialMedia', price: '$300/month' },
    { key: 'smartCX', price: '$800+' },
    { key: 'webDevelopment', price: '$200+' },
    { key: 'personalAssistant', price: '$600+' },
    { key: 'erp', price: '$1200+' }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.service) {
      toast({
        title: t('form.error'),
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Use correct inquiry_type enum value
      const { error } = await supabase
        .from('inquiries')
        .insert({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          inquiry_type: 'service_inquiry', // Fixed: use correct enum value
          inquiry_text: `Service: ${formData.service}\n\nDescription: ${formData.description}`,
          language: i18n.language,
          metadata: {
            source: 'quote_modal',
            service: formData.service,
            timestamp: new Date().toISOString()
          }
        });

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      toast({
        title: t('form.success'),
        description: "Your quote request has been submitted successfully!",
      });

      // Reset form and close modal
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        description: ''
      });
      onClose();

    } catch (error) {
      console.error('Error submitting quote request:', error);
      toast({
        title: t('form.error'),
        description: "Failed to submit request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Enhanced backdrop with animated particles */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-br from-slate-950/95 via-blue-950/50 to-purple-950/95 backdrop-blur-xl"
            onClick={onClose}
          >
            {/* Animated background particles */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={`relative w-full max-w-lg bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-cyan-500/20 rounded-3xl p-8 shadow-2xl ${isRTL ? 'rtl' : 'ltr'}`}
          >
            {/* Glowing border effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-3xl blur-xl -z-10" />
            
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <motion.div
                  className="p-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl"
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(6, 182, 212, 0.5)",
                      "0 0 30px rgba(59, 130, 246, 0.7)",
                      "0 0 20px rgba(6, 182, 212, 0.5)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles className="w-6 h-6 text-white" />
                </motion.div>
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    {t('hero.requestQuote')}
                  </h2>
                  <p className="text-gray-400 text-sm">Get your custom quote in 24 hours</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-slate-700/50 rounded-xl"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Input
                    placeholder={t('form.name')}
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="bg-slate-800/70 border-slate-600/50 text-white placeholder:text-gray-400 focus:border-cyan-500/50 focus:ring-cyan-500/25 rounded-xl h-12 backdrop-blur-sm"
                    required
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Input
                    type="email"
                    placeholder={t('form.email')}
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="bg-slate-800/70 border-slate-600/50 text-white placeholder:text-gray-400 focus:border-cyan-500/50 focus:ring-cyan-500/25 rounded-xl h-12 backdrop-blur-sm"
                    required
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Input
                    placeholder={t('form.phone')}
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="bg-slate-800/70 border-slate-600/50 text-white placeholder:text-gray-400 focus:border-cyan-500/50 focus:ring-cyan-500/25 rounded-xl h-12 backdrop-blur-sm"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Select onValueChange={(value) => handleInputChange('service', value)} required>
                    <SelectTrigger className="bg-slate-800/70 border-slate-600/50 text-white h-12 rounded-xl backdrop-blur-sm">
                      <SelectValue placeholder={t('form.selectService')} />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800/95 border-slate-600/50 backdrop-blur-xl">
                      {services.map((service) => (
                        <SelectItem 
                          key={service.key} 
                          value={service.key} 
                          className="text-white hover:bg-slate-700/70 focus:bg-slate-700/70"
                        >
                          <div className="flex items-center justify-between w-full">
                            <span>{t(`services.${service.key}.title`)}</span>
                            <span className="text-cyan-400 text-sm ml-2">{service.price}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Textarea
                    placeholder={t('form.description')}
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="bg-slate-800/70 border-slate-600/50 text-white placeholder:text-gray-400 focus:border-cyan-500/50 focus:ring-cyan-500/25 rounded-xl min-h-[120px] backdrop-blur-sm"
                    rows={4}
                  />
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 hover:from-cyan-700 hover:via-blue-700 hover:to-purple-700 text-white font-semibold py-4 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 shadow-lg hover:shadow-cyan-500/25"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-3">
                      <motion.div
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      <span>Processing...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <Zap className="w-5 h-5" />
                      <span>{t('form.submit')}</span>
                    </div>
                  )}
                </Button>
              </motion.div>
            </form>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-6 flex items-center justify-center gap-6 text-xs text-gray-400"
            >
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
                <span>Custom Solutions</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default QuoteModal;
