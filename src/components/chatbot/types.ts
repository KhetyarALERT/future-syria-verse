
export interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

export interface ChatLabels {
  title: string;
  placeholder: string;
  send: string;
  typing: string;
  welcome: string;
  error: string;
  inquiryCreated: string;
  supportOptions: {
    complaint: string;
    inquiry: string;
    suggestion: string;
    other: string;
  };
}

export type Language = 'ar' | 'en';
