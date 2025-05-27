
import React from 'react';
import ArabicInquiryForm from '../components/ArabicInquiryForm';
import AIChatbot from '../components/AIChatbot';

const InquiryPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-purple-900">
      <div className="container mx-auto px-4 py-8">
        <ArabicInquiryForm />
      </div>
      <AIChatbot />
    </div>
  );
};

export default InquiryPage;
