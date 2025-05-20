
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface NameInputProps {
  name: string;
  setName: (name: string) => void;
  error?: string;
}

const NameInput: React.FC<NameInputProps> = ({ name, setName, error }) => {
  return (
    <div>
      <Label htmlFor="name">
        Nom complet
      </Label>
      <div className="mt-1">
        <Input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={error ? 'border-red-500' : ''}
        />
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default NameInput;
