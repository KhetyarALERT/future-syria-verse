
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, User, Mail, Phone, MessageSquare, Calendar, DollarSign, X } from 'lucide-react';
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

interface FormErrors {
  name?: string;
  email?: string;
  serviceType?: string;
  businessType?: string;
  requirements?: string;
}

const SmartContactForm: React.FC<SmartContactFormProps> = ({ prefilledData, onClose }) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
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

  const validateForm = () => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.serviceType) {
      newErrors.serviceType = 'Please select a service';
    }
    
    if (!formData.businessType.trim()) {
      newErrors.businessType = 'Business type is required';
    }
    
    if (!formData.requirements.trim()) {
      newErrors.requirements = 'Please describe your requirements';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Please fix the errors",
        description: "Fill in all required fields marked in red.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Create inquiry with proper metadata structure
      const { data, error } = await supabase
        .from('inquiries')
        .insert({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          inquiry_type: 'service_inquiry',
          inquiry_text: `Project Requirements: ${formData.requirements}${formData.additionalInfo ? '\n\nAdditional Information: ' + formData.additionalInfo : ''}`,
          language: 'en',
          preferred_contact_method: formData.contactPreference,
          metadata: {
            source: 'smart_contact_form',
            service_type: formData.serviceType,
            budget_range: formData.budget,
            timeline: formData.timeline,
            business_type: formData.businessType,
            contact_preference: formData.contactPreference,
            submission_timestamp: new Date().toISOString()
          }
        })
        .select()
        .single();

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      console.log('Form submitted successfully:', data);

      toast({
        title: "Request Submitted Successfully! 🎉",
        description: "Our team will contact you within 24 hours with a customized proposal.",
      });

      // Reset form and close modal
      setFormData({
        name: '',
        email: '',
        phone: '',
        serviceType: '',
        businessType: '',
        budget: '',
        timeline: '',
        requirements: '',
        additionalInfo: '',
        contactPreference: 'email'
      });
      
      if (onClose) {
        setTimeout(() => onClose(), 1500);
      }

    } catch (error: any) {
      console.error('Error submitting form:', error);
      toast({
        title: "Submission Error",
        description: error.message || "Please try again or contact us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFieldClassName = (fieldName: keyof FormErrors, baseClassName: string) => {
    return `${baseClassName} ${errors[fieldName] ? 'border-red-500 focus:border-red-500' : 'border-slate-600 focus:border-blue-500'}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
    >
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-900 border-blue-500/20">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Tell Us About Your Project</h2>
              <p className="text-gray-300">Help us understand your needs so we can provide the perfect solution.</p>
            </div>
            {onClose && (
              <Button
                onClick={onClose}
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </Button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                  <User className="w-4 h-4" />
                  Full Name *
                </label>
                <Input
                  value={formData.name}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, name: e.target.value }));
                    if (errors.name) setErrors(prev => ({ ...prev, name: undefined }));
                  }}
                  required
                  className={getFieldClassName('name', 'bg-slate-800 text-white')}
                  placeholder="Your full name"
                />
                {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                  <Mail className="w-4 h-4" />
                  Email Address *
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, email: e.target.value }));
                    if (errors.email) setErrors(prev => ({ ...prev, email: undefined }));
                  }}
                  required
                  className={getFieldClassName('email', 'bg-slate-800 text-white')}
                  placeholder="your@email.com"
                />
                {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <Select 
                  value={formData.serviceType} 
                  onValueChange={(value) => {
                    setFormData(prev => ({ ...prev, serviceType: value }));
                    if (errors.serviceType) setErrors(prev => ({ ...prev, serviceType: undefined }));
                  }}
                >
                  <SelectTrigger className={getFieldClassName('serviceType', 'bg-slate-800 text-white')}>
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
                {errors.serviceType && <p className="text-red-400 text-sm mt-1">{errors.serviceType}</p>}
              </div>
            </div>

            {/* Project Details */}
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">
                Business/Project Type *
              </label>
              <Input
                value={formData.businessType}
                onChange={(e) => {
                  setFormData(prev => ({ ...prev, businessType: e.target.value }));
                  if (errors.businessType) setErrors(prev => ({ ...prev, businessType: undefined }));
                }}
                required
                className={getFieldClassName('businessType', 'bg-slate-800 text-white')}
                placeholder="e.g., Restaurant, E-commerce, Clinic, Startup..."
              />
              {errors.businessType && <p className="text-red-400 text-sm mt-1">{errors.businessType}</p>}
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
                onChange={(e) => {
                  setFormData(prev => ({ ...prev, requirements: e.target.value }));
                  if (errors.requirements) setErrors(prev => ({ ...prev, requirements: undefined }));
                }}
                required
                className={getFieldClassName('requirements', 'bg-slate-800 text-white min-h-[100px]')}
                placeholder="Describe what you need in detail..."
              />
              {errors.requirements && <p className="text-red-400 text-sm mt-1">{errors.requirements}</p>}
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

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
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
