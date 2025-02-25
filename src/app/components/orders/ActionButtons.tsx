import React from 'react';
import { Order, Request } from '../../types/order';

interface ActionButtonsProps {
  item: Order | Request;
  onViewDetails: (item: Order | Request) => void;
  onOrderTaken: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  item,
  onViewDetails,
  onOrderTaken,
}) => {
  // Type guard for Request
  const isRequest = (details: Order | Request): details is Request => {
    return 'request_type' in details;
  };

  // Determine if this is an order or a request for styling purposes
  const itemType = isRequest(item) && item.request_type 
    ? item.request_type.toLowerCase()  // Only access request_type if item is a Request and not null
    : 'service';
  
  // Get appropriate background color gradient based on type
  const getButtonStyle = () => {
    switch(itemType) {
      case 'software':
        return 'bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white';
      case 'research':
        return 'bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white';
      default: // service
        return 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white';
    }
  };

  return (
    <div className="flex justify-end items-center space-x-2">
      <button
        onClick={() => onViewDetails(item)}
        className={`inline-flex items-center justify-center px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 ${getButtonStyle()}`}
        aria-label="View details"
      >
        <svg 
          className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
          />
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" 
          />
        </svg>
        View Details
      </button>
    </div>
  );
};

export default ActionButtons;
