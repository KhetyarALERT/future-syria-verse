
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, Target, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FuturisticHero: React.FC = () => {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact-section');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-40" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-full mb-8"
        >
          <Sparkles className="w-4 h-4 text-blue-400" />
          <span className="text-sm font-medium text-blue-300">AI-Powered Digital Solutions</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-cyan-300 bg-clip-text text-transparent leading-tight"
        >
          Transform Your
          <br />
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Digital Future
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
        >
          We create intelligent digital experiences that drive growth. From AI-powered websites to smart branding solutions, 
          we&apos;re your partner in the digital revolution.
        </motion.p>

        {/* Feature Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto"
        >
          <div className="p-6 bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl">
            <Zap className="w-8 h-8 text-yellow-400 mb-4 mx-auto" />
            <h3 className="text-lg font-semibold text-white mb-2">Lightning Fast</h3>
            <p className="text-gray-400 text-sm">Delivered in record time with cutting-edge technology</p>
          </div>
          
          <div className="p-6 bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl">
            <Target className="w-8 h-8 text-purple-400 mb-4 mx-auto" />
            <h3 className="text-lg font-semibold text-white mb-2">Precision Targeted</h3>
            <p className="text-gray-400 text-sm">Solutions tailored exactly to your business needs</p>
          </div>
          
          <div className="p-6 bg-slate-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-2xl">
            <Rocket className="w-8 h-8 text-cyan-400 mb-4 mx-auto" />
            <h3 className="text-lg font-semibold text-white mb-2">Future Ready</h3>
            <p className="text-gray-400 text-sm">Built with tomorrow&apos;s technology, available today</p>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            onClick={scrollToContact}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 hover:from-blue-700 hover:via-purple-700 hover:to-cyan-600 text-white font-semibold rounded-full shadow-2xl shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 group"
          >
            Start Your Project
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <Button
            variant="outline"
            className="px-8 py-4 border-2 border-white/20 text-white hover:bg-white/10 font-semibold rounded-full backdrop-blur-sm"
          >
            View Our Work
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          <div>
            <div className="text-3xl font-bold text-white mb-2">500+</div>
            <div className="text-sm text-gray-400">Projects Delivered</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-2">98%</div>
            <div className="text-sm text-gray-400">Client Satisfaction</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-2">24h</div>
            <div className="text-sm text-gray-400">Response Time</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-2">50+</div>
            <div className="text-sm text-gray-400">AI Models</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FuturisticHero;
