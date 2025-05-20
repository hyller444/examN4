
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import Loader from '@/components/ui/Loader';
import AuthHeader from '@/components/auth/AuthHeader';
import EmailInput from '@/components/auth/EmailInput';
import PasswordInput from '@/components/auth/PasswordInput';
import RememberMe from '@/components/auth/RememberMe';
import SocialLogin from '@/components/auth/SocialLogin';
import AuthLayout from '@/components/auth/AuthLayout';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!email) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email invalide';
    }
    
    if (!password) {
      newErrors.password = 'Le mot de passe est requis';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsSubmitting(true);
    
    try {
      const success = await login(email, password);
      
      if (success) {
        navigate('/');
      }
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <AuthLayout>
      <AuthHeader 
        title="Connectez-vous à votre compte"
        subtitle={
          <>
            Ou{' '}
            <Link to="/register" className="font-medium text-brand hover:text-brand/80">
              créez un nouveau compte
            </Link>
          </>
        }
      />
      
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <EmailInput 
              email={email} 
              setEmail={setEmail} 
              error={errors.email} 
            />
            
            <PasswordInput 
              password={password} 
              setPassword={setPassword} 
              error={errors.password}
              showForgotPassword={true}
            />
            
            <RememberMe />
            
            <div>
              <Button
                type="submit"
                className="w-full bg-brand hover:bg-brand/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? <Loader size="small" className="mr-2" /> : null}
                Se connecter
              </Button>
            </div>
          </form>
          
          <SocialLogin />
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
