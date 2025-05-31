
import React from 'react';
import { motion } from 'framer-motion';
import { ImageIcon, Sparkles } from 'lucide-react';

interface ImageExampleProps {
  content: any;
}

export const ImageExample: React.FC<ImageExampleProps> = ({ content }) => (
  <div className="space-y-6">
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-xl border-2 border-dashed border-blue-200 text-center relative overflow-hidden"
    >
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(59, 130, 246, 0.3) 1px, transparent 0)',
          backgroundSize: '20px 20px'
        }} />
      </div>
      
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <ImageIcon className="w-20 h-20 mx-auto text-blue-500 mb-4" />
      </motion.div>
      <h4 className="text-lg font-bold text-gray-800 mb-2">Premium Design Example</h4>
      <p className="text-gray-600 font-medium">{content.image_description}</p>
    </motion.div>
    
    <div className="bg-white rounded-xl p-6 border shadow-sm">
      <p className="text-gray-700 mb-4">{content.description}</p>
      {content.benefits && (
        <div>
          <h5 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-yellow-500" />
            What You Get:
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
