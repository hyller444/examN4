
import React from 'react';
import { Link } from 'react-router-dom';
import { Package, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-100">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center">
              <Package className="h-8 w-8 text-brand" />
              <span className="ml-2 text-xl font-bold text-brand">EShop</span>
            </div>
            <p className="mt-4 text-sm text-gray-600">
              Votre plateforme e-commerce complète pour acheter et vendre des produits de qualité.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-brand">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-500 hover:text-brand">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-500 hover:text-brand">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Produits</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/products" className="text-sm text-gray-600 hover:text-brand">
                  Tous les produits
                </Link>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-brand">
                  Nouveautés
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-brand">
                  Promotions
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-brand">
                  Meilleures ventes
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Société</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-brand">
                  À propos
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-brand">
                  Carrières
                </a>
              </li>
              <li>
                <Link to="#" className="text-sm text-gray-600 hover:text-brand">
                  Devenir Vendeur
                </Link>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-brand">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Contact</h3>
            <ul className="mt-4 space-y-2">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-500 mr-2 flex-shrink-0" />
                <span className="text-sm text-gray-600">
                  123 Rue du Commerce, 75000 Paris, France
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-sm text-gray-600">+33 1 23 45 67 89</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-sm text-gray-600">contact@eshop.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-sm text-gray-600 text-center">
            &copy; {new Date().getFullYear()} EShop. Tous droits réservés.
          </p>
          <div className="mt-4 flex justify-center space-x-6">
            <a href="#" className="text-sm text-gray-600 hover:text-brand">
              Mentions légales
            </a>
            <a href="#" className="text-sm text-gray-600 hover:text-brand">
              Conditions d'utilisation
            </a>
            <a href="#" className="text-sm text-gray-600 hover:text-brand">
              Confidentialité
            </a>
            <a href="#" className="text-sm text-gray-600 hover:text-brand">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
