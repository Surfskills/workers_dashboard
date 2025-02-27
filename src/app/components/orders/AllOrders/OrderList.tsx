import React from 'react';
import { Order, Request } from '../../../types/order';
import OrderItem from './OrderItem';
import Pagination from '../Pagination';
import LoadingSkeleton from '../SkeletonLoading';
import EmptyState from '../EmptyState';

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
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-6 py-4 border-b border-blue-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-blue-800">
              Orders ({orders.length})
            </h2>
            <div className="text-sm text-blue-600">
              Page {currentPage} of {totalPages}
            </div>
          </div>
        </div>
        
        <div className="divide-y divide-gray-100">
          {orders.map((item) => (
            <div key={item.id} className="p-2 hover:bg-gray-50 transition-colors duration-150">
              <OrderItem
                item={item}
                onViewDetails={onViewDetails}
                onOrderTaken={onOrderTaken}
              />
            </div>
          ))}
        </div>
        
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderList;