// // OrdersSection.tsx (Your existing code)
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Modal from './Modal';
// import { Order } from '../../types/order';

// const OrdersSection: React.FC = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const ordersPerPage = 6;
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem('access_token');

//     if (!token) {
//       window.location.href = '/auth/signin/';
//       return;
//     }

//     const fetchOrders = async () => {
//       try {
//         const response = await axios.get('https://fred-server.onrender.com/api/requests/list/', {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         console.log('Fetched Orders:', response.data);
//         setOrders(response.data);
//       } catch (error) {
//         if (axios.isAxiosError(error) && error.response?.status === 401) {
//           localStorage.removeItem('access_token');
//           window.location.href = '/auth/signin/';
//         }
//       }
//     };

//     fetchOrders();
//   }, []);

//   const openModal = (order: Order) => {
//     setSelectedOrder(order);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedOrder(null);
//   };

//   const totalPages = Math.ceil(orders.length / ordersPerPage);
//   const currentOrders = orders.slice(
//     (currentPage - 1) * ordersPerPage,
//     currentPage * ordersPerPage
//   );

//   const handlePageChange = (page: number) => {
//     setCurrentPage(page);
//   };

//   const handleDeleteOrder = async (orderId: number) => {
//     try {
//       const token = localStorage.getItem('access_token');
//       if (!token) {
//         console.error('User is not authenticated.');
//         return;
//       }

//       console.log(`Deleting order with ID: ${orderId}`);

//       const response = await axios.delete(`https://fred-server.onrender.com/api/requests/list/`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       console.log('Order deleted successfully:', response.data);
//       alert('Order deleted successfully');
//       setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
//     } catch (error) {
//       console.error('Error deleting order:', error);
//       alert('Only an admin can delete paid orders.');
//     }
//   };

//   return (
//     <div className="space-y-6 bg-white p-4 md:p-6 rounded-lg shadow-lg">
//       <h2 className="text-lg md:text-2xl font-semibold text-gray-900">Orders</h2>

//       {orders.length === 0 ? (
//         <div className="flex flex-col items-center space-y-4">
//           <p className="text-center text-gray-600">You have no orders yet.</p>
//           <button
//             className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
//             onClick={() => (window.location.href = '/services/services/')}
//           >
//             Request a Service
//           </button>
//         </div>
//       ) : (
//         <div className="space-y-4">
//           {currentOrders.map((order) => (
//             <div
//               key={order.id}
//               className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-y-4 lg:gap-x-6 border rounded-lg p-4 bg-gray-50 shadow-sm hover:shadow-md transition"
//             >
//               <div className="flex-1 px-2 lg:px-0">
//                 <p className="text-xs text-gray-500 font-medium">Order ID: {order.id}</p>
//               </div>
//               <div className="flex-1 px-2 lg:px-0">
//                 <h3 className="text-sm font-normal text-gray-900">{order.title}</h3>
//               </div>
//               <div className="flex-1 px-2 lg:px-0">
//                 <p className="text-sm font-normal text-gray-900 truncate overflow-hidden break-words">
//                   Status:{' '}
//                   <span
//                     className={`${
//                       order.payment_status.toLowerCase() === 'paid'
//                         ? 'text-green-700'
//                         : 'text-red-700'
//                     }`}
//                   >
//                     {order.payment_status}
//                   </span>
//                 </p>
//               </div>
//               <div className="flex-1 px-2 lg:px-0">
//                 <button
//                   onClick={() => (window.location.href = `/payment/${order.id}`)}
//                   disabled={order.payment_status.toLowerCase() === 'paid'}
//                   className={`w-full lg:w-auto px-4 py-2 rounded transition ${
//                     order.payment_status.toLowerCase() === 'paid'
//                       ? 'bg-gray-200 text-green-600 cursor-not-allowed'
//                       : 'bg-gray-100 text-green-600 hover:bg-gray-200'
//                   }`}
//                 >
//                   {order.order_status}
//                 </button>
//               </div>
//               <div className="flex-1 px-2 lg:px-0">
//                 <button
//                   onClick={() => openModal(order)}
//                   className="w-full lg:w-auto px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
//                 >
//                   Preview
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4 mt-4">
//         <button
//           onClick={() => handlePageChange(currentPage - 1)}
//           disabled={currentPage === 1}
//           className="w-full md:w-auto px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition disabled:opacity-50"
//         >
//           Previous
//         </button>
//         <span className="text-gray-700">Page {currentPage} of {totalPages}</span>
//         <button
//           onClick={() => handlePageChange(currentPage + 1)}
//           disabled={currentPage === totalPages}
//           className="w-full md:w-auto px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition disabled:opacity-50"
//         >
//           Next
//         </button>
//       </div>

//       <Modal
//         isOpen={isModalOpen}
//         onClose={closeModal}
//         serviceDetails={selectedOrder}
//         renderContent={(service) => (
//           <div>
//             <h3 className="text-xl font-semibold text-gray-900">{service.title}</h3>
//             <p className="text-gray-700 mt-2">{service.description}</p>

//             <div className="mt-4 space-y-2">
//               <p className="text-sm text-gray-600">
//                 Cost: <span className="font-semibold text-gray-800">{service.cost}</span>
//               </p>
//               <p className="text-sm text-gray-600">
//                 Delivery Time: <span className="font-semibold text-gray-800">{service.delivery_time}</span>
//               </p>
//               <p className="text-sm text-gray-600">
//                 Support Duration: <span className="font-semibold text-gray-800">{service.support_duration}</span>
//               </p>
//             </div>

//             <ul className="list-disc list-inside text-sm text-gray-600 mt-4">
//               {(service.features ?? []).map((feature, index) => (
//                 <li key={index}>{feature}</li>
//               ))}
//             </ul>

//             <a
//               href={service.process_link}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-blue-600 hover:underline mt-4 inline-block"
//             >
//               View The Project Sprints
//             </a>
//           </div>
//         )}
//         onDelete={handleDeleteOrder}
//       />
//     </div>
//   );
// };

// export default OrdersSection;