
import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Sparkles } from 'lucide-react';

interface GraphExampleProps {
  content: any;
}

export const GraphExample: React.FC<GraphExampleProps> = ({ content }) => (
  <div className="space-y-6">
    <div className="bg-white rounded-xl p-6 border shadow-sm">
      <p className="text-gray-700 mb-6">{content.description}</p>
      
      {content.graph_data && (
        <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-6 rounded-xl border">
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            <h4 className="text-lg font-semibold text-center text-gray-800">{content.graph_data.title}</h4>
          </div>
          <div className="space-y-3">
            {content.graph_data.data.map((item: any, index: number) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border"
              >
                <span className="font-medium text-gray-800">{item.month}</span>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center">
                    <TrendingUp className="w-4 h-4 text-blue-500 mr-2" />
                    <span className="text-sm font-medium">{item.conversions} conversions</span>
                  </div>
                  <div className="text-green-600 font-bold text-lg">{item.roi}% ROI</div>
                </div>
                <motion.div 
                  className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden ml-4"
                  initial={{ width: 0 }}
                  animate={{ width: '5rem' }}
                  transition={{ delay: index * 0.2 }}
                >
                  <motion.div 
                    className="h-full bg-gradient-to-r from-blue-500 to-green-500"
                    initial={{ width: '0%' }}
                    animate={{ width: `${Math.min(item.roi / 5, 100)}%` }}
                    transition={{ delay: index * 0.2 + 0.5, duration: 1 }}
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {content.benefits && (
        <div className="mt-6">
          <h5 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-yellow-500" />
            Key Benefits:
          </h5>
          <ul className="space-y-2">
            {content.benefits.map((benefit: string, index: number) => (
              <motion.li 
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center text-sm text-gray-700"
              >
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3 flex-shrink-0" />
                {benefit}
              </motion.li>
            ))}
          </ul>
        </div>
      )}
    </div>
  </div>
);
