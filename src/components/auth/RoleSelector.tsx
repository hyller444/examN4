
import React from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface RoleSelectorProps {
  role: string;
  setRole: (role: string) => void;
}

const RoleSelector: React.FC<RoleSelectorProps> = ({ role, setRole }) => {
  return (
    <div>
      <Label className="mb-2 block">
        Type de compte
      </Label>
      <RadioGroup value={role} onValueChange={setRole} className="flex space-x-4">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="customer" id="customer" />
          <Label htmlFor="customer" className="cursor-pointer">Client</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="seller" id="seller" />
          <Label htmlFor="seller" className="cursor-pointer">Vendeur</Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default RoleSelector;
