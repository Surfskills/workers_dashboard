// // CustomRequestsSection.tsx
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Modal from './Modal';
// import { Request } from '../../types/request';

// const CustomRequestsSection: React.FC = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const requestsPerPage = 6;
//   const [requests, setRequests] = useState<Request[]>([]);
//   const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem('access_token');

//     if (!token) {
//       window.location.href = '/auth/signin/';
//       return;
//     }

//     const fetchRequests = async () => {
//       try {
//         const response = await axios.get('https://fred-server.onrender.com/api/requests/list/', {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         console.log('Fetched Requests:', response.data);
//         setRequests(response.data);
//       } catch (error) {
//         if (axios.isAxiosError(error) && error.response?.status === 401) {
//           localStorage.removeItem('access_token');
//           window.location.href = '/auth/signin/';
//         }
//       }
//     };

//     fetchRequests();
//   }, []);

//   const openModal = (request: Request) => {
//     setSelectedRequest(request);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedRequest(null);
//   };

//   const totalPages = Math.ceil(requests.length / requestsPerPage);
//   const currentRequests = requests.slice(
//     (currentPage - 1) * requestsPerPage,
//     currentPage * requestsPerPage
//   );

//   const handlePageChange = (page: number) => {
//     setCurrentPage(page);
//   };

//   const handleDeleteRequest = async (requestId: number) => {
//     try {
//       const token = localStorage.getItem('access_token');
//       if (!token) {
//         console.error('User is not authenticated.');
//         return;
//       }

//       console.log(`Deleting request with ID: ${requestId}`);

//       const response = await axios.delete(`https://fred-server.onrender.com/api/requests/${requestId}/`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       console.log('Request deleted successfully:', response.data);
//       alert('Request deleted successfully');
//       setRequests((prevRequests) => prevRequests.filter((request) => request.id !== requestId));
//     } catch (error) {
//       console.error('Error deleting request:', error);
//       alert('Only an admin can delete paid requests.');
//     }
//   };

//   return (
//     <div className="space-y-6 bg-white p-4 md:p-6 rounded-lg shadow-lg">
//       <h2 className="text-lg md:text-2xl font-semibold text-gray-900">Custom Requests</h2>

//       {requests.length === 0 ? (
//         <div className="flex flex-col items-center space-y-4">
//           <p className="text-center text-gray-600">You have no custom requests yet.</p>
//           <button
//             className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
//             onClick={() => (window.location.href = '/custom-request')}
//           >
//             Make a Custom Request
//           </button>
//         </div>
//       ) : (
//         <div className="space-y-4">
//           {currentRequests.map((request) => (
//             <div
//               key={request.id}
//               className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-y-4 lg:gap-x-6 border rounded-lg p-4 bg-gray-50 shadow-sm hover:shadow-md transition"
//             >
//               <div className="flex-1 px-2 lg:px-0">
//                 <p className="text-xs text-gray-500 font-medium">Request ID: {request.id}</p>
//               </div>
//               <div className="flex-1 px-2 lg:px-0">
//                 <h3 className="text-sm font-normal text-gray-900">{request.project_title}</h3>
//               </div>
//               <div className="flex-1 px-2 lg:px-0">
//                 <p className="text-sm font-normal text-gray-900 truncate overflow-hidden break-words">
//                   Status:{' '}
//                   <span
//                     className={`${
//                       request.payment_status.toLowerCase() === 'paid'
//                         ? 'text-green-700'
//                         : 'text-red-700'
//                     }`}
//                   >
//                     {request.payment_status}
//                   </span>
//                 </p>
//               </div>
//               <div className="flex-1 px-2 lg:px-0">
//                 <button
//                   onClick={() => (window.location.href = `/payment/custom/${request.id}`)}
//                   disabled={request.payment_status.toLowerCase() === 'paid'}
//                   className={`w-full lg:w-auto px-4 py-2 rounded transition ${
//                     request.payment_status.toLowerCase() === 'paid'
//                       ? 'bg-gray-200 text-green-600 cursor-not-allowed'
//                       : 'bg-gray-100 text-green-600 hover:bg-gray-200'
//                   }`}
//                 >
//                   {request.order_status}
//                 </button>
//               </div>
//               <div className="flex-1 px-2 lg:px-0">
//                 <button
//                   onClick={() => openModal(request)}
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
//         serviceDetails={selectedRequest}
//         renderContent={(request) => (
//           <div>
//             <h3 className="text-xl font-semibold text-gray-900">{request.project_title}</h3>
//             <p className="text-gray-700 mt-2">{request.project_description}</p>

//             <div className="mt-4 space-y-2">
//               <p className="text-sm text-gray-600">
//                 Request Type: <span className="font-semibold text-gray-800">{request.request_type}</span>
//               </p>

//               {request.request_type === 'software' && (
//                 <>
//                   <p className="text-sm text-gray-600">
//                     Budget Range: <span className="font-semibold text-gray-800">{request.budget_range}</span>
//                   </p>
//                   <p className="text-sm text-gray-600">
//                     Timeline: <span className="font-semibold text-gray-800">{request.timeline}</span>
//                   </p>
//                   <div className="mt-4">
//                     <h4 className="text-sm font-semibold text-gray-700">Technical Stack:</h4>
//                     <p className="text-sm text-gray-600">Frontend: {request.frontend_languages} ({request.frontend_frameworks})</p>
//                     <p className="text-sm text-gray-600">Backend: {request.backend_languages} ({request.backend_frameworks})</p>
//                     <p className="text-sm text-gray-600">AI: {request.ai_languages} ({request.ai_frameworks})</p>
//                   </div>
//                 </>
//               )}

//               {request.request_type === 'research' && (
//                 <>
//                   <p className="text-sm text-gray-600">
//                     Writing Type: <span className="font-semibold text-gray-800">{request.academic_writing_type}</span>
//                   </p>
//                   <p className="text-sm text-gray-600">
//                     Technique: <span className="font-semibold text-gray-800">{request.writing_technique}</span>
//                   </p>
//                   <p className="text-sm text-gray-600">
//                     Structure: <span className="font-semibold text-gray-800">{request.research_paper_structure}</span>
//                   </p>
//                   <p className="text-sm text-gray-600">
//                     Style: <span className="font-semibold text-gray-800">{request.academic_writing_style}</span>
//                   </p>
//                 </>
//               )}
//             </div>
//           </div>
//         )}
//         onDelete={handleDeleteRequest}
//       />
//     </div>
//   );
// };

// export default CustomRequestsSection;