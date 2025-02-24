import React, { useState, useEffect } from 'react';
import { Order, Request } from '../../types/order';
import OrderList from './OrderList';
import Modal from './Modal';
import { fetchOrders, isRequest } from '../../../services/orderService';

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<(Order | Request)[]>([]);
  const [selectedItem, setSelectedItem] = useState<Order | Request | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const ordersPerPage = 6;

  const loadOrders = async () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      window.location.href = '/auth/signin/';
      return;
    }

    try {
      const fetchedOrders = await fetchOrders(token);
      setOrders(fetchedOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const totalPages = Math.ceil(orders.length / ordersPerPage);
  const currentOrders = orders.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6 bg-white p-4 md:p-6 rounded-lg shadow-lg">
        
        <OrderList
          orders={currentOrders}
          loading={loading}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          onViewDetails={(item) => {
            setSelectedItem(item);
            setIsModalOpen(true);
          }}
          onOrderTaken={loadOrders}
        />
      </div>

      {selectedItem && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedItem(null);
          }}
          serviceDetails={selectedItem}
          onOrderTaken={loadOrders}
          type={isRequest(selectedItem) ? 'request' : 'order'}
        />
      )}
    </div>
  );
};

export default Orders;