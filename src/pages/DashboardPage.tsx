
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Briefcase, 
  MessageSquare, 
  Settings, 
  User, 
  LogOut,
  Bell, 
  Clock,
  BarChart3,
  Check,
  Loader2
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Profile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
}

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<any>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [consultations, setConsultations] = useState<any[]>([]);

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      
      if (!session) {
        setLoading(false);
        navigate('/auth');
        return;
      }
      
      await fetchUserData(session.user.id);
    };
    
    fetchSession();
  }, [navigate]);
  
  const fetchUserData = async (userId: string) => {
    try {
      // Fetch profile
      const { data: profileData, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();
        
      if (profileError) throw profileError;
      setProfile(profileData);
      
      // Fetch projects
      const { data: projectsData, error: projectsError } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
        
      if (projectsError) throw projectsError;
      setProjects(projectsData || []);
      
      // Fetch consultations
      const { data: consultationsData, error: consultationsError } = await supabase
        .from('service_consultations')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
        
      if (consultationsError) throw consultationsError;
      setConsultations(consultationsData || []);
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };
  
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-purple-500/20 border-b-purple-500 rounded-full animate-spin animate-reverse"></div>
          </div>
          <p className="text-white/70">Loading dashboard...</p>
        </div>
      </div>
    );
  }
  
  if (!session) {
    navigate('/auth');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <header className="bg-black/50 backdrop-blur-xl border-b border-white/10">
        <div className="container mx-auto p-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => navigate('/')}
              className="text-white hover:text-blue-400 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-semibold text-white">Dashboard</h1>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="sm"
              className="text-gray-300 hover:text-white hover:bg-white/10 rounded-full p-2"
            >
              <Bell className="w-5 h-5" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm"
              className="text-gray-300 hover:text-white hover:bg-white/10 rounded-full p-2"
              onClick={handleSignOut}
            >
              <LogOut className="w-5 h-5" />
            </Button>
            
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              {profile?.avatar_url ? (
                <img 
                  src={profile.avatar_url} 
                  alt={profile.full_name || 'User'} 
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <User className="w-4 h-4 text-white" />
              )}
            </div>
          </div>
        </div>
      </header>
      
      <div className="container mx-auto p-4 py-8">
        {/* User Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 mb-8"
        >
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
              {profile?.avatar_url ? (
                <img 
                  src={profile.avatar_url} 
                  alt={profile.full_name || 'User'} 
                  className="w-full h-full rounded-xl object-cover"
                />
              ) : (
                <User className="w-8 h-8 text-white" />
              )}
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-white">{profile?.full_name || session.user.email}</h2>
              <p className="text-gray-400">{session.user.email}</p>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/10 rounded-xl p-4 border border-white/5">
              <h3 className="text-gray-300 text-sm mb-1">Projects</h3>
              <p className="text-2xl text-white font-semibold">{projects.length}</p>
            </div>
            
            <div className="bg-white/10 rounded-xl p-4 border border-white/5">
              <h3 className="text-gray-300 text-sm mb-1">Consultations</h3>
              <p className="text-2xl text-white font-semibold">{consultations.length}</p>
            </div>
            
            <div className="bg-white/10 rounded-xl p-4 border border-white/5">
              <h3 className="text-gray-300 text-sm mb-1">Member Since</h3>
              <p className="text-2xl text-white font-semibold">{formatDate(session.user.created_at)}</p>
            </div>
          </div>
          
          <div className="mt-6 flex space-x-4">
            <Button
              variant="outline"
              onClick={() => navigate('/settings')}
              className="border-white/20 text-white hover:bg-white/10"
            >
              <Settings className="w-4 h-4 mr-2" />
              Account Settings
            </Button>
            
            <Button
              onClick={() => navigate('/inquiry')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              New Consultation
            </Button>
          </div>
        </motion.div>
        
        {/* Main Content */}
        <Tabs defaultValue="projects" className="space-y-8">
          <TabsList className="bg-white/10 border border-white/20">
            <TabsTrigger value="projects" className="data-[state=active]:bg-white/20">Projects</TabsTrigger>
            <TabsTrigger value="consultations" className="data-[state=active]:bg-white/20">Consultations</TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-white/20">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="projects" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-medium text-white">Your Projects</h3>
              <Button
                variant="outline"
                onClick={() => navigate('/services')}
                className="border-white/20 text-white hover:bg-white/10"
              >
                <Briefcase className="w-4 h-4 mr-2" />
                New Project
              </Button>
            </div>
            
            {projects.length > 0 ? (
              <div className="space-y-4">
                {projects.map(project => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10"
                  >
                    <div className="flex justify-between">
                      <h4 className="text-lg font-medium text-white">{project.title}</h4>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        project.status === 'in_progress' ? 'bg-yellow-500/20 text-yellow-300' :
                        project.status === 'completed' ? 'bg-green-500/20 text-green-300' :
                        project.status === 'cancelled' ? 'bg-red-500/20 text-red-300' :
                        'bg-blue-500/20 text-blue-300'
                      }`}>
                        {project.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </span>
                    </div>
                    <p className="text-gray-300 my-2">{project.description}</p>
                    <div className="flex justify-between text-sm text-gray-400 mt-4">
                      <div className="flex items-center">
                        <Briefcase className="w-4 h-4 mr-1" />
                        <span>{project.service_type}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{formatDate(project.created_at)}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="bg-white/5 backdrop-blur-sm p-10 rounded-xl border border-white/10 text-center">
                <Briefcase className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                <h4 className="text-xl font-medium text-white mb-2">No projects yet</h4>
                <p className="text-gray-400 mb-6">Start a new project to see it here</p>
                <Button
                  onClick={() => navigate('/services')}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                >
                  Browse Services
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="consultations" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-medium text-white">Your Consultations</h3>
              <Button
                variant="outline"
                onClick={() => document.getElementById('chat-trigger')?.click()}
                className="border-white/20 text-white hover:bg-white/10"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                AI Consultation
              </Button>
            </div>
            
            {consultations.length > 0 ? (
              <div className="space-y-4">
                {consultations.map(consultation => (
                  <motion.div
                    key={consultation.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10"
                  >
                    <div className="flex justify-between">
                      <h4 className="text-lg font-medium text-white">{consultation.service_type} Consultation</h4>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        consultation.status === 'pending' ? 'bg-yellow-500/20 text-yellow-300' :
                        consultation.status === 'scheduled' ? 'bg-blue-500/20 text-blue-300' :
                        consultation.status === 'completed' ? 'bg-green-500/20 text-green-300' :
                        'bg-red-500/20 text-red-300'
                      }`}>
                        {consultation.status.charAt(0).toUpperCase() + consultation.status.slice(1)}
                      </span>
                    </div>
                    
                    {consultation.scheduled_at && (
                      <div className="bg-white/10 p-3 rounded-lg mt-3 inline-block">
                        <div className="flex items-center text-gray-200">
                          <Clock className="w-4 h-4 mr-2" />
                          <span>{new Date(consultation.scheduled_at).toLocaleString()}</span>
                        </div>
                      </div>
                    )}
                    
                    {consultation.consultant_notes && (
                      <div className="mt-4">
                        <h5 className="text-sm text-gray-300 mb-1">Consultant Notes:</h5>
                        <p className="text-white bg-white/10 p-3 rounded-lg">{consultation.consultant_notes}</p>
                      </div>
                    )}
                    
                    <div className="flex justify-between text-sm text-gray-400 mt-4">
                      <div className="flex items-center">
                        {consultation.follow_up_required && (
                          <span className="flex items-center text-yellow-300">
                            <Bell className="w-4 h-4 mr-1" />
                            Follow-up required
                          </span>
                        )}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{formatDate(consultation.created_at)}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="bg-white/5 backdrop-blur-sm p-10 rounded-xl border border-white/10 text-center">
                <MessageSquare className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                <h4 className="text-xl font-medium text-white mb-2">No consultations yet</h4>
                <p className="text-gray-400 mb-6">Book a consultation to get personalized advice</p>
                <Button
                  onClick={() => document.getElementById('chat-trigger')?.click()}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                >
                  Start AI Consultation
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="analytics" className="space-y-6">
            <h3 className="text-xl font-medium text-white">Activity Analytics</h3>
            
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
              <div className="flex justify-between items-center mb-6">
                <h4 className="text-lg text-white">Usage Overview</h4>
                <select className="bg-white/10 border border-white/20 rounded-lg text-white px-3 py-1 text-sm">
                  <option value="last30days">Last 30 Days</option>
                  <option value="last6months">Last 6 Months</option>
                  <option value="allyear">All Year</option>
                </select>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white/10 p-4 rounded-xl">
                  <h5 className="text-gray-300 text-sm mb-1">AI Interactions</h5>
                  <p className="text-3xl font-bold text-white">24</p>
                  <div className="text-green-400 text-xs mt-2 flex items-center">
                    <BarChart3 className="w-3 h-3 mr-1" />
                    <span>12% increase</span>
                  </div>
                </div>
                
                <div className="bg-white/10 p-4 rounded-xl">
                  <h5 className="text-gray-300 text-sm mb-1">Projects Started</h5>
                  <p className="text-3xl font-bold text-white">3</p>
                  <div className="text-blue-400 text-xs mt-2 flex items-center">
                    <BarChart3 className="w-3 h-3 mr-1" />
                    <span>New this month</span>
                  </div>
                </div>
                
                <div className="bg-white/10 p-4 rounded-xl">
                  <h5 className="text-gray-300 text-sm mb-1">Active Services</h5>
                  <p className="text-3xl font-bold text-white">2</p>
                  <div className="text-purple-400 text-xs mt-2 flex items-center">
                    <Check className="w-3 h-3 mr-1" />
                    <span>All services active</span>
                  </div>
                </div>
              </div>
              
              {/* Placeholder for chart */}
              <div className="h-60 bg-white/10 rounded-xl flex items-center justify-center">
                <p className="text-gray-400">Activity chart will appear here</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DashboardPage;
