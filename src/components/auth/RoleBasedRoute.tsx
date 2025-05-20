
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Loader from '@/components/ui/Loader';

interface RoleBasedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
  redirectPath?: string;
}

const RoleBasedRoute: React.FC<RoleBasedRouteProps> = ({ 
  children, 
  allowedRoles,
  redirectPath = '/'
}) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  
  // Si l'authentification est en cours, afficher un indicateur de chargement
  if (loading) {
    return <div className="flex justify-center items-center h-screen"><Loader size="large" /></div>;
  }
  
  // Si l'utilisateur n'est pas connecté, rediriger vers la page de connexion
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  // Si l'utilisateur n'a pas le rôle requis, rediriger vers la page appropriée
  if (!allowedRoles.includes(user.role)) {
    // Redirection spécifique selon le rôle
    if (user.role === 'seller') {
      return <Navigate to="/seller/dashboard" replace />;
    } else if (user.role === 'admin') {
      return <Navigate to="/admin/dashboard" replace />;
    } else {
      return <Navigate to={redirectPath} replace />;
    }
  }
  
  // Sinon, afficher le contenu protégé
  return <>{children}</>;
};

export default RoleBasedRoute;
