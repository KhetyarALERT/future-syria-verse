
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Palette, 
  Code, 
  ShoppingCart, 
  MessageSquare, 
  TrendingUp, 
  Star,
  Clock,
  CheckCircle,
  Zap,
  Users,
  MessageCircle,
  BarChart3,
  Bell,
  Wrench
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import ServiceExamples from '@/components/ServiceExamples';

const ServicesPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [showExamples, setShowExamples] = useState(false);

  const services = [
    {
      id: 'logo-design',
      icon: Palette,
      title: 'Logo Design',
      description: 'Professional brand identity creation with unique, memorable designs that capture your brand essence.',
      color: 'from-pink-500 to-rose-500',
      duration: '3-7 days',
      features: [
        'Multiple unique concepts',
        'Unlimited revisions',
        'Vector files (AI, EPS, SVG)',
        'Brand guidelines',
        'Social media variations',
        'Commercial usage rights'
      ],
      examples: [
        'Tech startup minimalist logo',
        'Restaurant vintage-style logo',
        'Fitness brand dynamic logo',
        'E-commerce modern logo'
      ]
    },
    {
      id: 'web-development',
      icon: Code,
      title: 'Web Development',
      description: 'Modern, responsive websites built with cutting-edge technology for optimal performance.',
      color: 'from-blue-500 to-cyan-500',
      duration: '2-6 weeks',
      features: [
        'Responsive design',
        'SEO optimization',
        'Fast loading speeds',
        'Content management system',
        'Analytics integration',
        'Security features'
      ],
      examples: [
        'Corporate business website',
        'Portfolio showcase site',
        'Landing page conversion',
        'Multi-language website'
      ]
    },
    {
      id: 'ecommerce',
      icon: ShoppingCart,
      title: 'E-commerce Solutions',
      description: 'Complete online store solutions with payment processing and inventory management.',
      color: 'from-green-500 to-emerald-500',
      duration: '3-8 weeks',
      features: [
        'Product catalog management',
        'Payment gateway integration',
        'Inventory tracking',
        'Order management',
        'Customer accounts',
        'Analytics dashboard'
      ],
      examples: [
        'Fashion boutique store',
        'Electronics marketplace',
        'Food delivery platform',
        'Digital products store'
      ]
    },
    {
      id: 'ai-assistants',
      icon: MessageSquare,
      title: 'AI Assistants',
      description: 'Intelligent chatbots and virtual assistants powered by advanced AI technology.',
      color: 'from-purple-500 to-violet-500',
      duration: '2-4 weeks',
      features: [
        'Natural language processing',
        'Multi-platform integration',
        'Custom training',
        '24/7 availability',
        'Analytics dashboard',
        'Human handoff'
      ],
      examples: [
        'Customer support chatbot',
        'Sales qualification assistant',
        'FAQ automation bot',
        'Appointment booking assistant'
      ]
    },
    {
      id: 'digital-marketing',
      icon: TrendingUp,
      title: 'Digital Marketing',
      description: 'Comprehensive digital marketing strategies including social media and SEO.',
      color: 'from-orange-500 to-amber-500',
      duration: 'Ongoing',
      features: [
        'Social media management',
        'SEO optimization',
        'Paid advertising campaigns',
        'Content creation',
        'Performance analytics',
        'Monthly reporting'
      ],
      examples: [
        'SaaS company growth campaign',
        'Local business visibility boost',
        'E-commerce sales funnel',
        'Brand awareness campaign'
      ]
    },
    {
      id: 'crm',
      icon: Users,
      title: 'CRM Systems',
      description: 'Customer relationship management solutions to optimize your business relationships.',
      color: 'from-indigo-500 to-blue-500',
      duration: '2-5 weeks',
      features: [
        'Contact management',
        'Sales pipeline tracking',
        'Email integration',
        'Analytics dashboard',
        'Workflow automation',
        'Team collaboration'
      ],
      examples: [
        'Sales team CRM setup',
        'Customer service integration',
        'Marketing automation',
        'Lead management system'
      ]
    },
    {
      id: 'ai-customer-support',
      icon: MessageCircle,
      title: 'AI Customer Support',
      description: 'Human-like AI customer service that provides personalized assistance 24/7.',
      color: 'from-cyan-500 to-teal-500',
      duration: '2-4 weeks',
      features: [
        'Human-like conversations',
        'Multi-language support',
        'Omnichannel integration',
        'Context awareness',
        'Instant responses',
        'Advanced analytics'
      ],
      examples: [
        'E-commerce support bot',
        'Technical support assistant',
        'Booking and reservations',
        'Product recommendation engine'
      ]
    },
    {
      id: 'trading-assistant',
      icon: BarChart3,
      title: 'Trading Assistant',
      description: 'AI-powered trading intelligence with market analysis and automated strategies.',
      color: 'from-emerald-500 to-green-500',
      duration: '3-6 weeks',
      features: [
        'Market analysis',
        'Trading signals',
        'Risk management',
        'Portfolio tracking',
        'Smart alerts',
        'Performance analytics'
      ],
      examples: [
        'Crypto trading bot',
        'Stock market analyzer',
        'Risk assessment tool',
        'Portfolio optimizer'
      ]
    },
    {
      id: 'reminder',
      icon: Bell,
      title: 'Smart Reminder System',
      description: 'Intelligent task and event management that learns your patterns and priorities.',
      color: 'from-amber-500 to-yellow-500',
      duration: '1-3 weeks',
      features: [
        'Smart scheduling',
        'Priority system',
        'Multi-platform sync',
        'Recurring tasks',
        'Analytics insights',
        'Team collaboration'
      ],
      examples: [
        'Personal productivity app',
        'Team task management',
        'Meeting scheduler',
        'Project deadline tracker'
      ]
    },
    {
      id: 'customized-service',
      icon: Wrench,
      title: 'Customized Services',
      description: 'Tailored solutions built specifically for your unique business requirements.',
      color: 'from-violet-500 to-purple-500',
      duration: 'Variable',
      features: [
        'Custom design',
        'Bespoke development',
        'API integration',
        'Cross-platform solutions',
        'Ongoing support',
        'Full customization'
      ],
      examples: [
        'Custom business software',
        'Specialized automation tools',
        'Industry-specific solutions',
        'Enterprise integrations'
      ]
    },
  ];

  const handleViewExamples = (serviceId: string) => {
    setSelectedService(serviceId);
    setShowExamples(true);
  };

  const handleCloseExamples = () => {
    setShowExamples(false);
  };

  const handleGetQuote = () => {
    setShowExamples(false);
    navigate('/inquiry', { state: { serviceType: selectedService } });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-20 pb-20">
      <div className="container mx-auto px-4">
        <motion.button
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex items-center space-x-2 text-white mb-8 hover:text-blue-400 transition-colors"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Our Premium Services
          </h1>
          <p className="text-xl text-gray-300">
            Cutting-edge digital solutions tailored to transform your business with AI-powered innovation.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              className="bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300"
            >
              <div className={`bg-gradient-to-r ${service.color} p-6`}>
                <service.icon className="w-12 h-12 text-white mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">{service.title}</h3>
                <p className="text-white/80">{service.description}</p>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="text-gray-300 text-sm flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{service.duration}</span>
                  </div>
                  <div className="text-white font-semibold">Contact for Quote</div>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-white text-lg mb-3 font-medium">Key Features</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-2 text-gray-300 text-sm">
                        <CheckCircle className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex flex-col space-y-3">
                  <Button
                    onClick={() => handleViewExamples(service.id)}
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10 transition-colors"
                  >
                    <Star className="w-4 h-4 mr-2" />
                    View Examples
                  </Button>
                  <Button
                    onClick={() => navigate('/inquiry', { state: { serviceType: service.id } })}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Get Quote
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {showExamples && selectedService && (
        <ServiceExamples 
          serviceKey={selectedService} 
          isOpen={showExamples} 
          onClose={handleCloseExamples} 
          onGetQuote={handleGetQuote} 
        />
      )}
    </div>
  );
};

export default ServicesPage;
