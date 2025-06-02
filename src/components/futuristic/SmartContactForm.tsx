
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, User, Mail, Phone, MessageSquare, Calendar, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface SmartContactFormProps {
  prefilledData?: any;
  onClose?: () => void;
}

const SmartContactForm: React.FC<SmartContactFormProps> = ({ prefilledData, onClose }) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: prefilledData?.name || '',
    email: prefilledData?.email || '',
    phone: prefilledData?.phone || '',
    serviceType: prefilledData?.serviceType || '',
    businessType: prefilledData?.businessType || '',
    budget: prefilledData?.budget || '',
    timeline: prefilledData?.timeline || '',
    requirements: prefilledData?.requirements || '',
    additionalInfo: prefilledData?.additionalInfo || '',
    contactPreference: 'email'
  });

  const serviceOptions = [
    { value: 'logo-design', label: 'Logo Design & Branding' },
    { value: 'web-development', label: 'Website Development' },
    { value: 'ai-solutions', label: 'AI Solutions' },
    { value: 'digital-marketing', label: 'Digital Marketing' },
    { value: 'consultation', label: 'Free Consultation' }
  ];

  const budgetOptions = [
    { value: 'under-500', label: 'Under $500' },
    { value: '500-1000', label: '$500 - $1,000' },
    { value: '1000-5000', label: '$1,000 - $5,000' },
    { value: '5000-10000', label: '$5,000 - $10,000' },
    { value: 'over-10000', label: 'Over $10,000' },
    { value: 'not-sure', label: 'Not sure yet' }
  ];

  const timelineOptions = [
    { value: 'urgent', label: 'ASAP (Rush job)' },
    { value: '1-week', label: 'Within 1 week' },
    { value: '2-4-weeks', label: '2-4 weeks' },
    { value: '1-3-months', label: '1-3 months' },
    { value: 'flexible', label: 'Flexible timeline' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('inquiries')
        .insert({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          inquiry_type: 'service_inquiry',
          inquiry_text: `Service: ${formData.serviceType}
Business Type: ${formData.businessType}
Budget: ${formData.budget}
Timeline: ${formData.timeline}
Requirements: ${formData.requirements}
Additional Info: ${formData.additionalInfo}`,
          language: 'en',
          preferred_contact_method: formData.contactPreference,
          metadata: {
            source: 'smart_form',
            service_type: formData.serviceType,
            budget_range: formData.budget,
            timeline: formData.timeline,
            business_type: formData.businessType
          }
        });

      if (error) throw error;

      toast({
        title: "Request Submitted Successfully! 🎉",
        description: "Our team will contact you within 24 hours with a customized proposal.",
      });

      if (onClose) onClose();

    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Submission Error",
        description: "Please try again or contact us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
    >
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-900 border-blue-500/20">
        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">Tell Us About Your Project</h2>
            <p className="text-gray-300">Help us understand your needs so we can provide the perfect solution.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                  <User className="w-4 h-4" />
                  Full Name *
                </label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                  className="bg-slate-800 border-slate-600 text-white"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                  <Mail className="w-4 h-4" />
                  Email Address *
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  required
                  className="bg-slate-800 border-slate-600 text-white"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                  <Phone className="w-4 h-4" />
                  Phone Number
                </label>
                <Input
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="bg-slate-800 border-slate-600 text-white"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                  <MessageSquare className="w-4 h-4" />
                  Service Needed *
                </label>
                <Select value={formData.serviceType} onValueChange={(value) => setFormData(prev => ({ ...prev, serviceType: value }))}>
                  <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Project Details */}
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">
                Business/Project Type *
              </label>
              <Input
                value={formData.businessType}
                onChange={(e) => setFormData(prev => ({ ...prev, businessType: e.target.value }))}
                required
                className="bg-slate-800 border-slate-600 text-white"
                placeholder="e.g., Restaurant, E-commerce, Clinic, Startup..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                  <DollarSign className="w-4 h-4" />
                  Budget Range
                </label>
                <Select value={formData.budget} onValueChange={(value) => setFormData(prev => ({ ...prev, budget: value }))}>
                  <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                    <SelectValue placeholder="Select budget range" />
                  </SelectTrigger>
                  <SelectContent>
                    {budgetOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                  <Calendar className="w-4 h-4" />
                  Timeline
                </label>
                <Select value={formData.timeline} onValueChange={(value) => setFormData(prev => ({ ...prev, timeline: value }))}>
                  <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                    <SelectValue placeholder="When do you need this?" />
                  </SelectTrigger>
                  <SelectContent>
                    {timelineOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">
                Project Requirements *
              </label>
              <Textarea
                value={formData.requirements}
                onChange={(e) => setFormData(prev => ({ ...prev, requirements: e.target.value }))}
                required
                className="bg-slate-800 border-slate-600 text-white min-h-[100px]"
                placeholder="Describe what you need in detail..."
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">
                Additional Information
              </label>
              <Textarea
                value={formData.additionalInfo}
                onChange={(e) => setFormData(prev => ({ ...prev, additionalInfo: e.target.value }))}
                className="bg-slate-800 border-slate-600 text-white"
                placeholder="Any additional details, inspiration, or specific requests..."
              />
            </div>

            {/* Contact Preference */}
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">
                Preferred Contact Method
              </label>
              <Select value={formData.contactPreference} onValueChange={(value) => setFormData(prev => ({ ...prev, contactPreference: value }))}>
                <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="phone">Phone Call</SelectItem>
                  <SelectItem value="whatsapp">WhatsApp</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-3 pt-4">
              {onClose && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="flex-1 border-slate-600 text-gray-300 hover:bg-slate-800"
                >
                  Cancel
                </Button>
              )}
              <Button
                type="submit"
                disabled={isSubmitting || !formData.name || !formData.email || !formData.serviceType || !formData.businessType || !formData.requirements}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Submitting...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    Submit Request
                  </div>
                )}
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </motion.div>
  );
};

export default SmartContactForm;
