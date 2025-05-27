
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from './ThemeProvider';
import { Sun, Moon, Menu, X, Gamepad2, Camera } from 'lucide-react';

interface NavigationProps {
  onGameStart: () => void;
  onVirtualTour: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ onGameStart, onVirtualTour }) => {
  const { isDark, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const services = [
    { id: 'logo-design', name: 'Logo Design', path: '/services/logo-design' },
    { id: 'website-development', name: 'Websites', path: '/services/website-development' },
    { id: 'ecommerce', name: 'E-commerce', path: '/services/ecommerce' },
    { id: 'ai-assistants', name: 'AI Assistants', path: '/services/ai-assistants' },
    { id: 'automation', name: 'Automation', path: '/services/automation' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-200 dark:border-slate-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">DS</span>
            </div>
            <span className="font-bold text-xl text-gray-800 dark:text-white">
              Digital Solutions
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-6">
              {services.map((service) => (
                <Link
                  key={service.id}
                  to={service.path}
                  className={`text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400 ${
                    location.pathname === service.path
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-gray-600 dark:text-gray-300'
                  }`}
                >
                  {service.name}
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={onVirtualTour}
                className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors"
                title="Virtual Office Tour"
              >
                <Camera className="w-4 h-4" />
              </button>

              <button
                onClick={onGameStart}
                className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                title="Gamified Experience"
              >
                <Gamepad2 className="w-4 h-4" />
              </button>

              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
            >
              {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-slate-700">
            <div className="flex flex-col space-y-3">
              {services.map((service) => (
                <Link
                  key={service.id}
                  to={service.path}
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {service.name}
                </Link>
              ))}
              <div className="flex space-x-2 pt-2">
                <button
                  onClick={() => {
                    onVirtualTour();
                    setIsMenuOpen(false);
                  }}
                  className="flex-1 py-2 px-3 rounded-lg bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 text-sm"
                >
                  Virtual Tour
                </button>
                <button
                  onClick={() => {
                    onGameStart();
                    setIsMenuOpen(false);
                  }}
                  className="flex-1 py-2 px-3 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 text-sm"
                >
                  Game Mode
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
