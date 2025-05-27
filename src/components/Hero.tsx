
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, Star, Gamepad2 } from 'lucide-react';

interface HeroProps {
  onGameStart: () => void;
}

const Hero: React.FC<HeroProps> = ({ onGameStart }) => {
  const [currentText, setCurrentText] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const heroTexts = [
    "Transform Your Business with AI",
    "Build Your Digital Empire",
    "Automate. Innovate. Dominate.",
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % heroTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 dark:from-blue-400/10 dark:via-purple-400/10 dark:to-pink-400/10" />
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-400/30 dark:bg-blue-300/20 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-800 dark:text-white">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              {heroTexts[currentText]}
            </span>
          </h1>

          <p className="text-xl md:text-2xl mb-8 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We create stunning logos, build powerful websites, develop AI assistants, and automate your business processes. 
            <span className="block mt-2 text-lg text-blue-600 dark:text-blue-400">
              🇸🇾 Proudly serving Syria and the world
            </span>
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-10">
            {[
              { number: "500+", label: "Projects Delivered" },
              { number: "98%", label: "Client Satisfaction" },
              { number: "24/7", label: "AI Support" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stat.number}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link
              to="/requirements"
              className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Start Your Project
              <ArrowDown className="inline-block ml-2 w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </Link>

            <button
              onClick={onGameStart}
              className="group px-8 py-4 bg-white/20 dark:bg-slate-800/50 backdrop-blur-sm border border-white/30 dark:border-slate-600 text-gray-800 dark:text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:bg-white/30 dark:hover:bg-slate-700/50"
            >
              <Gamepad2 className="inline-block mr-2 w-4 h-4" />
              Try Game Mode
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-6 opacity-70">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">5.0 Rating</span>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              💳 Stripe & Local Payments
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              🔒 100% Secure
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="w-6 h-6 text-gray-400 dark:text-gray-500" />
      </div>
    </section>
  );
};

export default Hero;
