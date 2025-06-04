
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
      { name: 'Basic', price: 'Contact for Quote', features: ['3 AI-generated concepts', 'PNG & JPG files', '24h delivery'] },
      { name: 'Standard', price: 'Contact for Quote', features: ['5 concepts', 'Vector files', 'Brand colors', '12h delivery'] },
      { name: 'Premium', price: 'Contact for Quote', features: ['Unlimited concepts', 'Complete brand kit', 'Rush delivery', 'Brand guidelines'] }
    ]
  },
  'website-development': {
    title: 'Website Development',
    subtitle: 'Modern, Responsive Web Solutions',
    description: 'Build powerful, fast-loading websites that convert visitors into customers. Our development process focuses on performance, SEO, and user experience.',
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
      { name: 'Landing Page', price: 'Contact for Quote', features: ['Single page', 'Contact form', 'Mobile responsive'] },
      { name: 'Business Site', price: 'Contact for Quote', features: ['5-10 pages', 'CMS integration', 'SEO setup'] },
      { name: 'Custom Solution', price: 'Contact for Quote', features: ['Unlimited pages', 'Custom features', 'Advanced integrations'] }
    ]
  },
  'ecommerce': {
    title: 'E-commerce Solutions',
    subtitle: 'Complete Online Store Development',
    description: 'Launch your online business with a feature-rich e-commerce platform. From product catalogs to payment processing, we handle everything.',
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
      { name: 'Starter Store', price: 'Contact for Quote', features: ['50 products', 'Basic payments', 'Mobile responsive'] },
      { name: 'Professional', price: 'Contact for Quote', features: ['Unlimited products', 'Advanced features', 'Marketing tools'] },
      { name: 'Enterprise', price: 'Contact for Quote', features: ['Custom development', 'API integrations', 'Mobile app'] }
    ]
  },
  'ai-assistants': {
    title: 'AI Personal Assistants',
    subtitle: 'Intelligent Customer Support Solutions',
    description: 'Deploy AI-powered chatbots and virtual assistants that provide 24/7 customer support, answer questions, and automate routine tasks.',
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
      { name: 'Basic Bot', price: 'Contact for Quote', features: ['FAQ responses', 'Basic integration', '100 conversations'] },
      { name: 'Smart Assistant', price: 'Contact for Quote', features: ['Advanced AI', 'Multiple channels', '1000 conversations'] },
      { name: 'Enterprise AI', price: 'Contact for Quote', features: ['Custom training', 'Unlimited usage', 'Advanced analytics'] }
    ]
  },
  'automation': {
    title: 'Work Automation',
    subtitle: 'Streamline Your Business Processes',
    description: 'Automate repetitive tasks, integrate systems, and create efficient workflows that save time and reduce errors in your business operations.',
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
      { name: 'Basic Automation', price: 'Contact for Quote', features: ['Simple workflows', 'Basic integrations', 'Documentation'] },
      { name: 'Advanced System', price: 'Contact for Quote', features: ['Complex processes', 'API development', 'Custom dashboard'] },
      { name: 'Enterprise Suite', price: 'Contact for Quote', features: ['Full automation', 'Multiple systems', 'Ongoing support'] }
    ]
  },
  'crm': {
    title: 'CRM Systems',
    subtitle: 'Customer Relationship Management Solutions',
    description: 'Comprehensive CRM solutions to manage customer interactions, track sales pipelines, and optimize your business relationships for maximum growth.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop',
    gradient: 'from-indigo-500 to-blue-500',
    features: [
      { icon: '👥', title: 'Contact Management', description: 'Centralized customer database' },
      { icon: '📈', title: 'Sales Pipeline', description: 'Track deals and opportunities' },
      { icon: '📧', title: 'Email Integration', description: 'Automated email campaigns' },
      { icon: '📊', title: 'Analytics Dashboard', description: 'Sales performance insights' },
      { icon: '🔄', title: 'Workflow Automation', description: 'Streamline sales processes' }
    ],
    process: [
      'Requirements analysis and CRM planning',
      'Data migration and system setup',
      'Custom fields and workflow configuration',
      'Team training and integration',
      'Go-live and ongoing optimization'
    ],
    packages: [
      { name: 'Basic CRM', price: 'Contact for Quote', features: ['Contact management', 'Basic pipeline', 'Email integration'] },
      { name: 'Professional CRM', price: 'Contact for Quote', features: ['Advanced automation', 'Custom reports', 'API integrations'] },
      { name: 'Enterprise CRM', price: 'Contact for Quote', features: ['Full customization', 'Advanced analytics', 'Multi-user access'] }
    ]
  },
  'ai-customer-support': {
    title: 'AI Customer Support',
    subtitle: 'Human-Like AI Customer Service',
    description: 'Advanced AI customer support that provides human-like interactions, understands context, and delivers personalized assistance 24/7.',
    image: 'https://images.unsplash.com/photo-1596524430615-b46475ddff6e?w=800&h=500&fit=crop',
    gradient: 'from-cyan-500 to-teal-500',
    features: [
      { icon: '🧠', title: 'Human-Like AI', description: 'Natural conversation abilities' },
      { icon: '🌐', title: 'Multi-Language', description: 'Support in multiple languages' },
      { icon: '📞', title: 'Omnichannel', description: 'Chat, email, voice integration' },
      { icon: '🎯', title: 'Context Aware', description: 'Remembers conversation history' },
      { icon: '⚡', title: 'Instant Response', description: 'Zero wait time for customers' }
    ],
    process: [
      'Analyze current support processes',
      'Train AI on your knowledge base',
      'Configure conversation flows',
      'Integration with existing systems',
      'Launch and continuous improvement'
    ],
    packages: [
      { name: 'Basic Support', price: 'Contact for Quote', features: ['Chat integration', 'Basic AI training', 'Standard responses'] },
      { name: 'Advanced Support', price: 'Contact for Quote', features: ['Multi-channel support', 'Context awareness', 'Custom training'] },
      { name: 'Enterprise Support', price: 'Contact for Quote', features: ['Full customization', 'Advanced analytics', 'Priority support'] }
    ]
  },
  'trading-assistant': {
    title: 'Trading Assistant',
    subtitle: 'AI-Powered Trading Intelligence',
    description: 'Intelligent trading assistant that provides market analysis, trade recommendations, risk management, and portfolio optimization using advanced AI algorithms.',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=500&fit=crop',
    gradient: 'from-emerald-500 to-green-500',
    features: [
      { icon: '📊', title: 'Market Analysis', description: 'Real-time market insights' },
      { icon: '🎯', title: 'Trade Signals', description: 'AI-generated trading signals' },
      { icon: '⚖️', title: 'Risk Management', description: 'Automated risk assessment' },
      { icon: '📈', title: 'Portfolio Tracking', description: 'Performance monitoring' },
      { icon: '🔔', title: 'Smart Alerts', description: 'Customizable notifications' }
    ],
    process: [
      'Define trading strategy and preferences',
      'Configure risk parameters and alerts',
      'Connect to trading platforms',
      'AI model training and calibration',
      'Live trading and performance monitoring'
    ],
    packages: [
      { name: 'Basic Trader', price: 'Contact for Quote', features: ['Market analysis', 'Basic signals', 'Portfolio tracking'] },
      { name: 'Pro Trader', price: 'Contact for Quote', features: ['Advanced algorithms', 'Risk management', 'Multiple assets'] },
      { name: 'Enterprise Trader', price: 'Contact for Quote', features: ['Custom strategies', 'API access', 'White-label solution'] }
    ]
  },
  'reminder': {
    title: 'Smart Reminder System',
    subtitle: 'Intelligent Task and Event Management',
    description: 'AI-powered reminder system that learns your patterns, prioritizes tasks, and ensures you never miss important deadlines or appointments.',
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=500&fit=crop',
    gradient: 'from-amber-500 to-yellow-500',
    features: [
      { icon: '⏰', title: 'Smart Scheduling', description: 'AI-optimized reminder timing' },
      { icon: '🎯', title: 'Priority System', description: 'Intelligent task prioritization' },
      { icon: '📱', title: 'Multi-Platform', description: 'Sync across all devices' },
      { icon: '🔄', title: 'Recurring Tasks', description: 'Automated recurring reminders' },
      { icon: '📊', title: 'Analytics', description: 'Productivity insights and reports' }
    ],
    process: [
      'Setup personal preferences and patterns',
      'Configure reminder channels and timing',
      'Integrate with calendar and task systems',
      'AI learning and optimization phase',
      'Ongoing refinement and improvements'
    ],
    packages: [
      { name: 'Personal', price: 'Contact for Quote', features: ['Basic reminders', 'Calendar sync', 'Mobile notifications'] },
      { name: 'Professional', price: 'Contact for Quote', features: ['Team collaboration', 'Advanced scheduling', 'Productivity analytics'] },
      { name: 'Enterprise', price: 'Contact for Quote', features: ['Custom integrations', 'Team management', 'Advanced reporting'] }
    ]
  },
  'customized-service': {
    title: 'Customized Services',
    subtitle: 'Tailored Solutions for Your Unique Needs',
    description: 'Custom software development and digital solutions built specifically for your business requirements. From concept to deployment, we create exactly what you need.',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=500&fit=crop',
    gradient: 'from-violet-500 to-purple-500',
    features: [
      { icon: '🎨', title: 'Custom Design', description: 'Tailored to your brand and needs' },
      { icon: '⚙️', title: 'Bespoke Development', description: 'Built from scratch for you' },
      { icon: '🔧', title: 'API Integration', description: 'Connect with existing systems' },
      { icon: '📱', title: 'Cross-Platform', description: 'Web, mobile, and desktop solutions' },
      { icon: '🛠️', title: 'Ongoing Support', description: 'Maintenance and updates included' }
    ],
    process: [
      'Detailed requirements gathering',
      'Technical specification and planning',
      'Custom development and testing',
      'User acceptance and refinements',
      'Deployment and ongoing support'
    ],
    packages: [
      { name: 'Small Project', price: 'Contact for Quote', features: ['Basic customization', 'Standard features', 'Basic support'] },
      { name: 'Medium Project', price: 'Contact for Quote', features: ['Advanced features', 'Custom integrations', 'Priority support'] },
      { name: 'Large Project', price: 'Contact for Quote', features: ['Enterprise solution', 'Full customization', 'Dedicated team'] }
    ]
  }
};
