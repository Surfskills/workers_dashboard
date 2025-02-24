import React from 'react';
import { Order, Request } from '../../types/order';

interface ActionButtonsProps {
  item: Order | Request;
  onViewDetails: (item: Order | Request) => void;
  onOrderTaken: () => void; // Add this to the props interface
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  item,
  onViewDetails,
  onOrderTaken, // Destructure the new prop
}) => {
  return (
    <div className="flex justify-end items-center">
      <button
        onClick={() => onViewDetails(item)}
        className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
      >
        View Details
      </button>

    </div>
  );
};

export default ActionButtons;
