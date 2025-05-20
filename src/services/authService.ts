
import useApi from '../hooks/useApi';

// Types
export interface User {
  id: number;
  name: string;
  email: string;
  role: 'customer' | 'seller' | 'admin';
  avatar?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  role?: string;
}

// Utilisateurs de démonstration améliorés
const DEMO_USERS: User[] = [
  {
    id: 1,
    name: 'Client Demo',
    email: 'client@exemple.fr',
    role: 'customer',
    avatar: '/placeholder.svg'
  },
  {
    id: 2,
    name: 'Vendeur Demo',
    email: 'vendeur@exemple.fr',
    role: 'seller',
    avatar: '/placeholder.svg'
  },
  {
    id: 3,
    name: 'Admin Demo',
    email: 'admin@exemple.fr',
    role: 'admin',
    avatar: '/placeholder.svg'
  }
];

export const authService = () => {
  const { fetchData } = useApi();

  // Login user
  const login = async (credentials: LoginCredentials) => {
    try {
      // En mode développement sans backend, on simule l'authentification
      console.log('Login avec:', credentials);
      
      // Pour la démo, des identifiants simplifiés basés sur le début de l'email
      let user;
      
      if (credentials.email === 'client@exemple.fr') {
        user = DEMO_USERS.find(u => u.role === 'customer');
      } else if (credentials.email === 'vendeur@exemple.fr') {
        user = DEMO_USERS.find(u => u.role === 'seller');
      } else if (credentials.email === 'admin@exemple.fr') {
        user = DEMO_USERS.find(u => u.role === 'admin');
      } else if (credentials.email.includes('client')) {
        user = DEMO_USERS.find(u => u.role === 'customer');
      } else if (credentials.email.includes('vendeur') || credentials.email.includes('seller')) {
        user = DEMO_USERS.find(u => u.role === 'seller');
      } else if (credentials.email.includes('admin')) {
        user = DEMO_USERS.find(u => u.role === 'admin');
      } else {
        // Par défaut, on connecte en tant que client
        user = DEMO_USERS.find(u => u.role === 'customer');
      }
      
      if (user) {
        // Simuler un délai d'API
        await new Promise(resolve => setTimeout(resolve, 500));
        return {
          user,
          token: 'fake-jwt-token-' + Date.now()
        };
      }
      
      throw new Error('Identifiants invalides');
    } catch (error) {
      console.error('Erreur de login:', error);
      throw error;
    }
  };

  // Register a new user
  const register = async (userData: RegisterData) => {
    try {
      // En mode développement sans backend, on simule l'enregistrement
      console.log('Création de compte avec:', userData);
      
      // Simulation d'un délai d'API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Déterminer le rôle en fonction de l'email pour la démo
      let role = 'customer';
      if (userData.email === 'vendeur@exemple.fr' || userData.email.includes('vendeur') || userData.email.includes('seller')) {
        role = 'seller';
      } else if (userData.email === 'admin@exemple.fr' || userData.email.includes('admin')) {
        role = 'admin';
      }
      
      // Créer un faux utilisateur
      const newUser: User = {
        id: Date.now(),
        name: userData.name,
        email: userData.email,
        role: role as 'customer' | 'seller' | 'admin',
        avatar: '/placeholder.svg'
      };
      
      return {
        user: newUser,
        token: 'fake-jwt-token-' + Date.now()
      };
    } catch (error) {
      console.error('Erreur d\'inscription:', error);
      throw error;
    }
  };

  // Log out user
  const logout = async () => {
    // En mode développement, on simule la déconnexion
    await new Promise(resolve => setTimeout(resolve, 300));
    return { success: true };
  };

  // Get current user
  const getCurrentUser = async () => {
    try {
      // Pour la démo, on vérifie si un utilisateur est stocké dans localStorage
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        return { user: JSON.parse(storedUser) };
      }
      
      // Sinon, pas d'utilisateur connecté
      return { user: null };
    } catch (error) {
      console.error('Erreur de récupération utilisateur:', error);
      return { user: null };
    }
  };

  // Get all users (admin only)
  const getUsers = async () => {
    try {
      // En mode développement sans backend, on retourne des utilisateurs fictifs
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Générer plus d'utilisateurs pour la démo
      const additionalUsers = Array(10).fill(null).map((_, i) => ({
        id: 100 + i,
        name: `Utilisateur ${i + 1}`,
        email: `user${i+1}@exemple.fr`,
        role: i % 3 === 0 ? 'customer' : i % 3 === 1 ? 'seller' : 'customer',
        avatar: '/placeholder.svg'
      }));
      
      return { users: [...DEMO_USERS, ...additionalUsers] };
    } catch (error) {
      console.error('Erreur de récupération des utilisateurs:', error);
      throw error;
    }
  };

  return {
    login,
    register,
    logout,
    getCurrentUser,
    getUsers
  };
};

export default authService;
