
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Key, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface ApiKeySetupProps {
  onApiKeySet: () => void;
}

const ApiKeySetup: React.FC<ApiKeySetupProps> = ({ onApiKeySet }) => {
  const [apiKey, setApiKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!apiKey.trim()) {
      toast({
        title: "API Key Required",
        description: "Please enter your OpenRouter API key",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Store the API key (in a real app, this would be sent securely to the backend)
      localStorage.setItem('openrouter_api_key', apiKey);
      
      toast({
        title: "API Key Set Successfully",
        description: "AI chat is now enabled",
      });
      
      onApiKeySet();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to set API key",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto bg-slate-800/50 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6"
    >
      <div className="text-center mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
          <Key className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">AI Chat Setup</h3>
        <p className="text-gray-400 text-sm">
          To enable AI chat, please provide your OpenRouter API key
        </p>
      </div>

      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 mb-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-blue-200">
            <p className="font-medium mb-1">How to get your API key:</p>
            <ol className="list-decimal list-inside space-y-1 text-blue-300">
              <li>Visit <a href="https://openrouter.ai" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-200">openrouter.ai</a></li>
              <li>Create an account and get your API key</li>
              <li>Paste it below to enable AI chat</li>
            </ol>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="password"
          placeholder="sk-or-..."
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          className="bg-slate-700/50 border-slate-600/50 text-white placeholder:text-gray-400"
        />
        
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Setting up...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Enable AI Chat
            </div>
          )}
        </Button>
      </form>
    </motion.div>
  );
};

export default ApiKeySetup;
