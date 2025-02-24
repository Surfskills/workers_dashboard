// src/components/orders/LoadingSkeleton.tsx
import React from 'react';

const LoadingSkeleton: React.FC = () => (
  <div className="space-y-4">
    {[...Array(6)].map((_, index) => (
      <div
        key={index}
        className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-y-4 lg:gap-x-6 border rounded-lg p-4 bg-white shadow-sm animate-pulse"
      >
        <div className="w-1/3 h-4 bg-gray-200 rounded"></div>
        <div className="w-1/4 h-4 bg-gray-200 rounded"></div>
        <div className="w-1/4 h-4 bg-gray-200 rounded"></div>
      </div>
    ))}
  </div>
);

export default LoadingSkeleton;