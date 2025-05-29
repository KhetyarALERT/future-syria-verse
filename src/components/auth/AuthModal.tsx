
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { X, Mail, Lock, User, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    phone: ''
  });

  const isRTL = i18n.language === 'ar';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              full_name: formData.fullName,
              phone: formData.phone
            }
          }
        });
        
        if (error) throw error;
        
        toast({
          title: i18n.language === 'ar' ? "تم إنشاء الحساب" : "Account created",
          description: i18n.language === 'ar' ? "تحقق من بريدك الإلكتروني لتأكيد الحساب" : "Check your email to confirm your account",
        });
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });
        
        if (error) throw error;
        
        toast({
          title: i18n.language === 'ar' ? "تم تسجيل الدخول" : "Signed in successfully",
          description: i18n.language === 'ar' ? "أهلاً بك مرة أخرى!" : "Welcome back!",
        });
        
        onClose();
      }
    } catch (error: any) {
      toast({
        title: i18n.language === 'ar' ? "خطأ" : "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      });
      
      if (error) throw error;
    } catch (error: any) {
      toast({
        title: i18n.language === 'ar' ? "خطأ" : "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className={`bg-slate-900 rounded-2xl p-6 w-full max-w-md ${isRTL ? 'rtl' : 'ltr'}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">
                {mode === 'signin' 
                  ? (i18n.language === 'ar' ? 'تسجيل الدخول' : 'Sign In')
                  : (i18n.language === 'ar' ? 'إنشاء حساب' : 'Sign Up')
                }
              </h2>
              <Button variant="ghost" onClick={onClose} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <>
                  <div>
                    <Label htmlFor="fullName" className="text-gray-300">
                      {i18n.language === 'ar' ? 'الاسم الكامل' : 'Full Name'}
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <Input
                        id="fullName"
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                        className="pl-10 bg-slate-800 border-slate-600 text-white"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-gray-300">
                      {i18n.language === 'ar' ? 'رقم الهاتف (اختياري)' : 'Phone (optional)'}
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        className="pl-10 bg-slate-800 border-slate-600 text-white"
                      />
                    </div>
                  </div>
                </>
              )}

              <div>
                <Label htmlFor="email" className="text-gray-300">
                  {i18n.language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="pl-10 bg-slate-800 border-slate-600 text-white"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password" className="text-gray-300">
                  {i18n.language === 'ar' ? 'كلمة المرور' : 'Password'}
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    className="pl-10 bg-slate-800 border-slate-600 text-white"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
              >
                {loading 
                  ? (i18n.language === 'ar' ? 'جارٍ التحميل...' : 'Loading...')
                  : mode === 'signin' 
                    ? (i18n.language === 'ar' ? 'تسجيل الدخول' : 'Sign In')
                    : (i18n.language === 'ar' ? 'إنشاء حساب' : 'Sign Up')
                }
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-600" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-slate-900 text-gray-400">
                    {i18n.language === 'ar' ? 'أو' : 'or'}
                  </span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full border-slate-600 text-white hover:bg-slate-800"
              >
                {i18n.language === 'ar' ? 'تسجيل الدخول بجوجل' : 'Continue with Google'}
              </Button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
                  className="text-cyan-400 hover:text-cyan-300 text-sm"
                >
                  {mode === 'signin' 
                    ? (i18n.language === 'ar' ? 'ليس لديك حساب؟ أنشئ حساباً جديداً' : "Don't have an account? Sign up")
                    : (i18n.language === 'ar' ? 'لديك حساب؟ سجل الدخول' : 'Already have an account? Sign in')
                  }
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
