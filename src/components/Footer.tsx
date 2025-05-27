
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, Globe, Star } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const services = [
    { name: 'Logo Design', path: '/services/logo-design' },
    { name: 'Website Development', path: '/services/website-development' },
    { name: 'E-commerce Solutions', path: '/services/ecommerce' },
    { name: 'AI Personal Assistants', path: '/services/ai-assistants' },
    { name: 'Work Automation', path: '/services/automation' },
  ];

  const companyLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Contact', path: '/contact' },
    { name: 'Requirements Form', path: '/requirements' },
  ];

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20" />
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">DS</span>
              </div>
              <span className="font-bold text-xl">Digital Solutions</span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Transforming businesses with cutting-edge digital solutions. From AI-powered logos to complete automation systems, we build your digital empire.
            </p>
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="ml-2 text-sm text-gray-300">5.0 (500+ reviews)</span>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Our Services</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    to={service.path}
                    className="text-gray-300 hover:text-blue-400 transition-colors text-sm"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Company</h3>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-blue-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Get in Touch</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-blue-400" />
                <a href="mailto:hello@digitalsolutions.com" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                  hello@digitalsolutions.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-green-400" />
                <a href="tel:+1234567890" className="text-gray-300 hover:text-green-400 transition-colors text-sm">
                  +1 (234) 567-890
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Globe className="w-4 h-4 text-purple-400" />
                <span className="text-gray-300 text-sm">
                  🇸🇾 Syria & Worldwide
                </span>
              </div>
            </div>
            
            <div className="pt-4">
              <Link
                to="/requirements"
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105 text-sm"
              >
                Start Your Project
              </Link>
            </div>
          </div>
        </div>

        {/* Features Bar */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-400">24/7</div>
              <div className="text-xs text-gray-400">AI Support</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-400">500+</div>
              <div className="text-xs text-gray-400">Projects</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-400">98%</div>
              <div className="text-xs text-gray-400">Satisfaction</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-400">50+</div>
              <div className="text-xs text-gray-400">Countries</div>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="text-center">
            <h4 className="text-sm font-semibold text-white mb-4">Accepted Payments</h4>
            <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-gray-300">
              <span className="flex items-center gap-1">
                💳 International Cards
              </span>
              <span className="flex items-center gap-1">
                🏦 Bank Transfers
              </span>
              <span className="flex items-center gap-1">
                📱 Local Payments
              </span>
              <span className="flex items-center gap-1">
                🔒 100% Secure
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between">
          <div className="text-sm text-gray-400 mb-4 md:mb-0">
            © {currentYear} Digital Solutions. All rights reserved. Made with ❤️ for global entrepreneurs.
          </div>
          <div className="flex items-center space-x-6 text-sm text-gray-400">
            <a href="/privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-blue-400 transition-colors">Terms of Service</a>
            <span className="text-blue-400">🇸🇾 Proudly Syrian</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
