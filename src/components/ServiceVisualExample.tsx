
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  Palette, Package, Star, TrendingUp, Share2, Headphones, 
  Globe, Bot, Building2, CheckCircle, ArrowRight, Zap,
  BarChart3, Users, Clock, Target, Award, Sparkles
} from 'lucide-react';

interface ServiceVisualExampleProps {
  serviceKey: string;
}

const ServiceVisualExample: React.FC<ServiceVisualExampleProps> = ({ serviceKey }) => {
  const { t, i18n } = useTranslation();
  const [currentStep, setCurrentStep] = useState(0);

  const serviceVisuals = {
    logoDesign: {
      icon: Palette,
      gradient: 'from-purple-500 to-pink-500',
      background: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop',
      process: [
        { step: 'Brief Analysis', duration: '1 day', icon: Target },
        { step: 'Concept Creation', duration: '2 days', icon: Sparkles },
        { step: 'Design Refinement', duration: '1 day', icon: Palette },
        { step: 'Final Delivery', duration: '1 day', icon: Award }
      ],
      outcomes: [
        { metric: 'Brand Recognition', value: 85, unit: '%' },
        { metric: 'Client Satisfaction', value: 95, unit: '%' },
        { metric: 'Design Revisions', value: 2, unit: 'avg' },
        { metric: 'Delivery Speed', value: 5, unit: 'days' }
      ],
      deliverables: [
        'Vector logo files (AI, EPS, SVG)',
        'High-resolution PNG/JPG files',
        'Brand color palette',
        'Typography guidelines',
        'Usage instructions'
      ]
    },
    productPackaging: {
      icon: Package,
      gradient: 'from-blue-500 to-cyan-500',
      background: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&h=400&fit=crop',
      process: [
        { step: 'Product Research', duration: '2 days', icon: Target },
        { step: 'Design Concepts', duration: '3 days', icon: Package },
        { step: '3D Mockups', duration: '2 days', icon: Sparkles },
        { step: 'Print-Ready Files', duration: '1 day', icon: Award }
      ],
      outcomes: [
        { metric: 'Shelf Appeal', value: 90, unit: '%' },
        { metric: 'Sales Increase', value: 35, unit: '%' },
        { metric: 'Customer Engagement', value: 78, unit: '%' },
        { metric: 'Production Time', value: 8, unit: 'days' }
      ],
      deliverables: [
        '3D packaging mockups',
        'Print-ready design files',
        'Material specifications',
        'Color matching guides',
        'Production templates'
      ]
    },
    branding: {
      icon: Star,
      gradient: 'from-yellow-500 to-orange-500',
      background: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop',
      process: [
        { step: 'Brand Strategy', duration: '3 days', icon: Target },
        { step: 'Visual Identity', duration: '5 days', icon: Star },
        { step: 'Brand Guidelines', duration: '2 days', icon: Sparkles },
        { step: 'Implementation', duration: '3 days', icon: Award }
      ],
      outcomes: [
        { metric: 'Brand Consistency', value: 92, unit: '%' },
        { metric: 'Market Recognition', value: 68, unit: '%' },
        { metric: 'Customer Trust', value: 85, unit: '%' },
        { metric: 'Delivery Time', value: 13, unit: 'days' }
      ],
      deliverables: [
        'Complete brand identity system',
        'Logo variations and usage',
        'Color and typography guide',
        'Business card templates',
        'Social media templates'
      ]
    },
    marketing: {
      icon: TrendingUp,
      gradient: 'from-green-500 to-emerald-500',
      background: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
      process: [
        { step: 'Market Analysis', duration: '2 days', icon: BarChart3 },
        { step: 'Strategy Development', duration: '3 days', icon: Target },
        { step: 'Campaign Creation', duration: '4 days', icon: TrendingUp },
        { step: 'Performance Tracking', duration: 'Ongoing', icon: Award }
      ],
      outcomes: [
        { metric: 'Lead Generation', value: 150, unit: '%' },
        { metric: 'Conversion Rate', value: 12, unit: '%' },
        { metric: 'ROI Improvement', value: 280, unit: '%' },
        { metric: 'Campaign Setup', value: 9, unit: 'days' }
      ],
      deliverables: [
        'Marketing strategy document',
        'Campaign creatives and copy',
        'Performance dashboard',
        'A/B testing results',
        'Monthly optimization reports'
      ]
    },
    socialMedia: {
      icon: Share2,
      gradient: 'from-pink-500 to-rose-500',
      background: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=400&fit=crop',
      process: [
        { step: 'Content Strategy', duration: '2 days', icon: Target },
        { step: 'Content Creation', duration: '5 days', icon: Share2 },
        { step: 'Community Setup', duration: '2 days', icon: Users },
        { step: 'Growth Tracking', duration: 'Ongoing', icon: Award }
      ],
      outcomes: [
        { metric: 'Follower Growth', value: 185, unit: '%' },
        { metric: 'Engagement Rate', value: 8.5, unit: '%' },
        { metric: 'Reach Increase', value: 220, unit: '%' },
        { metric: 'Setup Time', value: 9, unit: 'days' }
      ],
      deliverables: [
        'Content calendar template',
        'Branded post templates',
        'Hashtag strategy guide',
        'Community guidelines',
        'Analytics dashboard'
      ]
    },
    smartCX: {
      icon: Headphones,
      gradient: 'from-indigo-500 to-purple-500',
      background: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=400&fit=crop',
      process: [
        { step: 'CX Assessment', duration: '2 days', icon: Target },
        { step: 'System Integration', duration: '4 days', icon: Headphones },
        { step: 'AI Training', duration: '3 days', icon: Bot },
        { step: 'Live Deployment', duration: '1 day', icon: Award }
      ],
      outcomes: [
        { metric: 'Response Time', value: 85, unit: '%' },
        { metric: 'Customer Satisfaction', value: 94, unit: '%' },
        { metric: 'Issue Resolution', value: 78, unit: '%' },
        { metric: 'Implementation', value: 10, unit: 'days' }
      ],
      deliverables: [
        'AI chatbot system',
        'Knowledge base setup',
        'Multi-channel integration',
        'Analytics dashboard',
        'Training documentation'
      ]
    },
    webDevelopment: {
      icon: Globe,
      gradient: 'from-cyan-500 to-blue-500',
      background: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=400&fit=crop',
      process: [
        { step: 'Requirements Analysis', duration: '2 days', icon: Target },
        { step: 'Design & Development', duration: '7 days', icon: Globe },
        { step: 'Testing & QA', duration: '2 days', icon: CheckCircle },
        { step: 'Launch & Optimization', duration: '1 day', icon: Award }
      ],
      outcomes: [
        { metric: 'Page Speed', value: 95, unit: 'score' },
        { metric: 'Mobile Responsiveness', value: 100, unit: '%' },
        { metric: 'SEO Score', value: 88, unit: 'points' },
        { metric: 'Development Time', value: 12, unit: 'days' }
      ],
      deliverables: [
        'Responsive website',
        'Admin dashboard',
        'SEO optimization',
        'Performance analytics',
        'Maintenance guide'
      ]
    },
    personalAssistant: {
      icon: Bot,
      gradient: 'from-violet-500 to-purple-500',
      background: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop',
      process: [
        { step: 'AI Training Setup', duration: '2 days', icon: Bot },
        { step: 'Custom Programming', duration: '4 days', icon: Zap },
        { step: 'Integration Testing', duration: '2 days', icon: CheckCircle },
        { step: 'Deployment', duration: '1 day', icon: Award }
      ],
      outcomes: [
        { metric: 'Task Automation', value: 90, unit: '%' },
        { metric: 'Response Accuracy', value: 96, unit: '%' },
        { metric: 'Time Savings', value: 60, unit: '%' },
        { metric: 'Setup Time', value: 9, unit: 'days' }
      ],
      deliverables: [
        'Custom AI assistant',
        'Voice/text interface',
        'Task automation system',
        'Learning algorithms',
        'Integration APIs'
      ]
    },
    erp: {
      icon: Building2,
      gradient: 'from-slate-500 to-gray-500',
      background: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=400&fit=crop',
      process: [
        { step: 'System Analysis', duration: '3 days', icon: Target },
        { step: 'Custom Development', duration: '10 days', icon: Building2 },
        { step: 'Data Migration', duration: '3 days', icon: Zap },
        { step: 'Training & Launch', duration: '2 days', icon: Award }
      ],
      outcomes: [
        { metric: 'Process Efficiency', value: 75, unit: '%' },
        { metric: 'Data Accuracy', value: 98, unit: '%' },
        { metric: 'Cost Reduction', value: 45, unit: '%' },
        { metric: 'Implementation', value: 18, unit: 'days' }
      ],
      deliverables: [
        'Complete ERP system',
        'Custom modules',
        'Data migration tools',
        'User training program',
        'Support documentation'
      ]
    }
  };

  const service = serviceVisuals[serviceKey as keyof typeof serviceVisuals];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % service.process.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [service.process.length]);

  if (!service) return null;

  const Icon = service.icon;

  return (
    <div className="space-y-8">
      {/* Hero Section with Background */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-slate-100 to-blue-50 border-2 border-blue-200"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${service.background})` }}
        />
        
        <div className="relative p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.gradient} flex items-center justify-center`}>
              <Icon className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800">
                {t(`services.${serviceKey}.title`)}
              </h3>
              <p className="text-gray-600">Professional Service Delivery</p>
            </div>
          </div>

          {/* Animated Process Timeline */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {service.process.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = currentStep === index;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0.5, scale: 0.9 }}
                  animate={{ 
                    opacity: isActive ? 1 : 0.7, 
                    scale: isActive ? 1.05 : 1,
                    y: isActive ? -4 : 0
                  }}
                  className={`text-center p-4 rounded-xl border-2 transition-all duration-300 ${
                    isActive 
                      ? `bg-gradient-to-r ${service.gradient} text-white border-transparent shadow-lg` 
                      : 'bg-white border-gray-200 text-gray-700'
                  }`}
                >
                  <motion.div
                    animate={{ rotate: isActive ? 360 : 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-2"
                  >
                    <StepIcon className={`w-6 h-6 mx-auto ${isActive ? 'text-white' : 'text-gray-500'}`} />
                  </motion.div>
                  <h4 className="font-semibold text-sm mb-1">{step.step}</h4>
                  <p className={`text-xs ${isActive ? 'text-white/90' : 'text-gray-500'}`}>
                    {step.duration}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Progress Bar */}
          <div className="relative mb-6">
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className={`h-full bg-gradient-to-r ${service.gradient} rounded-full`}
                initial={{ width: 0 }}
                animate={{ width: `${((currentStep + 1) / service.process.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-xs text-gray-500">Start</span>
              <span className="text-xs text-gray-500">Delivery</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Outcomes Graph */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-xl p-6 border shadow-sm"
      >
        <div className="flex items-center gap-2 mb-6">
          <BarChart3 className="w-5 h-5 text-blue-600" />
          <h4 className="text-lg font-semibold text-gray-800">Expected Outcomes</h4>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {service.outcomes.map((outcome, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index }}
              className="text-center p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 * index, type: "spring", stiffness: 200 }}
                className="text-2xl font-bold text-blue-600 mb-1"
              >
                {outcome.value}
                <span className="text-sm text-gray-500 ml-1">{outcome.unit}</span>
              </motion.div>
              <p className="text-sm text-gray-600">{outcome.metric}</p>
              
              {/* Visual progress bar for percentages */}
              {outcome.unit === '%' && (
                <div className="mt-2 w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(outcome.value, 100)}%` }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 1 }}
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Deliverables */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-xl p-6 border shadow-sm"
      >
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <h4 className="text-lg font-semibold text-gray-800">What You'll Receive</h4>
        </div>
        
        <div className="space-y-3">
          {service.deliverables.map((deliverable, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200"
            >
              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
              <span className="text-sm text-gray-700">{deliverable}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border-2 border-blue-200 text-center"
      >
        <h4 className="text-lg font-semibold text-gray-800 mb-2">Ready to Get Started?</h4>
        <p className="text-gray-600 mb-4">
          Experience professional {t(`services.${serviceKey}.title`).toLowerCase()} delivery with measurable results
        </p>
        <div className="flex items-center justify-center gap-2 text-blue-600">
          <Clock className="w-4 h-4" />
          <span className="text-sm font-medium">
            Average delivery: {service.process.reduce((total, step) => {
              const days = parseInt(step.duration.split(' ')[0]) || 0;
              return total + days;
            }, 0)} days
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default ServiceVisualExample;
