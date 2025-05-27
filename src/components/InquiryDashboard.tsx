
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Eye, MessageSquare, Phone, Mail, Clock, Filter } from 'lucide-react';

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  inquiry_type: string;
  inquiry_text: string;
  status: string;
  language: string;
  created_at: string;
  metadata?: any;
}

const InquiryDashboard: React.FC = () => {
  const { toast } = useToast();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    fetchInquiries();
    setupRealtime();
  }, []);

  const fetchInquiries = async () => {
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setInquiries(data || []);
    } catch (error) {
      console.error('Error fetching inquiries:', error);
      toast({
        title: 'Error',
        description: 'Failed to load inquiries',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const setupRealtime = () => {
    const channel = supabase
      .channel('inquiries-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'inquiries'
        },
        (payload) => {
          console.log('New inquiry:', payload);
          setInquiries(prev => [payload.new as Inquiry, ...prev]);
          toast({
            title: '🔔 New Inquiry Received!',
            description: `New ${payload.new.inquiry_type} from ${payload.new.name}`,
          });
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'inquiries'
        },
        (payload) => {
          console.log('Inquiry updated:', payload);
          setInquiries(prev => 
            prev.map(inquiry => 
              inquiry.id === payload.new.id ? payload.new as Inquiry : inquiry
            )
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const updateInquiryStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('inquiries')
        .update({ status })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Status Updated',
        description: `Inquiry status changed to ${status}`,
      });
    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        title: 'Error',
        description: 'Failed to update status',
        variant: 'destructive'
      });
    }
  };

  const filteredInquiries = inquiries.filter(inquiry => {
    const typeMatch = filter === 'all' || inquiry.inquiry_type === filter;
    const statusMatch = statusFilter === 'all' || inquiry.status === statusFilter;
    return typeMatch && statusMatch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'resolved': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'closed': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'service_inquiry': return '🔧';
      case 'support_request': return '🆘';
      case 'complaint': return '😠';
      case 'suggestion': return '💡';
      default: return '📝';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-purple-900">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/50">
          {/* Header */}
          <div className="p-6 border-b border-gray-200 dark:border-slate-600">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                  📋 Inquiry Dashboard
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  Real-time monitoring of customer inquiries
                </p>
              </div>
              
              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-gray-500" />
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-800 dark:text-gray-200"
                  >
                    <option value="all">All Types</option>
                    <option value="general">General</option>
                    <option value="service_inquiry">Service Inquiry</option>
                    <option value="support_request">Support Request</option>
                    <option value="complaint">Complaint</option>
                    <option value="suggestion">Suggestion</option>
                  </select>
                </div>
                
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-800 dark:text-gray-200"
                >
                  <option value="all">All Status</option>
                  <option value="new">New</option>
                  <option value="in_progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="p-6 border-b border-gray-200 dark:border-slate-600">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {inquiries.filter(i => i.status === 'new').length}
                </div>
                <div className="text-sm text-green-600 dark:text-green-400">New</div>
              </div>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
                <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                  {inquiries.filter(i => i.status === 'in_progress').length}
                </div>
                <div className="text-sm text-yellow-600 dark:text-yellow-400">In Progress</div>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {inquiries.filter(i => i.status === 'resolved').length}
                </div>
                <div className="text-sm text-blue-600 dark:text-blue-400">Resolved</div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900/20 rounded-lg p-4">
                <div className="text-2xl font-bold text-gray-600 dark:text-gray-400">
                  {inquiries.length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total</div>
              </div>
            </div>
          </div>

          {/* Inquiries List */}
          <div className="p-6">
            {filteredInquiries.length === 0 ? (
              <div className="text-center py-12">
                <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">No inquiries found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredInquiries.map((inquiry) => (
                  <div
                    key={inquiry.id}
                    className="bg-white dark:bg-slate-700 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-slate-600 hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start gap-3 mb-4">
                          <div className="text-2xl">{getTypeIcon(inquiry.inquiry_type)}</div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold text-gray-800 dark:text-white">
                                {inquiry.name}
                              </h3>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(inquiry.status)}`}>
                                {inquiry.status.replace('_', ' ')}
                              </span>
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {inquiry.language === 'ar' ? '🇸🇾' : '🇺🇸'}
                              </span>
                            </div>
                            
                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-300 mb-3">
                              <div className="flex items-center gap-1">
                                <Mail className="w-4 h-4" />
                                {inquiry.email}
                              </div>
                              {inquiry.phone && (
                                <div className="flex items-center gap-1">
                                  <Phone className="w-4 h-4" />
                                  {inquiry.phone}
                                </div>
                              )}
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {new Date(inquiry.created_at).toLocaleString()}
                              </div>
                            </div>
                            
                            <p className={`text-gray-700 dark:text-gray-300 ${inquiry.language === 'ar' ? 'text-right font-arabic' : ''}`}>
                              {inquiry.inquiry_text}
                            </p>
                            
                            {inquiry.metadata?.source === 'chatbot' && (
                              <div className="mt-2 text-xs text-blue-600 dark:text-blue-400">
                                📱 Generated from AI Chat
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        <select
                          value={inquiry.status}
                          onChange={(e) => updateInquiryStatus(inquiry.id, e.target.value)}
                          className="px-3 py-1 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-800 dark:text-gray-200 text-sm"
                        >
                          <option value="new">New</option>
                          <option value="in_progress">In Progress</option>
                          <option value="resolved">Resolved</option>
                          <option value="closed">Closed</option>
                        </select>
                        
                        <a
                          href={`mailto:${inquiry.email}?subject=Re: ${inquiry.inquiry_type}&body=Dear ${inquiry.name},%0A%0AThank you for your inquiry...`}
                          className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm text-center transition-colors"
                        >
                          Reply
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InquiryDashboard;
