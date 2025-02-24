// src/components/orders/OrderList.tsx
import React from 'react';
import { Order, Request } from '../../types/order';
import OrderItem from './OrderItem';
import Pagination from './Pagination';
import LoadingSkeleton from './SkeletonLoading';
import EmptyState from './EmptyState';

interface OrderListProps {
  orders: (Order | Request)[];
  loading: boolean;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onViewDetails: (item: Order | Request) => void;
  onOrderTaken: () => void;
}

const OrderList: React.FC<OrderListProps> = ({
  orders,
  loading,
  currentPage,
  totalPages,
  onPageChange,
  onViewDetails,
  onOrderTaken,
}) => {
  if (loading) {
    return <LoadingSkeleton />;
  }

  if (orders.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        {orders.map((item) => (
          <OrderItem
            key={item.id}
            item={item}
            onViewDetails={onViewDetails}
            onOrderTaken={onOrderTaken}
          />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default OrderList;