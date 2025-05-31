
import React from 'react';
import { useServiceExamples } from './service-examples/useServiceExamples';
import { ServiceExamplesModal } from './service-examples/ServiceExamplesModal';

interface ServiceExamplesProps {
  serviceKey: string;
  isOpen: boolean;
  onClose: () => void;
  onGetQuote: () => void;
}

const ServiceExamples: React.FC<ServiceExamplesProps> = ({ 
  serviceKey, 
  isOpen, 
  onClose, 
  onGetQuote 
}) => {
  const { examples, loading } = useServiceExamples(serviceKey, isOpen);

  return (
    <ServiceExamplesModal
      isOpen={isOpen}
      onClose={onClose}
      onGetQuote={onGetQuote}
      serviceKey={serviceKey}
      examples={examples}
      loading={loading}
    />
  );
};

export default ServiceExamples;
