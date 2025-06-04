
export interface FormErrors {
  name?: string;
  email?: string;
  serviceType?: string;
  businessType?: string;
  requirements?: string;
}

export interface FormData {
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  businessType: string;
  budget: string;
  timeline: string;
  requirements: string;
  additionalInfo: string;
  contactPreference: string;
}

export const validateForm = (formData: FormData): FormErrors => {
  const newErrors: FormErrors = {};
  
  if (!formData.name.trim()) {
    newErrors.name = 'Name is required';
  }
  
  if (!formData.email.trim()) {
    newErrors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    newErrors.email = 'Please enter a valid email address';
  }
  
  if (!formData.serviceType) {
    newErrors.serviceType = 'Please select a service';
  }
  
  if (!formData.businessType.trim()) {
    newErrors.businessType = 'Business type is required';
  }
  
  if (!formData.requirements.trim()) {
    newErrors.requirements = 'Please describe your requirements';
  }
  
  return newErrors;
};

export const getFieldClassName = (fieldName: keyof FormErrors, baseClassName: string, errors: FormErrors) => {
  return `${baseClassName} ${errors[fieldName] ? 'border-red-500 focus:border-red-500' : 'border-slate-600 focus:border-blue-500'}`;
};
