
import React from 'react';

const TermsAndConditions: React.FC = () => {
  return (
    <div className="text-sm text-center text-gray-600">
      En vous inscrivant, vous acceptez nos{' '}
      <a href="#" className="font-medium text-brand hover:text-brand/80">
        Conditions d'utilisation
      </a>{' '}
      et notre{' '}
      <a href="#" className="font-medium text-brand hover:text-brand/80">
        Politique de confidentialité
      </a>
    </div>
  );
};

export default TermsAndConditions;
