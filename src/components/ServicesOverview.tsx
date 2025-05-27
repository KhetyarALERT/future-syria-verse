
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';

const ServicesOverview: React.FC = () => {
  const services = [
    {
      id: 'logo-design',
      title: 'Logo Design',
      description: 'AI-powered logo creation with unlimited revisions',
      price: '$50 - $200',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop',
      features: ['AI-Generated Concepts', 'Vector Files', '24h Delivery', 'Unlimited Revisions'],
      gradient: 'from-pink-500 to-rose-500',
      path: '/services/logo-design'
    },
    {
      id: 'website-development',
      title: 'Website Development',
      description: 'Modern, responsive websites built with latest technologies',
      price: '$200 - $1000',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop',
      features: ['Responsive Design', 'SEO Optimized', 'Fast Loading', 'Mobile First'],
      gradient: 'from-blue-500 to-cyan-500',
      path: '/services/website-development'
    },
    {
      id: 'ecommerce',
      title: 'E-commerce Solutions',
      description: 'Complete online stores with payment integration',
      price: '$500 - $2000',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
      features: ['Payment Gateway', 'Inventory Management', 'Admin Dashboard', 'Mobile App'],
      gradient: 'from-green-500 to-emerald-500',
      path: '/services/ecommerce'
    },
    {
      id: 'ai-assistants',
      title: 'AI Personal Assistants',
      description: 'Custom AI chatbots and virtual assistants',
      price: '$10 - $50/month',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop',
      features: ['Natural Language', '24/7 Support', 'Custom Training', 'Multi-platform'],
      gradient: 'from-purple-500 to-violet-500',
      path: '/services/ai-assistants'
    },
    {
      id: 'automation',
      title: 'Work Automation',
      description: 'Automate repetitive tasks and workflows',
      price: 'Custom Quote',
      image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=400&h=300&fit=crop',
      features: ['Process Automation', 'Data Integration', 'API Development', 'Workflow Design'],
      gradient: 'from-orange-500 to-red-500',
      path: '/services/automation'
    }
  ];

  return (
    <section id="services" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800 dark:text-white">
            Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Services</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            From concept to completion, we provide end-to-end digital solutions that transform your business
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="group relative bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              {/* Service Image */}
              <div className="relative overflow-hidden h-48">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${service.gradient} opacity-80`} />
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1">
                  <span className="text-white text-sm font-semibold">{service.price}</span>
                </div>
              </div>

              {/* Service Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2" />
                      {feature}
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Link
                  to={service.path}
                  className="group/btn w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-slate-700 dark:to-slate-600 hover:from-blue-500 hover:to-purple-500 text-gray-700 dark:text-gray-300 hover:text-white rounded-lg transition-all duration-300 font-medium"
                >
                  Learn More
                  <ArrowUp className="w-4 h-4 rotate-45 group-hover/btn:rotate-90 transition-transform duration-300" />
                </Link>
              </div>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500/30 rounded-2xl transition-all duration-300" />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <Link
            to="/requirements"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Get Custom Quote
            <ArrowUp className="w-4 h-4 rotate-45" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;
