// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Order } from '../../types/order';
// import { Request, SoftwareRequest, ResearchRequest } from '../../types/request';
// import Modal from './Modal';

// // Type guard to check if the item is an Order
// const isOrder = (item: Order | Request): item is Order => {
//   return 'cost' in item && !('request_type' in item);
// };

// // Define a type for the possible order statuses
// type OrderStatus =
//   | 'processing'
//   | 'completed'
//   | 'canceled'
//   | 'shipped'
//   | 'delivered'
//   | 'proceed_to_pay';

// const getOrderStatusText = (status: OrderStatus, paymentStatus?: string): string => {
//   // If payment is not made, show "Proceed to Pay"
//   if (!paymentStatus || paymentStatus.toLowerCase() === 'unpaid') {
//     return 'Proceed to Pay';
//   }
  
//   // If payment is made, initially show "Processing"
//   if (paymentStatus.toLowerCase() === 'paid' && status === 'proceed_to_pay') {
//     return 'Processing';
//   }

//   // For all other cases after payment, show the current order status
//   switch (status.toLowerCase()) {
//     case 'processing':
//       return 'Processing';
//     case 'completed':
//       return 'Completed';
//     case 'canceled':
//       return 'Canceled';
//     case 'shipped':
//       return 'Shipped';
//     case 'delivered':
//       return 'Delivered';
//     default:
//       return 'Unknown Status';
//   }
// };

// // Type guard to check if the item is a Request
// const isRequest = (item: Order | Request): item is Request => {
//   return 'request_type' in item;
// };

// const MyOrders = () => {
//   const [orders, setOrders] = useState<(Order | Request)[]>([]);
//   const [selectedItem, setSelectedItem] = useState<Order | Request | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const ordersPerPage = 6;

//   const [loading, setLoading] = useState(true); // Added loading state

//   useEffect(() => {
//     const token = localStorage.getItem('access_token');

//     if (!token) {
//       window.location.href = '/auth/signin/';
//       return;
//     }

//     const fetchOrders = async () => {
//       try {
//         // Fetch both order types concurrently
//         const [serviceOrdersResponse, requestOrdersResponse] = await Promise.all([
//           axios.get('https://fred-server.onrender.com/api/service/list/', {
//             headers: { Authorization: `Bearer ${token}` },
//           }),
//           axios.get('https://fred-server.onrender.com/api/requests/', {
//             headers: { Authorization: `Bearer ${token}` },
//           }),
//         ]);

//         // Combine the orders from both APIs
//         const combinedOrders = [
//           ...serviceOrdersResponse.data,
//           ...requestOrdersResponse.data,
//         ];
        
//         setOrders(combinedOrders);
//         setLoading(false); // Set loading to false once data is fetched
//       } catch (error) {
//         if (axios.isAxiosError(error) && error.response?.status === 401) {
//           localStorage.removeItem('access_token');
//           window.location.href = '/auth/signin/';
//         }
//         console.error('Error fetching orders:', error);
//         setLoading(false); // Set loading to false on error
//       }
//     };

//     fetchOrders();
//   }, []);

//   const handleDelete = async (id: number) => {
//     try {
//       const token = localStorage.getItem('access_token');
//       if (!token) {
//         console.error('User is not authenticated.');
//         return;
//       }

//       if (selectedItem && isRequest(selectedItem)) {
//         await axios.delete(`https://fred-server.onrender.com/api/requests/${id}/`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//       } else {
//         await axios.delete(`https://fred-server.onrender.com/api/service/${id}/`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//       }

//       setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
//       setIsModalOpen(false);
//     } catch (error) {
//       console.error('Error deleting item:', error);
//       alert('Failed to delete the item. Please try again.');
//     }
//   };

//   const renderContent = (item: Order | Request): React.ReactElement => {
//     if (isOrder(item)) {
//       return (
//         <div className="space-y-4">
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <h3 className="text-lg font-medium text-gray-900">Description</h3>
//               <p className="mt-1 text-sm text-gray-500">{item.description}</p>
//             </div>
//             <div>
//               <h3 className="text-lg font-medium text-gray-900">Cost</h3>
//               <p className="mt-1 text-sm text-gray-500">${item.cost}</p>
//             </div>
//           </div>
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <h3 className="text-lg font-medium text-gray-900">Delivery Time</h3>
//               <p className="mt-1 text-sm text-gray-500">{item.delivery_time}</p>
//             </div>
//             <div>
//               <h3 className="text-lg font-medium text-gray-900">Support Duration</h3>
//               <p className="mt-1 text-sm text-gray-500">{item.support_duration}</p>
//             </div>
//           </div>
//           {item.features && item.features.length > 0 && (
//             <div>
//               <h3 className="text-lg font-medium text-gray-900">Features</h3>
//               <ul className="mt-2 list-disc list-inside space-y-1">
//                 {item.features.map((feature: string, index: number) => (
//                   <li key={index} className="text-sm text-gray-500">{feature}</li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </div>
//       );
//     } else {
//       return (
//         <div className="space-y-4">
//           <div>
//             <h3 className="text-lg font-medium text-gray-900">Project Description</h3>
//             <p className="mt-1 text-sm text-gray-500">{item.project_description}</p>
//           </div>
          
//           {item.request_type === 'software' && (
//             <div className="space-y-4">
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <h3 className="text-lg font-medium text-gray-900">Budget Range</h3>
//                   <p className="mt-1 text-sm text-gray-500">{(item as SoftwareRequest).budget_range}</p>
//                 </div>
//                 <div>
//                   <h3 className="text-lg font-medium text-gray-900">Timeline</h3>
//                   <p className="mt-1 text-sm text-gray-500">{(item as SoftwareRequest).timeline}</p>
//                 </div>
//               </div>
//               <div>
//                 <h3 className="text-lg font-medium text-gray-900">Technologies</h3>
//                 <div className="grid grid-cols-2 gap-4 mt-2">
//                   <div>
//                     <h4 className="text-md font-medium text-gray-700">Frontend</h4>
//                     <p className="text-sm text-gray-500">Languages: {(item as SoftwareRequest).frontend_languages}</p>
//                     <p className="text-sm text-gray-500">Frameworks: {(item as SoftwareRequest).frontend_frameworks}</p>
//                   </div>
//                   <div>
//                     <h4 className="text-md font-medium text-gray-700">Backend</h4>
//                     <p className="text-sm text-gray-500">Languages: {(item as SoftwareRequest).backend_languages}</p>
//                     <p className="text-sm text-gray-500">Frameworks: {(item as SoftwareRequest).backend_frameworks}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {item.request_type === 'research' && (
//             <div className="space-y-4">
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <h3 className="text-lg font-medium text-gray-900">Basic Details</h3>
//                   <p className="mt-1 text-sm text-gray-500">Pages: {(item as ResearchRequest).writing_technique}</p> 
//                   <p className="mt-1 text-sm text-gray-500">No. of Refs: {(item as ResearchRequest).academic_writing_type}</p>
//                   <p className="mt-1 text-sm text-gray-500">Deadline: {(item as ResearchRequest).deadline}</p>
//                   <p className="mt-1 text-sm text-gray-500">Citation: {(item as ResearchRequest).citation_style}</p>
//                   <p className="mt-1 text-sm text-gray-500">Cost: {(item as ResearchRequest).cost}</p>
//                 </div>
//                 <div>
//                   <h3 className="text-lg font-medium text-gray-900">Writing Details</h3>
//                   <p className="mt-1 text-sm text-gray-500">Writing Type: {(item as ResearchRequest).number_of_pages}</p>
//                   <p className="mt-1 text-sm text-gray-500">Writing Technique: {(item as ResearchRequest).writing_technique}</p>
//                 </div>
//               </div>
//               <div>
//                 <h3 className="text-lg font-medium text-gray-900">Citation Style</h3>
//                 <div className="grid grid-cols-2 gap-4 mt-2">
//                   <p className="mt-1 text-sm text-gray-500">Citation: {(item as ResearchRequest).citation_style}</p>
//                   <p className="mt-1 text-sm text-gray-500">Pages: {(item as ResearchRequest).writing_technique}</p> 
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       );
//     }
//   };

//   const totalPages = Math.ceil(orders.length / ordersPerPage);
//   const currentOrders = orders.slice(
//     (currentPage - 1) * ordersPerPage,
//     currentPage * ordersPerPage
//   );

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="space-y-6 bg-white p-4 md:p-6 rounded-lg shadow-lg">
//         <h2 className="text-lg md:text-2xl font-semibold text-gray-900">Orders</h2>

//         {loading ? (
//           // Display loading skeletons if orders are being fetched
//           <div className="space-y-4">
//             {[...Array(6)].map((_, index) => (
//               <div key={index} className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-y-4 lg:gap-x-6 border rounded-lg p-4 bg-white shadow-sm animate-pulse">
//                 <div className="w-1/3 h-4 bg-gray-200 rounded"></div>
//                 <div className="w-1/4 h-4 bg-gray-200 rounded"></div>
//                 <div className="w-1/4 h-4 bg-gray-200 rounded"></div>
//               </div>
//             ))}
//           </div>
//         ) : orders.length === 0 ? (
//           <div className="flex flex-col items-center space-y-4">
//             <p className="text-center text-gray-600">You have no orders yet.</p>
//             <button
//               className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
//               onClick={() => (window.location.href = '/services/services/')}
//             >
//               Request a Service
//             </button>
//           </div>
//         ) : (
//           <div className="space-y-4">
//             {currentOrders.map((item) => {
//               const displayOrderStatus = getOrderStatusText(
//                 item.order_status as OrderStatus,
//                 item.payment_status
//               );

//               return (
//                 <div
//                   key={item.id}
//                   className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-y-4 lg:gap-x-6 border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition"
//                 >
//                   {/* Order ID and Title */}
//                   <div className="flex flex-col lg:flex-row items-start lg:items-center gap-x-4 flex-1 px-2 lg:px-0">
//                     <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">
//                       ORD{item.id}
//                     </p>
//                     <h3 className="text-sm font-medium text-gray-900 mt-2 lg:mt-0">{item.title}</h3>
//                   </div>

//                   {/* Status Section */}
//                   <div className="flex-1 px-2 lg:px-0">
//                     <p className="text-sm font-semibold text-gray-900">
//                       Status:{" "}
//                       <span
//                         className={`${
//                           item.payment_status?.toLowerCase() === 'paid'
//                             ? 'text-green-700'
//                             : 'text-red-700'
//                         }`}
//                       >
//                         {item.payment_status} {/* Show payment status */}
//                       </span>
//                     </p>
//                   </div>

//                   {/* Payment Button */}
//                   <div className="flex-1 px-2 lg:px-0">
//                     <button
//                       onClick={() => (window.location.href = `/payment/${item.id}`)}
//                       disabled={item.payment_status?.toLowerCase() === 'paid'}
//                       className={`w-full lg:w-auto px-4 py-2 rounded-lg transition ${
//                         item.payment_status?.toLowerCase() === 'paid'
//                           ? 'bg-gray-200 text-green-600 cursor-not-allowed'
//                           : 'bg-green-100 text-green-600 hover:bg-green-200'
//                       }`}
//                     >
//                       {/* Dynamically set the button text */}
//                       {item.payment_status?.toLowerCase() === 'paid'
//                         ? displayOrderStatus // Show current order status if paid
//                         : 'Proceed to Pay'}
//                     </button>
//                   </div>

//                   {/* View Details Button */}
//                   <div className="flex-1 px-2 lg:px-0">
//                     <button
//                       onClick={() => {
//                         setSelectedItem(item);
//                         setIsModalOpen(true);
//                       }}
//                       className="w-full lg:w-auto px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
//                     >
//                       View Details
//                     </button>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}

//         {orders.length > 0 && (
//           <div className="flex justify-between items-center mt-4">
//             <button
//               onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//               disabled={currentPage === 1}
//               className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
//             >
//               Previous
//             </button>
//             <span>
//               Page {currentPage} of {totalPages}
//             </span>
//             <button
//               onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//               disabled={currentPage === totalPages}
//               className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
//             >
//               Next
//             </button>
//           </div>
//         )}
//       </div>

//       {selectedItem && (
//         <Modal
//           isOpen={isModalOpen}
//           onClose={() => {
//             setIsModalOpen(false);
//             setSelectedItem(null);
//           }}
//           serviceDetails={selectedItem}
//           renderContent={renderContent}
//           onDelete={handleDelete}
//           type={isRequest(selectedItem) ? 'request' : 'order'}
//         />
//       )}
//     </div>
//   );
// };

// export default MyOrders;
