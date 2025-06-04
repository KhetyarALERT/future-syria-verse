
import React from 'react';
import { DollarSign, Calendar } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormData, FormErrors, getFieldClassName } from './formValidation';
import { budgetOptions, timelineOptions } from './formOptions';

interface ProjectDetailsFieldsProps {
  formData: FormData;
  errors: FormErrors;
  onInputChange: (field: keyof FormData, value: string) => void;
  onErrorClear: (field: keyof FormErrors) => void;
}

const ProjectDetailsFields: React.FC<ProjectDetailsFieldsProps> = ({
  formData,
  errors,
  onInputChange,
  onErrorClear
}) => {
  return (
    <>
      <div>
        <label className="text-sm font-medium text-gray-300 mb-2 block">
          Business/Project Type *
        </label>
        <Input
          value={formData.businessType}
          onChange={(e) => {
            onInputChange('businessType', e.target.value);
            if (errors.businessType) onErrorClear('businessType');
          }}
          required
          className={getFieldClassName('businessType', 'bg-slate-800 text-white', errors)}
          placeholder="e.g., Restaurant, E-commerce, Clinic, Startup..."
        />
        {errors.businessType && <p className="text-red-400 text-sm mt-1">{errors.businessType}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
            <DollarSign className="w-4 h-4" />
            Budget Range
          </label>
          <Select value={formData.budget} onValueChange={(value) => onInputChange('budget', value)}>
            <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
              <SelectValue placeholder="Select budget range" />
            </SelectTrigger>
            <SelectContent>
              {budgetOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
            <Calendar className="w-4 h-4" />
            Timeline
          </label>
          <Select value={formData.timeline} onValueChange={(value) => onInputChange('timeline', value)}>
            <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
              <SelectValue placeholder="When do you need this?" />
            </SelectTrigger>
            <SelectContent>
              {timelineOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-300 mb-2 block">
          Project Requirements *
        </label>
        <Textarea
          value={formData.requirements}
          onChange={(e) => {
            onInputChange('requirements', e.target.value);
            if (errors.requirements) onErrorClear('requirements');
          }}
          required
          className={getFieldClassName('requirements', 'bg-slate-800 text-white min-h-[100px]', errors)}
          placeholder="Describe what you need in detail..."
        />
        {errors.requirements && <p className="text-red-400 text-sm mt-1">{errors.requirements}</p>}
      </div>

      <div>
        <label className="text-sm font-medium text-gray-300 mb-2 block">
          Additional Information
        </label>
        <Textarea
          value={formData.additionalInfo}
          onChange={(e) => onInputChange('additionalInfo', e.target.value)}
          className="bg-slate-800 border-slate-600 text-white"
          placeholder="Any additional details, inspiration, or specific requests..."
        />
      </div>
    </>
  );
};

export default ProjectDetailsFields;
