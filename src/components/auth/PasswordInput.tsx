
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';

interface PasswordInputProps {
  password: string;
  setPassword: (password: string) => void;
  error?: string;
  showForgotPassword?: boolean;
  label?: string;
  autoComplete?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ 
  password, 
  setPassword, 
  error,
  showForgotPassword = false,
  label = "Mot de passe",
  autoComplete = "current-password"
}) => {
  return (
    <div>
      <div className="flex justify-between">
        <Label htmlFor="password">
          {label}
        </Label>
        {showForgotPassword && (
          <Link to="/forgot-password" className="text-sm font-medium text-brand hover:text-brand/80">
            Mot de passe oublié?
          </Link>
        )}
      </div>
      <div className="mt-1">
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete={autoComplete}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={error ? 'border-red-500' : ''}
        />
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default PasswordInput;
