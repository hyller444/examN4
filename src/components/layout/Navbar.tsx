
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  ShoppingCart, Menu, X, User, Search, Package, Home, 
  ShoppingBag, LayoutDashboard, List
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSeller, setIsSeller] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  
  useEffect(() => {
    if (user) {
      setIsSeller(user.role === 'seller' || user.role === 'admin');
      setIsAdmin(user.role === 'admin');
    } else {
      setIsSeller(false);
      setIsAdmin(false);
    }
  }, [user]);
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = async () => {
    await logout();
    setIsMenuOpen(false);
  };

  // Détermine si nous sommes dans l'interface vendeur
  const isSellerInterface = location.pathname.startsWith('/seller');
  // Détermine si nous sommes dans l'interface admin
  const isAdminInterface = location.pathname.startsWith('/admin');

  return (
    <nav className={`${isSellerInterface ? 'bg-blue-50 border-blue-200' : isAdminInterface ? 'bg-purple-50 border-purple-200' : 'bg-white'} shadow-sm border-b`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Package className={`h-8 w-8 ${isSellerInterface ? 'text-blue-600' : isAdminInterface ? 'text-purple-600' : 'text-brand'}`} />
              <span className={`ml-2 text-xl font-bold ${isSellerInterface ? 'text-blue-600' : isAdminInterface ? 'text-purple-600' : 'text-brand'}`}>
                {isSellerInterface ? 'EShop Vendeur' : isAdminInterface ? 'EShop Admin' : 'EShop'}
              </span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              {/* Navigation pour tous les utilisateurs */}
              {!isSellerInterface && !isAdminInterface && (
                <>
                  <Link to="/" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 border-b-2 border-transparent hover:border-brand hover:text-brand">
                    <Home className="mr-1 h-4 w-4" />
                    Accueil
                  </Link>
                  <Link to="/products" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 border-b-2 border-transparent hover:border-brand hover:text-brand">
                    <List className="mr-1 h-4 w-4" />
                    Produits
                  </Link>
                </>
              )}
              
              {/* Navigation pour l'interface vendeur */}
              {isSellerInterface && (
                <>
                  <Link to="/seller/dashboard" className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${location.pathname === '/seller/dashboard' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 border-b-2 border-transparent hover:border-blue-600 hover:text-blue-600'}`}>
                    <LayoutDashboard className="mr-1 h-4 w-4" />
                    Tableau de bord
                  </Link>
                  <Link to="/seller/products" className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${location.pathname.includes('/seller/products') ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 border-b-2 border-transparent hover:border-blue-600 hover:text-blue-600'}`}>
                    <Package className="mr-1 h-4 w-4" />
                    Produits
                  </Link>
                  <Link to="/seller/orders" className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${location.pathname === '/seller/orders' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 border-b-2 border-transparent hover:border-blue-600 hover:text-blue-600'}`}>
                    <ShoppingBag className="mr-1 h-4 w-4" />
                    Commandes
                  </Link>
                </>
              )}
              
              {/* Navigation pour l'interface admin */}
              {isAdminInterface && (
                <>
                  <Link to="/admin/dashboard" className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${location.pathname === '/admin/dashboard' ? 'border-b-2 border-purple-600 text-purple-600' : 'text-gray-500 border-b-2 border-transparent hover:border-purple-600 hover:text-purple-600'}`}>
                    <LayoutDashboard className="mr-1 h-4 w-4" />
                    Tableau de bord
                  </Link>
                  <Link to="/admin/products" className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${location.pathname === '/admin/products' ? 'border-b-2 border-purple-600 text-purple-600' : 'text-gray-500 border-b-2 border-transparent hover:border-purple-600 hover:text-purple-600'}`}>
                    <Package className="mr-1 h-4 w-4" />
                    Produits
                  </Link>
                  <Link to="/admin/users" className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${location.pathname === '/admin/users' ? 'border-b-2 border-purple-600 text-purple-600' : 'text-gray-500 border-b-2 border-transparent hover:border-purple-600 hover:text-purple-600'}`}>
                    <User className="mr-1 h-4 w-4" />
                    Utilisateurs
                  </Link>
                </>
              )}
            </div>
          </div>
          
          {/* Right side icons */}
          <div className="hidden md:flex items-center">
            <div className="flex items-center space-x-4">
              {/* Afficher la barre de recherche uniquement sur l'interface client */}
              {!isSellerInterface && !isAdminInterface && (
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Rechercher..."
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              )}
              
              {/* Afficher le panier uniquement sur l'interface client */}
              {!isSellerInterface && !isAdminInterface && (
                <Link to="/cart" className="relative text-gray-600 hover:text-brand">
                  <ShoppingCart className="h-6 w-6" />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-brand text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItems.length}
                    </span>
                  )}
                </Link>
              )}
              
              {/* Interface de compte utilisateur pour tous */}
              {user ? (
                <div className="relative group">
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <User className="h-5 w-5" />
                    <span>{user.name}</span>
                  </Button>
                  <div className="absolute z-10 right-0 w-48 mt-2 origin-top-right bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-150 ease-in-out">
                    <div className="py-1">
                      {/* Liens communs à tous les utilisateurs connectés */}
                      <Link to="/account/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Mon Profil
                      </Link>
                      
                      {/* Liens spécifiques aux clients */}
                      {!isSellerInterface && !isAdminInterface && (
                        <Link to="/account/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Mes Commandes
                        </Link>
                      )}
                      
                      {/* Liens spécifiques aux vendeurs */}
                      {isSeller && !isSellerInterface && (
                        <Link to="/seller/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Espace Vendeur
                        </Link>
                      )}
                      
                      {/* Liens spécifiques aux admins */}
                      {isAdmin && !isAdminInterface && (
                        <Link to="/admin/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Admin
                        </Link>
                      )}
                      
                      {/* Lien pour revenir à l'interface client */}
                      {(isSellerInterface || isAdminInterface) && (
                        <Link to="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Interface Client
                        </Link>
                      )}
                      
                      <button 
                        onClick={handleLogout}
                        className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Déconnexion
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex space-x-2">
                  <Button variant="outline" asChild>
                    <Link to="/login">Connexion</Link>
                  </Button>
                  <Button className="bg-brand hover:bg-brand/90" asChild>
                    <Link to="/register">Inscription</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {/* Menu mobile pour interface client */}
            {!isSellerInterface && !isAdminInterface && (
              <>
                <Link 
                  to="/" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Accueil
                </Link>
                <Link 
                  to="/products" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Produits
                </Link>
                <Link 
                  to="/cart" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Panier 
                  {cartItems.length > 0 && (
                    <span className="ml-2 bg-brand text-white text-xs rounded-full h-5 w-5 inline-flex items-center justify-center">
                      {cartItems.length}
                    </span>
                  )}
                </Link>
              </>
            )}
            
            {/* Menu mobile pour interface vendeur */}
            {isSellerInterface && (
              <>
                <Link 
                  to="/seller/dashboard" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Tableau de bord
                </Link>
                <Link 
                  to="/seller/products" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Produits
                </Link>
                <Link 
                  to="/seller/orders" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Commandes
                </Link>
              </>
            )}
            
            {/* Menu mobile pour interface admin */}
            {isAdminInterface && (
              <>
                <Link 
                  to="/admin/dashboard" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Tableau de bord
                </Link>
                <Link 
                  to="/admin/products" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Produits
                </Link>
                <Link 
                  to="/admin/users" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Utilisateurs
                </Link>
              </>
            )}
            
            {/* Sections communes du menu mobile */}
            {user ? (
              <>
                <Link 
                  to="/account/profile" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Mon Profil
                </Link>
                
                {!isSellerInterface && !isAdminInterface && (
                  <Link 
                    to="/account/orders" 
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Mes Commandes
                  </Link>
                )}
                
                {isSeller && !isSellerInterface && (
                  <Link 
                    to="/seller/dashboard" 
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Espace Vendeur
                  </Link>
                )}
                
                {isAdmin && !isAdminInterface && (
                  <Link 
                    to="/admin/dashboard" 
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Admin
                  </Link>
                )}
                
                {(isSellerInterface || isAdminInterface) && (
                  <Link 
                    to="/" 
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Interface Client
                  </Link>
                )}
                
                <button 
                  onClick={handleLogout}
                  className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Connexion
                </Link>
                <Link 
                  to="/register" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Inscription
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
