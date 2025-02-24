// src/components/orders/OrderItem.tsx
import React from 'react';
import { Order, Request } from '../../types/order';
import ActionButtons from './ActionButtons';

interface OrderItemProps {
  item: Order | Request;
  onViewDetails: (item: Order | Request) => void;
  onOrderTaken: () => void;
}

const OrderItem: React.FC<OrderItemProps> = ({ item, onViewDetails, onOrderTaken }) => {
  return (
    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-y-4 lg:gap-x-6 border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition">
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-x-4 flex-1 px-2 lg:px-0">
        <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">
          ORD{item.id}
        </p>
        <h3 className="text-sm font-medium text-gray-900 mt-2 lg:mt-0">
          {item.title}
        </h3>
        {item.is_taken && (
          <span className="text-sm text-blue-600 ml-2">✓ Taken</span>
        )}
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