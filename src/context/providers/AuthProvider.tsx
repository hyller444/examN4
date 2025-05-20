
import React, { createContext, useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import authService from '@/services/authService';
import { User, AuthContextType } from '../types/authTypes';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { toast } = useToast();
  const auth = authService();
  const navigate = useNavigate();

  // Check if user is authenticated on mount
  useEffect(() => {
    const loadUser = async () => {
      await checkAuth();
    };
    loadUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkAuth = async () => {
    setLoading(true);
    try {
      // Try to load user from localStorage first
      const storedUser = localStorage.getItem('user');
      const storedToken = localStorage.getItem('auth_token');
      
      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
        setLoading(false);
        return;
      }
      
      // If not in localStorage, try to fetch from API
      const response = await auth.getCurrentUser();
      if (response?.user) {
        setUser(response.user);
        // Save to localStorage for persistence
        localStorage.setItem('user', JSON.stringify(response.user));
      } else {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('auth_token');
      }
    } catch (error) {
      console.error('Authentication check failed', error);
      setUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('auth_token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    try {
      const response = await auth.login({ email, password });
      if (response?.user) {
        setUser(response.user);
        // Save to localStorage for persistence
        localStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('auth_token', response.token);
        
        toast({
          title: 'Connexion réussie',
          description: `Bienvenue ${response.user.name}`,
        });
        return true;
      }
      return false;
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erreur de connexion',
        description: 'Identifiants incorrects',
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (
    name: string, 
    email: string, 
    password: string, 
    passwordConfirmation: string
  ): Promise<boolean> => {
    setLoading(true);
    try {
      const response = await auth.register({ 
        name, 
        email, 
        password, 
        password_confirmation: passwordConfirmation 
      });

      if (response?.user) {
        setUser(response.user);
        // Save to localStorage for persistence
        localStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('auth_token', response.token);
        
        toast({
          title: 'Inscription réussie',
          description: `Bienvenue ${response.user.name}`,
        });
        return true;
      }
      return false;
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erreur d\'inscription',
        description: 'Impossible de créer votre compte',
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await auth.logout();
      setUser(null);
      // Clear local storage
      localStorage.removeItem('user');
      localStorage.removeItem('auth_token');
      
      toast({
        title: 'Déconnexion',
        description: 'Vous êtes bien déconnecté',
      });
      
      // Redirect to home page after logout
      navigate('/');
    } catch (error) {
      console.error('Logout failed', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      register, 
      logout,
      checkAuth 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
