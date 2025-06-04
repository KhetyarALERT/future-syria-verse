
import { supabase } from '@/integrations/supabase/client';
import { FormData } from './formValidation';

export const submitForm = async (formData: FormData) => {
  const { data, error } = await supabase
    .from('inquiries')
    .insert({
      name: formData.name,
      email: formData.email,
      phone: formData.phone || null,
      inquiry_type: 'service_inquiry',
      inquiry_text: `Project Requirements: ${formData.requirements}${formData.additionalInfo ? '\n\nAdditional Information: ' + formData.additionalInfo : ''}`,
      language: 'en',
      preferred_contact_method: formData.contactPreference,
      metadata: {
        source: 'smart_contact_form',
        service_type: formData.serviceType,
        budget_range: formData.budget,
        timeline: formData.timeline,
        business_type: formData.businessType,
        contact_preference: formData.contactPreference,
        submission_timestamp: new Date().toISOString()
      }
    })
    .select()
    .single();

  if (error) {
    console.error('Supabase error:', error);
    throw error;
  }

  console.log('Form submitted successfully:', data);
  return data;
};

export const getInitialFormData = (prefilledData?: any): FormData => ({
  name: prefilledData?.name || '',
  email: prefilledData?.email || '',
  phone: prefilledData?.phone || '',
  serviceType: prefilledData?.serviceType || '',
  businessType: prefilledData?.businessType || '',
  budget: prefilledData?.budget || '',
  timeline: prefilledData?.timeline || '',
  requirements: prefilledData?.requirements || '',
  additionalInfo: prefilledData?.additionalInfo || '',
  contactPreference: 'email'
});
