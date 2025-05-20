
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface EmailInputProps {
  email: string;
  setEmail: (email: string) => void;
  error?: string;
}

const EmailInput: React.FC<EmailInputProps> = ({ email, setEmail, error }) => {
  return (
    <div>
      <Label htmlFor="email">
        Adresse email
      </Label>
      <div className="mt-1">
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={error ? 'border-red-500' : ''}
        />
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default EmailInput;
