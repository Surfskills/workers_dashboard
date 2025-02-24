// src/components/orders/StatusBadge.tsx
import React from 'react';

interface StatusBadgeProps {
  status?: string;
  isTaken?: boolean;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, isTaken }) => (
  <div className="flex-1 px-2 lg:px-0">
    <p className="text-sm font-semibold text-gray-900">
      Status:{" "}
      <span className={status?.toLowerCase() === 'paid' ? 'text-green-700' : 'text-red-700'}>
        {status}
      </span>
    </p>
    {isTaken && (
      <p className="text-sm text-blue-600 mt-1">
        ✓ Order Taken
      </p>
    )}
  </div>
);

export default StatusBadge;