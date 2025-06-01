
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, MessageSquare, Settings, LogOut, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

interface UserProfile {
  id: string;
  email: string;
  created_at: string;
}

interface Inquiry {
  id: string;
  inquiry_text: string;
  inquiry_type: string;
  status: string;
  created_at: string;
}

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
    fetchUserInquiries();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/auth');
      return;
    }
    
    setUser({
      id: session.user.id,
      email: session.user.email || '',
      created_at: session.user.created_at
    });
    setIsLoading(false);
  };

  const fetchUserInquiries = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data, error } = await supabase
        .from('inquiries')
        .select('*')
        .eq('email', session.user.email)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setInquiries(data || []);
    } catch (error) {
      console.error('Error fetching inquiries:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast({
        title: "Signed out successfully",
        description: "You have been logged out.",
      });
      
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: "Error",
        description: "There was an error signing out.",
        variant: "destructive"
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-500';
      case 'in_progress': return 'bg-yellow-500';
      case 'resolved': return 'bg-green-500';
      case 'closed': return 'bg-gray-500';
      default: return 'bg-purple-500';
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-20 pb-20">
      <div className="container mx-auto px-4">
        <motion.button
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex items-center space-x-2 text-white mb-8 hover:text-blue-400 transition-colors"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
            <p className="text-gray-300">Welcome back, {user?.email}</p>
          </div>
          <Button
            onClick={handleSignOut}
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6"
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">Profile</h3>
                <p className="text-gray-400">Manage your account</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400">Email</label>
                <p className="text-white">{user?.email}</p>
              </div>
              <div>
                <label className="text-sm text-gray-400">Member Since</label>
                <p className="text-white">{user?.created_at ? formatDate(user.created_at) : 'N/A'}</p>
              </div>
            </div>

            <Button
              onClick={() => navigate('/services')}
              className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Settings className="w-4 h-4 mr-2" />
              Explore Services
            </Button>
          </motion.div>

          {/* Inquiries */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <MessageSquare className="w-6 h-6 text-blue-400" />
                <h3 className="text-xl font-semibold text-white">Your Inquiries</h3>
              </div>
              <Button
                onClick={() => navigate('/services')}
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                New Inquiry
              </Button>
            </div>

            {inquiries.length > 0 ? (
              <div className="space-y-4">
                {inquiries.slice(0, 5).map((inquiry) => (
                  <div
                    key={inquiry.id}
                    className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-white font-medium capitalize">
                        {inquiry.inquiry_type.replace('_', ' ')}
                      </h4>
                      <span className={`${getStatusColor(inquiry.status)} text-xs text-white px-2 py-1 rounded-full`}>
                        {inquiry.status}
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                      {inquiry.inquiry_text}
                    </p>
                    <div className="flex justify-between items-center text-xs text-gray-400">
                      <span>Submitted: {formatDate(inquiry.created_at)}</span>
                      <Activity className="w-3 h-3" />
                    </div>
                  </div>
                ))}
                
                {inquiries.length > 5 && (
                  <div className="text-center">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-white/30 text-white hover:bg-white/10"
                    >
                      View All Inquiries ({inquiries.length})
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-white mb-2">No inquiries yet</h4>
                <p className="text-gray-400 mb-4">
                  Start by exploring our services and submitting your first inquiry.
                </p>
                <Button
                  onClick={() => navigate('/services')}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Explore Services
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
