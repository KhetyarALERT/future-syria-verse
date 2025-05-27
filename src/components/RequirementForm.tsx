
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { ArrowUp, Send, User, Mail, Phone, Globe, DollarSign, Calendar } from 'lucide-react';

const RequirementForm: React.FC = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    budget: '',
    timeline: '',
    description: '',
    features: [] as string[],
    preferredContact: 'email'
  });

  const services = [
    'Logo Design',
    'Website Development', 
    'E-commerce Solutions',
    'AI Personal Assistants',
    'Work Automation',
    'Multiple Services'
  ];

  const budgetRanges = [
    'Under $100',
    '$100 - $500',
    '$500 - $1,000',
    '$1,000 - $5,000',
    '$5,000+',
    'Need consultation'
  ];

  const timelineOptions = [
    'ASAP (Rush)',
    '1-2 weeks',
    '2-4 weeks', 
    '1-2 months',
    '3+ months',
    'Flexible'
  ];

  const featureOptions = {
    'Logo Design': ['Multiple concepts', 'Vector files', 'Brand guidelines', 'Social media kit'],
    'Website Development': ['Responsive design', 'SEO optimization', 'Content management', 'E-commerce integration'],
    'E-commerce Solutions': ['Payment gateway', 'Inventory management', 'Mobile app', 'Analytics dashboard'],
    'AI Personal Assistants': ['Natural language processing', 'Multi-platform support', 'Custom training', 'Analytics'],
    'Work Automation': ['Process automation', 'API integration', 'Custom dashboard', 'Reporting tools']
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate form submission - in real app, this would send to Supabase
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Requirements Submitted! 🎉",
        description: "We'll contact you within 24 hours with a detailed proposal.",
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        budget: '',
        timeline: '',
        description: '',
        features: [],
        preferredContact: 'email'
      });

      console.log('Form submitted:', formData);
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Please try again or contact us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFeatureToggle = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const currentFeatures = formData.service ? featureOptions[formData.service as keyof typeof featureOptions] || [] : [];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20 dark:border-slate-700/50">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
            Tell Us About Your Project
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Share your requirements and we'll provide a custom quote within 24 hours
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                <User className="inline w-4 h-4 mr-1" />
                Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white/50 dark:bg-slate-700/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Your full name"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                <Mail className="inline w-4 h-4 mr-1" />
                Email Address *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white/50 dark:bg-slate-700/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="your@email.com"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                <Phone className="inline w-4 h-4 mr-1" />
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white/50 dark:bg-slate-700/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                <Globe className="inline w-4 h-4 mr-1" />
                Company/Organization
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white/50 dark:bg-slate-700/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Your company name"
              />
            </div>
          </div>

          {/* Service Selection */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Service Needed *
            </label>
            <select
              required
              value={formData.service}
              onChange={(e) => setFormData(prev => ({ ...prev, service: e.target.value, features: [] }))}
              className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white/50 dark:bg-slate-700/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="">Select a service</option>
              {services.map(service => (
                <option key={service} value={service}>{service}</option>
              ))}
            </select>
          </div>

          {/* Features Selection */}
          {currentFeatures.length > 0 && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Desired Features
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {currentFeatures.map(feature => (
                  <label key={feature} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.features.includes(feature)}
                      onChange={() => handleFeatureToggle(feature)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Budget and Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                <DollarSign className="inline w-4 h-4 mr-1" />
                Budget Range
              </label>
              <select
                value={formData.budget}
                onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white/50 dark:bg-slate-700/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="">Select budget range</option>
                {budgetRanges.map(range => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                <Calendar className="inline w-4 h-4 mr-1" />
                Timeline
              </label>
              <select
                value={formData.timeline}
                onChange={(e) => setFormData(prev => ({ ...prev, timeline: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white/50 dark:bg-slate-700/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="">Select timeline</option>
                {timelineOptions.map(timeline => (
                  <option key={timeline} value={timeline}>{timeline}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Project Description */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Project Description *
            </label>
            <textarea
              required
              rows={5}
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white/50 dark:bg-slate-700/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
              placeholder="Describe your project in detail. Include your goals, target audience, specific requirements, and any inspiration or examples you have in mind."
            />
          </div>

          {/* Preferred Contact Method */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Preferred Contact Method
            </label>
            <div className="flex gap-4">
              {['email', 'phone', 'whatsapp'].map(method => (
                <label key={method} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="preferredContact"
                    value={method}
                    checked={formData.preferredContact === method}
                    onChange={(e) => setFormData(prev => ({ ...prev, preferredContact: e.target.value }))}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">{method}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full group flex items-center justify-center gap-2 py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:scale-100 shadow-lg hover:shadow-xl"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  Submit Requirements
                </>
              )}
            </button>
          </div>

          {/* Contact Info */}
          <div className="text-center pt-4 border-t border-gray-200 dark:border-slate-600">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Need immediate assistance? Contact us directly:
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-2 text-sm">
              <a href="mailto:hello@digitalsolutions.com" className="text-blue-600 dark:text-blue-400 hover:underline">
                hello@digitalsolutions.com
              </a>
              <a href="tel:+1234567890" className="text-blue-600 dark:text-blue-400 hover:underline">
                +1 (234) 567-890
              </a>
              <span className="text-gray-500">🇸🇾 Syrian clients welcome</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequirementForm;
