
import React from 'react';

const RememberMe: React.FC = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <input
          id="remember_me"
          name="remember_me"
          type="checkbox"
          className="h-4 w-4 text-brand focus:ring-brand border-gray-300 rounded"
        />
        <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
          Se souvenir de moi
        </label>
      </div>
    </div>
  );
};

export default RememberMe;
