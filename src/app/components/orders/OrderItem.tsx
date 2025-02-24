import React from 'react';
import { Order, Request } from '../../types/order';
import ActionButtons from './ActionButtons';

interface OrderItemProps {
  item: Order | Request;
  onViewDetails: (item: Order | Request) => void;
  onOrderTaken: () => void;
}

// Type guard for Request
const isRequest = (item: Order | Request): item is Request => {
  return 'request_type' in item;
};

const OrderItem: React.FC<OrderItemProps> = ({ item, onViewDetails, onOrderTaken }) => {
  // Determine type for styling
  const getTypeStyles = () => {
    if (isRequest(item)) {
      switch (item.request_type) {
        case 'software':
          return {
            bg: 'bg-gradient-to-r from-purple-50 to-indigo-50',
            text: 'text-indigo-700',
            border: 'border-indigo-100'
          };
        case 'research':
          return {
            bg: 'bg-gradient-to-r from-emerald-50 to-teal-50',
            text: 'text-teal-700',
            border: 'border-teal-100'
          };
        default:
          return {
            bg: 'bg-gradient-to-r from-gray-50 to-slate-50',
            text: 'text-slate-700',
            border: 'border-slate-100'
          };
      }
    } else {
      return {
        bg: 'bg-gradient-to-r from-blue-50 to-blue-100',
        text: 'text-blue-700',
        border: 'border-blue-100'
      };
    }
  };

  const styles = getTypeStyles();

  return (
    <div className={`flex flex-col lg:flex-row items-start lg:items-center justify-between gap-y-4 lg:gap-x-6 border rounded-lg ${styles.border} ${styles.bg} p-4 shadow-sm hover:shadow-md transition-all transform hover:scale-[1.01] duration-200`}>
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-x-4 flex-1 px-2 lg:px-0">
        <div className="flex items-center space-x-2">
        <div className="bg-white/80 text-xs px-2 py-1 rounded shadow-sm text-black">
  ORD{item.id}
</div>
          <div className="h-4 w-px bg-gray-300 hidden lg:block"></div>
          <div className={`text-xs font-medium ${styles.text} hidden lg:block`}>
            {isRequest(item) 
              ? item.request_type.charAt(0).toUpperCase() + item.request_type.slice(1) 
              : 'Service'}
          </div>
        </div>
        
        <h3 className="text-sm font-medium text-gray-900 mt-2 lg:mt-0 line-clamp-1">
          {item.title}
        </h3>
        
        {item.is_taken && (
          <span className="inline-flex items-center text-xs font-medium ml-2 px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Taken
          </span>
        )}
        
        {/* Mobile only type badge */}
        <div className={`lg:hidden text-xs font-medium ${styles.text} px-2 py-0.5 rounded-full bg-white/50 mt-1 inline-block`}>
          {isRequest(item) 
            ? item.request_type.charAt(0).toUpperCase() + item.request_type.slice(1) 
            : 'Service'}
        </div>
      </div>
      
      <ActionButtons
        item={item}
        onViewDetails={onViewDetails}
        onOrderTaken={onOrderTaken}
      />
    </div>
  );
};

export default OrderItem;