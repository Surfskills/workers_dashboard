// src/components/orders/ActionButtons.tsx
import React, { useState } from 'react';
import { Order, Request } from '../../types/order';
import { takeOrder } from '../../../services/orderService';

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
  const [isLoading, setIsLoading] = useState(false);

  const handleTakeOrder = async () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      window.location.href = '/auth/signin/';
      return;
    }

    setIsLoading(true);
    try {
      await takeOrder(item.id, token);
      onOrderTaken();
      alert('Order taken successfully!');
    } catch (error) {
      console.error('Error taking order:', error);
      alert('Failed to take order. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-2 flex-1 px-2 lg:px-0">
      {!item.is_taken && (
        <button
          onClick={handleTakeOrder}
          disabled={isLoading}
          className="w-full lg:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {isLoading ? 'Taking Order...' : 'Take Order'}
        </button>
      )}
      
      <button
        onClick={() => onViewDetails(item)}
        className="w-full lg:w-auto px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
      >
        View Details
      </button>
    </div>
  );
};

export default ActionButtons;