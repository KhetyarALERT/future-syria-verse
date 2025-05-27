
import React, { useState, useEffect } from 'react';
import { X, Star, Trophy, Target, Zap, Crown, ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';

interface GameOnboardingProps {
  onClose: () => void;
}

const GameOnboarding: React.FC<GameOnboardingProps> = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [businessProfile, setBusinessProfile] = useState<string>('');

  const gameSteps = [
    {
      id: 0,
      title: "Welcome, Future Business Emperor! 👑",
      subtitle: "Let's build your digital empire together",
      type: "intro",
      content: "Ready to transform your business idea into a digital powerhouse? This interactive journey will help us understand your needs and recommend the perfect services for your empire!",
      options: ["Let's Begin the Adventure!", "Skip to Classic Mode"]
    },
    {
      id: 1,
      title: "Choose Your Business Quest 🎯",
      subtitle: "What's your primary mission?",
      type: "question",
      content: "Every great empire starts with a clear vision. What's your main business goal?",
      options: [
        "🎨 Create a stunning brand identity",
        "💻 Build an amazing website",
        "🛒 Launch an online store",
        "🤖 Add AI superpowers",
        "⚙️ Automate everything!"
      ]
    },
    {
      id: 2,
      title: "Business Size Selection 📊",
      subtitle: "What's the scale of your empire?",
      type: "question",
      content: "Understanding your business size helps us tailor the perfect solution.",
      options: [
        "🌱 Just starting out (Startup)",
        "🏢 Small business (1-10 employees)",
        "🏭 Medium business (11-50 employees)",
        "🏛️ Large enterprise (50+ employees)",
        "💡 Personal project/side hustle"
      ]
    },
    {
      id: 3,
      title: "Budget Range Quest 💰",
      subtitle: "What's your investment level?",
      type: "question",
      content: "Let's find the perfect package for your budget. Remember, great empires require smart investments!",
      options: [
        "💸 Under $200 (Starter Pack)",
        "💳 $200 - $1,000 (Growth Pack)",
        "💎 $1,000 - $5,000 (Premium Pack)",
        "👑 $5,000+ (Enterprise Pack)",
        "🤔 Need help deciding"
      ]
    },
    {
      id: 4,
      title: "Timeline Challenge ⏰",
      subtitle: "When do you need your empire launched?",
      type: "question",
      content: "Speed matters in the digital world. When do you want to conquer your market?",
      options: [
        "🚀 ASAP (Rush order)",
        "⚡ 1-2 weeks (Fast track)",
        "📅 2-4 weeks (Standard)",
        "🎯 1-2 months (Planned)",
        "🧘 No rush (Flexible)"
      ]
    }
  ];

  const handleAnswer = (answer: string) => {
    setSelectedAnswers(prev => ({ ...prev, [currentStep]: answer }));
    setScore(prev => prev + 20);

    if (currentStep < gameSteps.length - 1) {
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 500);
    } else {
      setTimeout(() => {
        calculateResults();
      }, 500);
    }
  };

  const calculateResults = () => {
    const answers = Object.values(selectedAnswers);
    let profile = "Digital Explorer";
    let recommendedService = "Logo Design";

    // Simple logic to determine business profile
    if (answers.includes("🎨 Create a stunning brand identity")) {
      profile = "Brand Builder";
      recommendedService = "Logo Design";
    } else if (answers.includes("💻 Build an amazing website")) {
      profile = "Web Pioneer";
      recommendedService = "Website Development";
    } else if (answers.includes("🛒 Launch an online store")) {
      profile = "E-commerce Entrepreneur";
      recommendedService = "E-commerce Solutions";
    } else if (answers.includes("🤖 Add AI superpowers")) {
      profile = "AI Innovator";
      recommendedService = "AI Personal Assistants";
    } else if (answers.includes("⚙️ Automate everything!")) {
      profile = "Automation Master";
      recommendedService = "Work Automation";
    }

    setBusinessProfile(profile);
    setShowResults(true);
  };

  const getScoreLevel = () => {
    if (score >= 80) return { level: "Legendary", color: "text-purple-600", icon: Crown };
    if (score >= 60) return { level: "Expert", color: "text-blue-600", icon: Trophy };
    if (score >= 40) return { level: "Advanced", color: "text-green-600", icon: Target };
    return { level: "Beginner", color: "text-orange-600", icon: Star };
  };

  if (showResults) {
    const scoreLevel = getScoreLevel();
    const Icon = scoreLevel.icon;

    return (
      <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-8 text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon className="w-12 h-12 text-white" />
            </div>

            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
              Congratulations! 🎉
            </h2>

            <div className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-xl p-6 mb-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                Your Business Profile: {businessProfile}
              </h3>
              <div className={`text-2xl font-bold ${scoreLevel.color} mb-2`}>
                {scoreLevel.level} Level Achieved!
              </div>
              <div className="text-lg text-gray-600 dark:text-gray-300">
                Final Score: {score}/100
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900 rounded-lg p-4">
                <Zap className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
                <div className="font-semibold text-gray-800 dark:text-white">Quick Learner</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Fast decision making</div>
              </div>
              <div className="bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900 dark:to-cyan-900 rounded-lg p-4">
                <Target className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                <div className="font-semibold text-gray-800 dark:text-white">Goal Oriented</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Clear vision</div>
              </div>
              <div className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 rounded-lg p-4">
                <Crown className="w-8 h-8 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
                <div className="font-semibold text-gray-800 dark:text-white">Future Leader</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Empire builder</div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-6 mb-6">
              <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                Recommended Service Based on Your Journey:
              </h4>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {selectedAnswers[1]?.split(' ').slice(1).join(' ') || 'Logo Design'}
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Perfect match for your {businessProfile.toLowerCase()} profile!
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/requirements"
                onClick={onClose}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Start My Empire Project
                <ArrowUp className="inline-block ml-2 w-4 h-4 rotate-45" />
              </Link>
              <button
                onClick={onClose}
                className="px-8 py-4 border-2 border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300"
              >
                Explore Services
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentStepData = gameSteps[currentStep];
  const progress = ((currentStep + 1) / gameSteps.length) * 100;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <div className="text-2xl">🎮</div>
            <div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">Business Empire Builder</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">Interactive Service Selection</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 pt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-300">Progress</span>
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
              {currentStepData.title}
            </h1>
            <p className="text-lg text-blue-600 dark:text-blue-400 mb-4">
              {currentStepData.subtitle}
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              {currentStepData.content}
            </p>
          </div>

          {currentStepData.type === "intro" ? (
            <div className="space-y-4">
              <button
                onClick={() => setCurrentStep(1)}
                className="w-full p-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
              >
                {currentStepData.options[0]}
              </button>
              <button
                onClick={onClose}
                className="w-full p-4 border-2 border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300"
              >
                {currentStepData.options[1]}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {currentStepData.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className="group p-4 text-left border-2 border-gray-200 dark:border-slate-600 hover:border-blue-500 dark:hover:border-blue-400 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                  <div className="text-lg font-medium text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {option}
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Score Display */}
          {currentStep > 0 && (
            <div className="mt-6 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 dark:bg-yellow-900 rounded-full">
                <Star className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                <span className="text-yellow-800 dark:text-yellow-200 font-semibold">
                  Score: {score}/100
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameOnboarding;
