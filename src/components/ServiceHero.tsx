
import React from 'react';
import { Link } from 'react-router-dom';
import { ServiceData } from '../data/serviceData';

interface ServiceHeroProps {
  data: ServiceData;
}

const ServiceHero: React.FC<ServiceHeroProps> = ({ data }) => {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={data.image}
          alt={data.title}
          className="w-full h-full object-cover"
        />
        <div className={`absolute inset-0 bg-gradient-to-r ${data.gradient} opacity-90`} />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            {data.title}
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            {data.subtitle}
          </p>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-80">
            {data.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/requirements"
              className="px-8 py-4 bg-white text-gray-800 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            >
              Get Started - {data.price}
            </Link>
            <button className="px-8 py-4 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-gray-800 transition-all duration-300">
              View Portfolio
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceHero;
