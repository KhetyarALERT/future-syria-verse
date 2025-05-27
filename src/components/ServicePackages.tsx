
import React from 'react';
import { Link } from 'react-router-dom';
import { ServicePackage } from '../data/serviceData';

interface ServicePackagesProps {
  packages: ServicePackage[];
}

const ServicePackages: React.FC<ServicePackagesProps> = ({ packages }) => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-slate-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800 dark:text-white">
          Choose Your Package
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className={`bg-white dark:bg-slate-700 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                index === 1 ? 'ring-2 ring-blue-500 scale-105' : ''
              }`}
            >
              {index === 1 && (
                <div className="bg-blue-500 text-white text-sm font-semibold px-4 py-1 rounded-full inline-block mb-4">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">{pkg.name}</h3>
              <div className="text-3xl font-bold mb-6 text-blue-600 dark:text-blue-400">{pkg.price}</div>
              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-600 dark:text-gray-300">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                to="/requirements"
                className={`w-full block text-center py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                  index === 1
                    ? 'bg-blue-500 hover:bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-slate-600 hover:bg-gray-200 dark:hover:bg-slate-500 text-gray-800 dark:text-white'
                }`}
              >
                Get Started
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicePackages;
