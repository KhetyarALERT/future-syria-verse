
import React from 'react';
import type { Tables } from '@/integrations/supabase/types';
import { ChatExample } from './ChatExample';
import { ImageExample } from './ImageExample';
import { GraphExample } from './GraphExample';
import { DemoExample } from './DemoExample';

type ServiceExample = Tables<'service_examples'>;

interface ExampleRendererProps {
  example: ServiceExample;
}

export const ExampleRenderer: React.FC<ExampleRendererProps> = ({ example }) => {
  switch (example.example_type) {
    case 'chat':
      return <ChatExample content={example.content} />;
    case 'image':
      return <ImageExample content={example.content} />;
    case 'graph':
      return <GraphExample content={example.content} />;
    case 'demo':
      return <DemoExample content={example.content} />;
    default:
      return <p className="text-gray-500">Example type not supported</p>;
  }
};
