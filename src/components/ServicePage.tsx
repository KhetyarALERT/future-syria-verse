
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, Star, Clock, Shield, Dollar } from 'lucide-react';

interface ServicePageProps {
  service: string;
}

const ServicePage: React.FC<ServicePageProps> = ({ service }) => {
  const serviceData = {
    'logo-design': {
      title: 'Logo Design',
      subtitle: 'AI-Powered Brand Identity Creation',
      description: 'Transform your brand with stunning, AI-generated logos that capture your business essence. Our advanced design process combines artificial intelligence with human creativity.',
      price: '$50 - $200',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=500&fit=crop',
      gradient: 'from-pink-500 to-rose-500',
      features: [
        { icon: '🎨', title: 'AI Generation', description: 'Advanced AI creates unique concepts' },
        { icon: '📁', title: 'Vector Files', description: 'High-quality scalable formats' },
        { icon: '⚡', title: '24h Delivery', description: 'Fast turnaround guaranteed' },
        { icon: '🔄', title: 'Unlimited Revisions', description: 'Perfect your design' },
        { icon: '🎯', title: 'Brand Guidelines', description: 'Complete brand package' }
      ],
      process: [
        'Submit your requirements and brand preferences',
        'AI generates multiple logo concepts',
        'Review and select your favorite designs',
        'Receive final files in all formats',
        'Get brand guidelines and usage tips'
      ],
      packages: [
        { name: 'Basic', price: '$50', features: ['3 AI-generated concepts', 'PNG & JPG files', '24h delivery'] },
        { name: 'Standard', price: '$100', features: ['5 concepts', 'Vector files', 'Brand colors', '12h delivery'] },
        { name: 'Premium', price: '$200', features: ['Unlimited concepts', 'Complete brand kit', 'Rush delivery', 'Brand guidelines'] }
      ]
    },
    'website-development': {
      title: 'Website Development',
      subtitle: 'Modern, Responsive Web Solutions',
      description: 'Build powerful, fast-loading websites that convert visitors into customers. Our development process focuses on performance, SEO, and user experience.',
      price: '$200 - $1000',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=500&fit=crop',
      gradient: 'from-blue-500 to-cyan-500',
      features: [
        { icon: '📱', title: 'Responsive Design', description: 'Perfect on all devices' },
        { icon: '🚀', title: 'SEO Optimized', description: 'Built for search engines' },
        { icon: '⚡', title: 'Fast Loading', description: 'Optimized performance' },
        { icon: '🔧', title: 'Easy Management', description: 'User-friendly admin panel' },
        { icon: '🔒', title: 'Secure', description: 'Built with security in mind' }
      ],
      process: [
        'Discovery and planning session',
        'Design mockups and wireframes',
        'Development and testing',
        'Content management setup',
        'Launch and optimization'
      ],
      packages: [
        { name: 'Landing Page', price: '$200', features: ['Single page', 'Contact form', 'Mobile responsive'] },
        { name: 'Business Site', price: '$500', features: ['5-10 pages', 'CMS integration', 'SEO setup'] },
        { name: 'Custom Solution', price: '$1000', features: ['Unlimited pages', 'Custom features', 'Advanced integrations'] }
      ]
    },
    'ecommerce': {
      title: 'E-commerce Solutions',
      subtitle: 'Complete Online Store Development',
      description: 'Launch your online business with a feature-rich e-commerce platform. From product catalogs to payment processing, we handle everything.',
      price: '$500 - $2000',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=500&fit=crop',
      gradient: 'from-green-500 to-emerald-500',
      features: [
        { icon: '💳', title: 'Payment Gateway', description: 'Secure payment processing' },
        { icon: '📦', title: 'Inventory Management', description: 'Track products and stock' },
        { icon: '📊', title: 'Analytics Dashboard', description: 'Sales and performance metrics' },
        { icon: '🛒', title: 'Shopping Cart', description: 'Smooth checkout experience' },
        { icon: '📱', title: 'Mobile App', description: 'Native mobile application' }
      ],
      process: [
        'Business requirements analysis',
        'Platform selection and setup',
        'Product catalog creation',
        'Payment and shipping integration',
        'Testing and launch'
      ],
      packages: [
        { name: 'Starter Store', price: '$500', features: ['50 products', 'Basic payments', 'Mobile responsive'] },
        { name: 'Professional', price: '$1000', features: ['Unlimited products', 'Advanced features', 'Marketing tools'] },
        { name: 'Enterprise', price: '$2000', features: ['Custom development', 'API integrations', 'Mobile app'] }
      ]
    },
    'ai-assistants': {
      title: 'AI Personal Assistants',
      subtitle: 'Intelligent Customer Support Solutions',
      description: 'Deploy AI-powered chatbots and virtual assistants that provide 24/7 customer support, answer questions, and automate routine tasks.',
      price: '$10 - $50/month',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=500&fit=crop',
      gradient: 'from-purple-500 to-violet-500',
      features: [
        { icon: '🤖', title: 'Natural Language', description: 'Human-like conversations' },
        { icon: '🌍', title: '24/7 Support', description: 'Always available assistance' },
        { icon: '🧠', title: 'Custom Training', description: 'Trained on your business data' },
        { icon: '📱', title: 'Multi-platform', description: 'Website, mobile, social media' },
        { icon: '📈', title: 'Analytics', description: 'Conversation insights' }
      ],
      process: [
        'Define assistant capabilities and scope',
        'Train AI on your business knowledge',
        'Design conversation flows',
        'Integration and testing',
        'Launch and monitoring'
      ],
      packages: [
        { name: 'Basic Bot', price: '$10/month', features: ['FAQ responses', 'Basic integration', '100 conversations'] },
        { name: 'Smart Assistant', price: '$25/month', features: ['Advanced AI', 'Multiple channels', '1000 conversations'] },
        { name: 'Enterprise AI', price: '$50/month', features: ['Custom training', 'Unlimited usage', 'Advanced analytics'] }
      ]
    },
    'automation': {
      title: 'Work Automation',
      subtitle: 'Streamline Your Business Processes',
      description: 'Automate repetitive tasks, integrate systems, and create efficient workflows that save time and reduce errors in your business operations.',
      price: 'Custom Quote',
      image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&h=500&fit=crop',
      gradient: 'from-orange-500 to-red-500',
      features: [
        { icon: '⚙️', title: 'Process Automation', description: 'Automate routine workflows' },
        { icon: '🔗', title: 'System Integration', description: 'Connect different platforms' },
        { icon: '🔧', title: 'API Development', description: 'Custom API solutions' },
        { icon: '📋', title: 'Workflow Design', description: 'Optimize business processes' },
        { icon: '📊', title: 'Reporting', description: 'Automated reports and insights' }
      ],
      process: [
        'Business process analysis',
        'Automation strategy development',
        'System integration planning',
        'Implementation and testing',
        'Training and optimization'
      ],
      packages: [
        { name: 'Basic Automation', price: 'From $300', features: ['Simple workflows', 'Basic integrations', 'Documentation'] },
        { name: 'Advanced System', price: 'From $800', features: ['Complex processes', 'API development', 'Custom dashboard'] },
        { name: 'Enterprise Suite', price: 'Custom Quote', features: ['Full automation', 'Multiple systems', 'Ongoing support'] }
      ]
    }
  };

  const data = serviceData[service as keyof typeof serviceData];

  if (!data) {
    return <div>Service not found</div>;
  }

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={data.image}
            alt={data.title}
            className="w-full h-full object-cover"
          />
          <div className={`absolute inset-0 bg-gradient-to-r ${data.gradient} opacity-90`} />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              {data.title}
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              {data.subtitle}
            </p>
            <p className="text-lg mb-8 max-w-2xl mx-auto opacity-80">
              {data.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/requirements"
                className="px-8 py-4 bg-white text-gray-800 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
              >
                Get Started - {data.price}
              </Link>
              <button className="px-8 py-4 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-gray-800 transition-all duration-300">
                View Portfolio
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-slate-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800 dark:text-white">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.features.map((feature, index) => (
              <div
                key={index}
                className="bg-white dark:bg-slate-700 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800 dark:text-white">
            Our Process
          </h2>
          <div className="max-w-4xl mx-auto">
            {data.process.map((step, index) => (
              <div key={index} className="flex items-start gap-6 mb-8">
                <div className={`flex-shrink-0 w-10 h-10 bg-gradient-to-r ${data.gradient} rounded-full flex items-center justify-center text-white font-bold`}>
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="text-lg text-gray-700 dark:text-gray-300">{step}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-20 bg-gray-50 dark:bg-slate-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800 dark:text-white">
            Choose Your Package
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {data.packages.map((pkg, index) => (
              <div
                key={index}
                className={`bg-white dark:bg-slate-700 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                  index === 1 ? 'ring-2 ring-blue-500 scale-105' : ''
                }`}
              >
                {index === 1 && (
                  <div className="bg-blue-500 text-white text-sm font-semibold px-4 py-1 rounded-full inline-block mb-4">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">{pkg.name}</h3>
                <div className="text-3xl font-bold mb-6 text-blue-600 dark:text-blue-400">{pkg.price}</div>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-600 dark:text-gray-300">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/requirements"
                  className={`w-full block text-center py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                    index === 1
                      ? 'bg-blue-500 hover:bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-slate-600 hover:bg-gray-200 dark:hover:bg-slate-500 text-gray-800 dark:text-white'
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 dark:text-white">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's discuss your project requirements and create something amazing together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/requirements"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Start Your Project
            </Link>
            <button className="px-8 py-4 border-2 border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 hover:border-blue-500 dark:hover:border-blue-400 rounded-xl font-semibold transition-all duration-300">
              Schedule Consultation
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicePage;
