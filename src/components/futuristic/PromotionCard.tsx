
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Gift, 
  Wallet, 
  TrendingUp, 
  Shield, 
  Users, 
  Percent, 
  Rocket,
  CheckCircle,
  Sparkles,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PromotionCardProps {
  onGetStarted?: () => void;
}

const PromotionCard: React.FC<PromotionCardProps> = ({ onGetStarted }) => {
  const benefits = [
    {
      icon: Wallet,
      title: "Free Phantom Wallet",
      description: "Pre-loaded with Fixora Crypto coins",
      gradient: "from-purple-500 to-indigo-500",
      highlight: true
    },
    {
      icon: TrendingUp,
      title: "Free Trading Accounts",
      description: "BingX, Weex, and MEXC platforms",
      gradient: "from-green-500 to-emerald-500",
      highlight: true
    },
    {
      icon: Shield,
      title: "1 Month Free Maintenance",
      description: "Complete support and updates",
      gradient: "from-blue-500 to-cyan-500",
      highlight: false
    },
    {
      icon: Users,
      title: "10% Cash Referral",
      description: "Earn money for each referral",
      gradient: "from-yellow-500 to-orange-500",
      highlight: false
    },
    {
      icon: Percent,
      title: "20% Referral Discount",
      description: "Save on future services",
      gradient: "from-pink-500 to-rose-500",
      highlight: false
    },
    {
      icon: Rocket,
      title: "Fixora Beta Access",
      description: "Early access when released",
      gradient: "from-violet-500 to-purple-500",
      highlight: true
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="relative max-w-4xl mx-auto my-16"
    >
      {/* Background with reflections */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20 rounded-3xl blur-xl transform rotate-1" />
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/10 via-blue-600/10 to-purple-600/10 rounded-3xl blur-lg transform -rotate-1" />
      
      {/* Main card */}
      <div className="relative bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden">
        {/* Premium badge */}
        <div className="absolute top-6 right-6 z-10">
          <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-full backdrop-blur-sm">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm font-semibold text-yellow-300">PREMIUM BONUS</span>
          </div>
        </div>

        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(45deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px),
                linear-gradient(-45deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '30px 30px'
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 p-8">
          {/* Header */}
          <div className="text-center mb-10">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="inline-block mb-4"
            >
              <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
                <Gift className="w-8 h-8 text-white" />
              </div>
            </motion.div>
            
            <h3 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white via-blue-200 to-cyan-300 bg-clip-text text-transparent">
              Exclusive Launch Bonuses
            </h3>
            
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Every service comes with incredible value-added benefits to accelerate your success
            </p>
          </div>

          {/* Benefits grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="relative group"
                >
                  {/* Benefit card */}
                  <div className={`relative p-6 bg-slate-800/50 backdrop-blur-sm border rounded-2xl transition-all duration-300 ${
                    benefit.highlight 
                      ? 'border-cyan-500/50 shadow-lg shadow-cyan-500/10' 
                      : 'border-white/10 group-hover:border-white/20'
                  }`}>
                    
                    {/* Highlight badge */}
                    {benefit.highlight && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full flex items-center justify-center">
                        <Sparkles className="w-3 h-3 text-white" />
                      </div>
                    )}
                    
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${benefit.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    
                    {/* Content */}
                    <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                      {benefit.title}
                    </h4>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {benefit.description}
                    </p>
                    
                    {/* Check icon */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center"
          >
            <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <h4 className="text-2xl font-bold text-white mb-4">
                Ready to claim your bonuses?
              </h4>
              <p className="text-gray-300 mb-6 max-w-md mx-auto">
                Start any project today and automatically receive all these premium benefits
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  onClick={onGetStarted}
                  className="group px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 hover:from-blue-700 hover:via-purple-700 hover:to-cyan-600 text-white font-semibold rounded-xl shadow-2xl shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
                >
                  <Gift className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                  Claim All Bonuses
                  <Sparkles className="w-4 h-4 ml-2 group-hover:scale-110 transition-transform" />
                </Button>
                
                <div className="text-sm text-gray-400">
                  <span className="text-green-400 font-semibold">Limited Time:</span> Available with every service
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-10 left-10 w-2 h-2 bg-blue-400 rounded-full animate-pulse opacity-60" />
        <div className="absolute bottom-10 right-10 w-3 h-3 bg-purple-400 rounded-full animate-pulse opacity-60" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-4 w-1 h-1 bg-cyan-400 rounded-full animate-pulse opacity-60" style={{ animationDelay: '2s' }} />
      </div>
    </motion.div>
  );
};

export default PromotionCard;
