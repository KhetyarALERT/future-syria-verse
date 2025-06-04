
import React from 'react';
import { User, Mail, Phone, MessageSquare } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormData, FormErrors, getFieldClassName } from './formValidation';
import { serviceOptions } from './formOptions';

interface PersonalInfoFieldsProps {
  formData: FormData;
  errors: FormErrors;
  onInputChange: (field: keyof FormData, value: string) => void;
  onErrorClear: (field: keyof FormErrors) => void;
}

const PersonalInfoFields: React.FC<PersonalInfoFieldsProps> = ({
  formData,
  errors,
  onInputChange,
  onErrorClear
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
          <User className="w-4 h-4" />
          Full Name *
        </label>
        <Input
          value={formData.name}
          onChange={(e) => {
            onInputChange('name', e.target.value);
            if (errors.name) onErrorClear('name');
          }}
          required
          className={getFieldClassName('name', 'bg-slate-800 text-white', errors)}
          placeholder="Your full name"
        />
        {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
      </div>

      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
          <Mail className="w-4 h-4" />
          Email Address *
        </label>
        <Input
          type="email"
          value={formData.email}
          onChange={(e) => {
            onInputChange('email', e.target.value);
            if (errors.email) onErrorClear('email');
          }}
          required
          className={getFieldClassName('email', 'bg-slate-800 text-white', errors)}
          placeholder="your@email.com"
        />
        {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
      </div>

      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
          <Phone className="w-4 h-4" />
          Phone Number
        </label>
        <Input
          value={formData.phone}
          onChange={(e) => onInputChange('phone', e.target.value)}
          className="bg-slate-800 border-slate-600 text-white"
          placeholder="+1 (555) 123-4567"
        />
      </div>

      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
          <MessageSquare className="w-4 h-4" />
          Service Needed *
        </label>
        <Select 
          value={formData.serviceType} 
          onValueChange={(value) => {
            onInputChange('serviceType', value);
            if (errors.serviceType) onErrorClear('serviceType');
          }}
        >
          <SelectTrigger className={getFieldClassName('serviceType', 'bg-slate-800 text-white', errors)}>
            <SelectValue placeholder="Select a service" />
          </SelectTrigger>
          <SelectContent>
            {serviceOptions.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.serviceType && <p className="text-red-400 text-sm mt-1">{errors.serviceType}</p>}
      </div>
    </div>
  );
};

export default PersonalInfoFields;
