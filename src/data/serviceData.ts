
export interface ServiceFeature {
  icon: string;
  title: string;
  description: string;
}

export interface ServicePackage {
  name: string;
  price: string;
  features: string[];
}

export interface ServiceData {
  title: string;
  subtitle: string;
  description: string;
  price: string;
  image: string;
  gradient: string;
  features: ServiceFeature[];
  process: string[];
  packages: ServicePackage[];
}

export const serviceData: Record<string, ServiceData> = {
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
