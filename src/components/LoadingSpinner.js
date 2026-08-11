import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-purple-500 border-t-0 rounded-full animate-spin"></div>
        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-purple-500 border-t-0 rounded-full animate-ping"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
