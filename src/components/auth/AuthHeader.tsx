
import React from 'react';
import { Link } from 'react-router-dom';
import { Package } from 'lucide-react';

interface AuthHeaderProps {
  title: string;
  subtitle: React.ReactNode;
}

const AuthHeader: React.FC<AuthHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
      <div className="flex justify-center">
        <Link to="/" className="inline-flex items-center">
          <Package className="h-10 w-10 text-brand" />
          <span className="ml-2 text-2xl font-bold text-brand">EShop</span>
        </Link>
      </div>
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        {title}
      </h2>
      <p className="mt-2 text-center text-sm text-gray-600">
        {subtitle}
      </p>
    </div>
  );
};

export default AuthHeader;
