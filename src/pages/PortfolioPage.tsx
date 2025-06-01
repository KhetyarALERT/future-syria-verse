
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Briefcase, Calendar, Clock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';

interface Project {
  id: string;
  title: string;
  description: string;
  service_type: string;
  status: string;
  created_at: string;
  updated_at: string;
}

const PortfolioPage: React.FC = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);
      
      if (session) {
        fetchUserProjects();
      } else {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const fetchUserProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-500';
      case 'submitted': return 'bg-blue-500';
      case 'in_progress': return 'bg-yellow-500';
      case 'completed': return 'bg-green-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-purple-500';
    }
  };

  const getStatusLabel = (status: string) => {
    return status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const getServiceIcon = (serviceType: string) => {
    return Briefcase; // For simplicity, using Briefcase for all services
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };

  const handleLogin = () => {
    navigate('/auth');
  };

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
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Your Projects
          </h1>
          <p className="text-xl text-gray-300">
            Track the progress of your digital transformation journey with us.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                <div className="flex justify-between items-center mb-4">
                  <Skeleton className="h-8 w-1/3 bg-white/10" />
                  <Skeleton className="h-6 w-24 bg-white/10 rounded-full" />
                </div>
                <Skeleton className="h-4 w-5/6 bg-white/10 mb-2" />
                <Skeleton className="h-4 w-2/3 bg-white/10 mb-6" />
                <div className="flex justify-between">
                  <Skeleton className="h-5 w-28 bg-white/10" />
                  <Skeleton className="h-5 w-28 bg-white/10" />
                </div>
              </div>
            ))}
          </div>
        ) : isLoggedIn ? (
          projects.length > 0 ? (
            <Tabs defaultValue="all">
              <TabsList className="bg-white/10 border border-white/20 mb-8 mx-auto">
                <TabsTrigger value="all" className="data-[state=active]:bg-white/20">All Projects</TabsTrigger>
                <TabsTrigger value="in_progress" className="data-[state=active]:bg-white/20">In Progress</TabsTrigger>
                <TabsTrigger value="completed" className="data-[state=active]:bg-white/20">Completed</TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                <ProjectsList projects={projects} containerVariants={containerVariants} itemVariants={itemVariants} getStatusColor={getStatusColor} getStatusLabel={getStatusLabel} formatDate={formatDate} getServiceIcon={getServiceIcon} />
              </TabsContent>

              <TabsContent value="in_progress">
                <ProjectsList projects={projects.filter(p => p.status === 'in_progress')} containerVariants={containerVariants} itemVariants={itemVariants} getStatusColor={getStatusColor} getStatusLabel={getStatusLabel} formatDate={formatDate} getServiceIcon={getServiceIcon} />
              </TabsContent>

              <TabsContent value="completed">
                <ProjectsList projects={projects.filter(p => p.status === 'completed')} containerVariants={containerVariants} itemVariants={itemVariants} getStatusColor={getStatusColor} getStatusLabel={getStatusLabel} formatDate={formatDate} getServiceIcon={getServiceIcon} />
              </TabsContent>
            </Tabs>
          ) : (
            <motion.div 
              className="text-center bg-white/5 backdrop-blur-md rounded-2xl border border-white/20 p-10 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-white mb-2">No projects yet</h2>
              <p className="text-gray-400 mb-6">You haven't started any projects with us yet. Ready to begin?</p>
              <button
                onClick={() => navigate('/services')}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-full text-white font-medium"
              >
                Explore Our Services
              </button>
            </motion.div>
          )
        ) : (
          <motion.div 
            className="text-center bg-white/5 backdrop-blur-md rounded-2xl border border-white/20 p-10 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-white mb-2">Sign in to view your projects</h2>
            <p className="text-gray-400 mb-6">Please log in to see your project portfolio and track progress.</p>
            <button
              onClick={handleLogin}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-full text-white font-medium"
            >
              Sign In
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

interface ProjectsListProps {
  projects: Project[];
  containerVariants: any;
  itemVariants: any;
  getStatusColor: (status: string) => string;
  getStatusLabel: (status: string) => string;
  formatDate: (dateStr: string) => string;
  getServiceIcon: (serviceType: string) => any;
}

const ProjectsList: React.FC<ProjectsListProps> = ({ 
  projects, 
  containerVariants, 
  itemVariants, 
  getStatusColor, 
  getStatusLabel, 
  formatDate,
  getServiceIcon 
}) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      {projects.map((project) => {
        const ServiceIcon = getServiceIcon(project.service_type);
        return (
          <motion.div
            key={project.id}
            variants={itemVariants}
            className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-white/20 transition-all"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                <ServiceIcon className="w-5 h-5 text-blue-400" />
                {project.title}
              </h3>
              <span className={`${getStatusColor(project.status)} text-xs text-white px-3 py-1 rounded-full`}>
                {getStatusLabel(project.status)}
              </span>
            </div>
            <p className="text-gray-300 mb-4">{project.description}</p>
            <div className="flex justify-between text-sm text-gray-400">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                <span>Created: {formatDate(project.created_at)}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                <span>Updated: {formatDate(project.updated_at)}</span>
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default PortfolioPage;
