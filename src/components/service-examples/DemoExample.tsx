
import React from 'react';
import { motion } from 'framer-motion';

interface DemoExampleProps {
  content: any;
}

export const DemoExample: React.FC<DemoExampleProps> = ({ content }) => (
  <div className="space-y-6">
    <div className="bg-white rounded-xl p-6 border shadow-sm">
      <p className="text-gray-700 mb-6">{content.description}</p>

      {/* Social Media Mock Post */}
      {content.mock_post && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-purple-50 to-pink-50 border rounded-xl p-6 shadow-sm mb-6"
        >
          <h5 className="font-semibold mb-4 text-gray-800">Sample Social Media Post:</h5>
          <div className="bg-white border rounded-lg p-4 shadow-sm">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">DP</span>
              </div>
              <div className="ml-3">
                <p className="font-semibold text-sm">DigitalPro</p>
                <p className="text-xs text-gray-500">{content.mock_post.platform}</p>
              </div>
            </div>
            <p className="text-sm mb-4">{content.mock_post.content}</p>
            <div className="flex space-x-6 text-sm text-gray-500">
              <span className="flex items-center gap-1">❤️ {content.mock_post.engagement.likes}</span>
              <span className="flex items-center gap-1">💬 {content.mock_post.engagement.comments}</span>
              <span className="flex items-center gap-1">🔄 {content.mock_post.engagement.shares}</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Flowchart for Smart CX */}
      {content.flowchart && (
        <div className="space-y-3">
          <h4 className="font-semibold">Customer Experience Flow:</h4>
          <div className="space-y-2">
            {content.flowchart.steps.map((step: string, index: number) => (
              <div key={index} className="flex items-center">
                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3">
                  {index + 1}
                </div>
                <span className="text-sm">{step}</span>
                {index < content.flowchart.steps.length - 1 && (
                  <div className="ml-4 text-blue-400">→</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ERP Modules */}
      {content.modules && (
        <div className="space-y-3">
          <h4 className="font-semibold">System Modules:</h4>
          <div className="grid grid-cols-2 gap-2">
            {content.modules.map((module: string, index: number) => (
              <div key={index} className="bg-blue-50 p-2 rounded text-sm text-center">
                {module}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Features List */}
      {content.features && (
        <ul className="space-y-2">
          {content.features.map((feature: string, index: number) => (
            <li key={index} className="flex items-center text-sm text-gray-700">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3" />
              {feature}
            </li>
          ))}
        </ul>
      )}

      {/* Benefits List */}
      {content.benefits && (
        <ul className="space-y-2">
          {content.benefits.map((benefit: string, index: number) => (
            <li key={index} className="flex items-center text-sm text-gray-700">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3" />
              {benefit}
            </li>
          ))}
        </ul>
      )}

      {/* Dashboard Features */}
      {content.dashboard_features && (
        <div className="space-y-3">
          <h4 className="font-semibold">Dashboard Features:</h4>
          <ul className="space-y-2">
            {content.dashboard_features.map((feature: string, index: number) => (
              <li key={index} className="flex items-center text-sm text-gray-700">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-3" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  </div>
);
