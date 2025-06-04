
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import PersonalInfoFields from './smartForm/PersonalInfoFields';
import ProjectDetailsFields from './smartForm/ProjectDetailsFields';
import { FormData, FormErrors, validateForm } from './smartForm/formValidation';
import { submitForm, getInitialFormData } from './smartForm/formSubmission';

interface SmartContactFormProps {
  prefilledData?: any;
  onClose?: () => void;
}

const SmartContactForm: React.FC<SmartContactFormProps> = ({ prefilledData, onClose }) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState<FormData>(getInitialFormData(prefilledData));

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleErrorClear = (field: keyof FormErrors) => {
    setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast({
        title: "Please fix the errors",
        description: "Fill in all required fields marked in red.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await submitForm(formData);

      toast({
        title: "Request Submitted Successfully! 🎉",
        description: "Our team will contact you within 24 hours with a customized proposal.",
      });

      // Reset form and close modal
      setFormData(getInitialFormData());
      
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
            <PersonalInfoFields 
              formData={formData}
              errors={errors}
              onInputChange={handleInputChange}
              onErrorClear={handleErrorClear}
            />

            {/* Project Details */}
            <ProjectDetailsFields 
              formData={formData}
              errors={errors}
              onInputChange={handleInputChange}
              onErrorClear={handleErrorClear}
            />

            {/* Contact Preference */}
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">
                Preferred Contact Method
              </label>
              <Select value={formData.contactPreference} onValueChange={(value) => handleInputChange('contactPreference', value)}>
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
