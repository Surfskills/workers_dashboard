// src/components/orders/EmptyState.tsx
import React from 'react';

const EmptyState: React.FC = () => (
  <div className="flex flex-col items-center space-y-4">
    <p className="text-center text-gray-600">You have no orders yet.</p>
    <button
      className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      onClick={() => (window.location.href = '/services/services/')}
    >
      Request a Service
    </button>
  </div>
);

export default EmptyState;