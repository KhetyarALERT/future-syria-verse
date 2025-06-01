
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft, 
  CheckCircle, 
  Clock, 
  Sparkles, 
  Star, 
  Clipboard, 
  FileCheck,
  MessageSquare,
  ChevronRight,
  Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ServiceExamples from '@/components/ServiceExamples';

interface ServiceDetailPageProps {}

interface ServiceData {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  icon: React.ElementType;
  color: string;
  price: string;
  duration: string;
  features: string[];
  process: {
    title: string;
    description: string;
  }[];
  deliverables: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

const ServiceDetailPage: React.FC<ServiceDetailPageProps> = () => {
  const navigate = useNavigate();
  const { serviceId } = useParams<{ serviceId: string }>();
  const [service, setService] = useState<ServiceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showExamples, setShowExamples] = useState(false);
  
  useEffect(() => {
    // In a real application, fetch service details from API/database
    // For demo, we're using static data
    const fetchServiceData = () => {
      setLoading(true);
      
      // Mock service data - in real app this would come from an API
      const services = {
        'logo-design': {
          id: 'logo-design',
          title: 'Logo Design',
          description: 'Professional brand identity creation with unique, memorable designs.',
          longDescription: 'Our logo design service combines creativity with strategic thinking to create a visual identity that perfectly captures your brand essence. We use AI-powered tools to explore numerous design possibilities, ensuring your logo is not only beautiful but also meaningful and versatile across all platforms.',
          icon: Sparkles,
          color: 'from-pink-500 to-rose-500',
          price: 'Starting from $299',
          duration: '3-7 business days',
          features: [
            'Multiple unique concepts (3-5 initial designs)',
            'Unlimited revisions until perfect',
            'All file formats (AI, EPS, SVG, PNG, JPG)',
            'Brand guidelines documentation',
            'Social media profile kit',
            'Commercial usage rights',
            'Brand color palette',
            'Typography recommendations'
          ],
          process: [
            {
              title: 'Discovery & Research',
              description: 'We start by understanding your brand values, target audience, industry, and competitors to inform our design approach.'
            },
            {
              title: 'Concept Development',
              description: 'Our designers create multiple unique concept directions based on our research and your requirements.'
            },
            {
              title: 'Refinement',
              description: 'We collaborate with you to refine your chosen concept until it perfectly represents your brand.'
            },
            {
              title: 'Finalization',
              description: 'The approved design is prepared in all necessary formats with complete brand guidelines.'
            }
          ],
          deliverables: [
            'Vector source files (AI/EPS)',
            'Web-optimized files (SVG/PNG)',
            'High-resolution print files',
            'Social media profile images',
            'Brand style guide',
            'Color specifications (RGB, CMYK, HEX)',
            'Typography details',
            'Usage guidelines'
          ],
          faqs: [
            {
              question: 'How many logo concepts will I receive?',
              answer: 'You\'ll receive 3-5 unique initial concepts. After selecting your preferred direction, we\'ll refine until perfect.'
            },
            {
              question: 'What if I don\'t like any of the initial designs?',
              answer: 'We offer unlimited revisions and will create new concepts until you\'re completely satisfied with the direction.'
            },
            {
              question: 'Who owns the copyright to my logo?',
              answer: 'You do! Once the project is completed and paid for, you own full commercial rights to your logo design.'
            },
            {
              question: 'How quickly can I get my logo?',
              answer: 'Our standard timeline is 3-7 business days. We also offer expedited options if you need it sooner.'
            },
            {
              question: 'Can I make changes to my logo in the future?',
              answer: 'Yes! You\'ll receive all source files so you can make modifications, or we can help with future updates.'
            }
          ]
        },
        // Additional services would be defined here
      };
      
      setTimeout(() => {
        if (serviceId && services[serviceId as keyof typeof services]) {
          setService(services[serviceId as keyof typeof services]);
        } else {
          // Handle invalid service ID
          navigate('/services');
        }
        setLoading(false);
      }, 500);
    };
    
    fetchServiceData();
  }, [serviceId, navigate]);
  
  const handleGetQuote = () => {
    navigate('/inquiry', { state: { serviceType: serviceId } });
  };
  
  const handleViewExamples = () => {
    setShowExamples(true);
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-purple-500/20 border-b-purple-500 rounded-full animate-spin animate-reverse"></div>
          </div>
          <p className="text-white/70">Loading service details...</p>
        </div>
      </div>
    );
  }
  
  if (!service) return null;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-20">
        {/* Navigation */}
        <motion.button
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex items-center space-x-2 text-white mb-8 hover:text-blue-400 transition-colors"
          onClick={() => navigate('/services')}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Services</span>
        </motion.button>
        
        {/* Hero section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className={`inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/20`}>
              <service.icon className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-white">Professional Service</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
              {service.title}
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              {service.longDescription}
            </p>
            
            <div className="flex flex-wrap gap-5 mb-8">
              <div className="flex items-center space-x-2 text-gray-300">
                <Clock className="w-5 h-5 text-blue-400" />
                <span>{service.duration}</span>
              </div>
              
              <div className="flex items-center space-x-2 text-gray-300">
                <Star className="w-5 h-5 text-yellow-400" />
                <span>5-Star Rated</span>
              </div>
              
              <div className="flex items-center space-x-2 text-gray-300">
                <Clipboard className="w-5 h-5 text-green-400" />
                <span>Custom Solutions</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Button
                onClick={handleGetQuote}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Get a Quote
              </Button>
              
              <Button
                onClick={handleViewExamples}
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 px-6 py-3 text-lg"
              >
                <FileCheck className="w-5 h-5 mr-2" />
                View Examples
              </Button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8"
          >
            <h3 className="text-2xl font-semibold text-white mb-6">Key Features</h3>
            <ul className="space-y-4">
              {service.features.map((feature, index) => (
                <motion.li
                  key={index}
                  className="flex items-start space-x-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + (index * 0.1) }}
                >
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-200">{feature}</span>
                </motion.li>
              ))}
            </ul>
            
            <div className="mt-8 pt-8 border-t border-white/10">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-xl font-medium text-white">Investment</h4>
                <span className="text-2xl font-bold text-white">{service.price}</span>
              </div>
              <p className="text-gray-300 mb-6">
                Custom pricing based on specific project requirements. Contact us for a personalized quote.
              </p>
              <Button
                onClick={() => document.getElementById('chat-trigger')?.click()}
                className="w-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Chat with AI Consultant
              </Button>
            </div>
          </motion.div>
        </div>
        
        {/* Tabs section */}
        <Tabs defaultValue="process" className="mb-16">
          <TabsList className="bg-white/10 border border-white/20 mb-8 mx-auto">
            <TabsTrigger value="process" className="data-[state=active]:bg-white/20">Our Process</TabsTrigger>
            <TabsTrigger value="deliverables" className="data-[state=active]:bg-white/20">Deliverables</TabsTrigger>
            <TabsTrigger value="faq" className="data-[state=active]:bg-white/20">FAQ</TabsTrigger>
          </TabsList>
          
          <TabsContent value="process">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
              <h3 className="text-2xl font-semibold text-white mb-8">Our Process</h3>
              <div className="space-y-12">
                {service.process.map((step, index) => (
                  <motion.div
                    key={index}
                    className="relative pl-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <div className="absolute left-0 top-0 flex items-center justify-center w-12 h-12 rounded-full bg-white/10 border border-white/20">
                      <span className="text-white font-bold text-xl">{index + 1}</span>
                    </div>
                    <h4 className="text-xl font-medium text-white mb-2">{step.title}</h4>
                    <p className="text-gray-300">{step.description}</p>
                    
                    {index < service.process.length - 1 && (
                      <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-white/10 -mb-6"></div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="deliverables">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
              <h3 className="text-2xl font-semibold text-white mb-8">What You'll Receive</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {service.deliverables.map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex space-x-4 items-start"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">{item}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="faq">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
              <h3 className="text-2xl font-semibold text-white mb-8">Frequently Asked Questions</h3>
              <div className="space-y-6">
                {service.faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    className="p-6 bg-white/5 rounded-xl border border-white/10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <h4 className="text-xl font-medium text-white mb-3">{faq.question}</h4>
                    <p className="text-gray-300">{faq.answer}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 backdrop-blur-sm rounded-2xl border border-white/10 p-10 text-center"
        >
          <h3 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h3>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Transform your brand with our professional {service.title.toLowerCase()} service. Let's create something amazing together.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              onClick={handleGetQuote}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg"
            >
              Get a Personalized Quote
            </Button>
            <Button
              onClick={() => document.getElementById('chat-trigger')?.click()}
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 px-6 py-3 text-lg"
            >
              Chat with AI Consultant
            </Button>
          </div>
        </motion.div>
      </div>
      
      {/* Service Examples Modal */}
      {showExamples && (
        <ServiceExamples 
          serviceKey={service.id} 
          isOpen={showExamples} 
          onClose={() => setShowExamples(false)} 
          onGetQuote={handleGetQuote} 
        />
      )}
    </div>
  );
};

export default ServiceDetailPage;
