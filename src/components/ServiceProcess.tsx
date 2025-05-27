
import React from 'react';

interface ServiceProcessProps {
  process: string[];
  gradient: string;
}

const ServiceProcess: React.FC<ServiceProcessProps> = ({ process, gradient }) => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800 dark:text-white">
          Our Process
        </h2>
        <div className="max-w-4xl mx-auto">
          {process.map((step, index) => (
            <div key={index} className="flex items-start gap-6 mb-8">
              <div className={`flex-shrink-0 w-10 h-10 bg-gradient-to-r ${gradient} rounded-full flex items-center justify-center text-white font-bold`}>
                {index + 1}
              </div>
              <div className="flex-1">
                <p className="text-lg text-gray-700 dark:text-gray-300">{step}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceProcess;
