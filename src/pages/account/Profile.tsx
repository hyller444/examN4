import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, User } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      toast({
        variant: 'destructive',
        title: 'Accès refusé',
        description: 'Vous devez être connecté pour accéder à cette page',
      });
      navigate('/login');
    }
  }, [user, loading, navigate, toast]);
  
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand"></div>
      </div>
    );
  }
  
  if (!user) {
    return null; // Will redirect via useEffect
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Link to="/" className="inline-flex items-center text-gray-600 hover:text-brand">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour à l'accueil
            </Link>
          </div>
          
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="border-b px-6 py-4">
              <h1 className="text-xl font-semibold text-gray-900">Mon profil</h1>
            </div>
            
            <div className="px-6 py-4">
              <div className="flex items-center space-x-4 mb-6">
                <div className="h-20 w-20 rounded-full bg-gray-100 flex items-center justify-center">
                  <User className="h-10 w-10 text-gray-400" />
                </div>
                <div>
                  <h2 className="text-lg font-medium">{user?.name}</h2>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-base font-medium mb-2">Informations personnelles</h3>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Nom</p>
                        <p>{user.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p>{user.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Téléphone</p>
                        <p>+33 6 12 34 56 78</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-base font-medium mb-2">Adresse de livraison</h3>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p>123 Rue Example</p>
                    <p>75000 Paris</p>
                    <p>France</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-base font-medium mb-2">Préférences</h3>
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Newsletters</p>
                      <p className="text-sm text-gray-500">Recevoir des offres et actualités</p>
                    </div>
                    <div>
                      <Button variant="outline" size="sm">Gérer</Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-4">
                <Button>Modifier le profil</Button>
                <Button variant="outline">Changer le mot de passe</Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
