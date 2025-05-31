
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

type ServiceExample = Tables<'service_examples'>;

export const useServiceExamples = (serviceKey: string, isOpen: boolean) => {
  const { i18n } = useTranslation();
  const [examples, setExamples] = useState<ServiceExample[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen && serviceKey) {
      fetchServiceExamples();
    }
  }, [isOpen, serviceKey, i18n.language]);

  const fetchServiceExamples = async () => {
    setLoading(true);
    try {
      console.log('Fetching examples for service:', serviceKey, 'language:', i18n.language);
      
      const { data, error } = await supabase
        .from('service_examples')
        .select('*')
        .eq('service_type', serviceKey)
        .eq('language', i18n.language);

      console.log('Fetched examples:', data, error);

      if (error) {
        console.error('Error fetching examples:', error);
        setExamples([]);
      } else {
        setExamples(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
      setExamples([]);
    } finally {
      setLoading(false);
    }
  };

  return { examples, loading };
};
