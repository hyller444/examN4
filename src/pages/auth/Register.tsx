
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import Loader from '@/components/ui/Loader';
import AuthHeader from '@/components/auth/AuthHeader';
import EmailInput from '@/components/auth/EmailInput';
import PasswordInput from '@/components/auth/PasswordInput';
import NameInput from '@/components/auth/NameInput';
import RoleSelector from '@/components/auth/RoleSelector';
import TermsAndConditions from '@/components/auth/TermsAndConditions';
import AuthLayout from '@/components/auth/AuthLayout';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [role, setRole] = useState('customer');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();
  
  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!name) {
      newErrors.name = 'Le nom est requis';
    }
    
    if (!email) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email invalide';
    }
    
    if (!password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (password.length < 8) {
      newErrors.password = 'Le mot de passe doit contenir au moins 8 caractères';
    }
    
    if (!passwordConfirmation) {
      newErrors.passwordConfirmation = 'Veuillez confirmer votre mot de passe';
    } else if (password !== passwordConfirmation) {
      newErrors.passwordConfirmation = 'Les mots de passe ne correspondent pas';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsSubmitting(true);
    
    try {
      const success = await register(name, email, password, passwordConfirmation);
      
      if (success) {
        navigate('/');
      }
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <AuthLayout>
      <AuthHeader 
        title="Créer un nouveau compte"
        subtitle={
          <>
            Ou{' '}
            <Link to="/login" className="font-medium text-brand hover:text-brand/80">
              connectez-vous à votre compte existant
            </Link>
          </>
        }
      />
      
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <NameInput 
              name={name} 
              setName={setName} 
              error={errors.name} 
            />
            
            <EmailInput 
              email={email} 
              setEmail={setEmail} 
              error={errors.email} 
            />
            
            <PasswordInput 
              password={password} 
              setPassword={setPassword} 
              error={errors.password}
              autoComplete="new-password"
            />
            
            <PasswordInput 
              password={passwordConfirmation} 
              setPassword={setPasswordConfirmation} 
              error={errors.passwordConfirmation}
              label="Confirmer le mot de passe"
              autoComplete="new-password"
            />
            
            <RoleSelector role={role} setRole={setRole} />
            
            <div>
              <Button
                type="submit"
                className="w-full bg-brand hover:bg-brand/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? <Loader size="small" className="mr-2" /> : null}
                S'inscrire
              </Button>
            </div>
            
            <TermsAndConditions />
          </form>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Register;
