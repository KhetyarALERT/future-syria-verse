
import React from 'react';
import { serviceData } from '../data/serviceData';
import ServiceHero from './ServiceHero';
import ServiceFeatures from './ServiceFeatures';
import ServiceProcess from './ServiceProcess';
import ServicePackages from './ServicePackages';
import ServiceCTA from './ServiceCTA';

interface ServicePageProps {
  service: string;
}

const ServicePage: React.FC<ServicePageProps> = ({ service }) => {
  const data = serviceData[service as keyof typeof serviceData];

  if (!data) {
    return <div>Service not found</div>;
  }

  return (
    <div className="min-h-screen pt-16">
      <ServiceHero data={data} />
      <ServiceFeatures features={data.features} />
      <ServiceProcess process={data.process} gradient={data.gradient} />
      <ServicePackages packages={data.packages} />
      <ServiceCTA />
    </div>
  );
};

export default ServicePage;
