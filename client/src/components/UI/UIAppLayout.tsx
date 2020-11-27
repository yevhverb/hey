import React from 'react';

export const UIAppLayout: React.FC = ({ children }) => {
  return (
    <div className="w-full font-medium text-gray-200 bg-gray-900">
      {children}
    </div>
  );
};
