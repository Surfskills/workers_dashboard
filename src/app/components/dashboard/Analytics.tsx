import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Download, FileText } from 'lucide-react';


interface AnalyticsSummary {
 total_orders: number;
 total_revenue: string;
 completed_orders: number;
 pending_orders: number;
 failed_orders: number;
}


interface AnalyticsItem {
 id: number;
 type: 'service' | 'request';
 title: string;
 cost: string;
 payment_status: string;
 order_status: string;
}


interface ApiError {
 message: string;
 code?: string;
 status?: number;
}


const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://fred-server.onrender.com/api/analytics';


const AnalyticsSection: React.FC = () => {
 const [analyticsSummary, setAnalyticsSummary] = useState<AnalyticsSummary | null>(null);
 const [orders, setOrders] = useState<AnalyticsItem[]>([]);
 const [loading, setLoading] = useState<boolean>(true);
 const [error, setError] = useState<ApiError | null>(null);
 const [downloadingIds, setDownloadingIds] = useState<Set<number>>(new Set());


 useEffect(() => {
   const token = localStorage.getItem('access_token');


   if (!token) {
     window.location.href = '/auth/signin/';
     return;
   }


   const fetchData = async () => {
     try {
       const summaryResponse = await axios.get<AnalyticsSummary>(`${API_BASE_URL}/general-analytics/`, {
         headers: { Authorization: `Bearer ${token}` },
       });
       setAnalyticsSummary(summaryResponse.data);


       const [serviceOrdersResponse, requestOrdersResponse] = await Promise.all([
         axios.get('https://fred-server.onrender.com/api/service/list/', {
           headers: { Authorization: `Bearer ${token}` },
         }),
         axios.get('https://fred-server.onrender.com/api/requests/', {
           headers: { Authorization: `Bearer ${token}` },
         }),
       ]);


       const combinedOrders = [
         ...serviceOrdersResponse.data,
         ...requestOrdersResponse.data,
       ];


       setOrders(combinedOrders);
       setLoading(false);
     } catch (error) {
       if (axios.isAxiosError(error) && error.response?.status === 401) {
         localStorage.removeItem('access_token');
         window.location.href = '/auth/signin/';
       }
       setError({
         message: 'Error fetching orders',
         code: 'FETCH_ERROR',
         status: error instanceof Error ? 500 : undefined,
       });
     }
   };


   fetchData();
 }, []);


 const handleDownload = async (orderId: number, type: 'financial' | 'contract') => {
   const token = localStorage.getItem('access_token');
   if (!token) return;


   setDownloadingIds((prev) => new Set([...prev, orderId]));


   try {
     const response = await axios.get(
       `${API_BASE_URL}/order-analytics/${orderId}/${type}/pdf/`,
       {
         headers: { Authorization: `Bearer ${token}` },
         responseType: 'blob',
       }
     );


     const contentDisposition = response.headers['content-disposition'];
     const filename =
       contentDisposition?.split('filename=')[1]?.trim() ||
       `${type}-statement-${orderId}.pdf`;


     const blob = response.data;
     const url = window.URL.createObjectURL(blob);


     const link = document.createElement('a');
     link.href = url;
     link.download = filename;
     document.body.appendChild(link);
     link.click();


     window.URL.revokeObjectURL(url);
     document.body.removeChild(link);
   } catch (err) {
     setError({
       message: 'Failed to download statement',
       code: 'DOWNLOAD_ERROR',
       status: err instanceof Error ? 500 : undefined,
     });
   } finally {
     setDownloadingIds((prev) => {
       const newSet = new Set(prev);
       newSet.delete(orderId);
       return newSet;
     });
   }
 };


 if (loading) {
   return (
     <div className="w-full bg-white rounded-lg shadow-lg p-6">
       <div className="animate-pulse space-y-4">
         <div className="h-4 bg-gray-200 rounded w-1/4"></div>
         <div className="space-y-3">
           <div className="h-20 bg-gray-200 rounded"></div>
           <div className="h-20 bg-gray-200 rounded"></div>
         </div>
       </div>
     </div>
   );
 }


 if (error) {
   return (
     <div className="w-full bg-white rounded-lg shadow-lg p-6">
       <div className="flex items-center space-x-2 text-red-500">
         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                 d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
         </svg>
         <span>{error.message}</span>
       </div>
     </div>
   );
 }


 return (
   <div className="w-full bg-white rounded-lg shadow-lg">
     <div className="p-6">
       <h2 className="text-xl font-bold text-gray-800 mb-6">General Analytics</h2>
       {analyticsSummary && (
         <div className="text-sm text-gray-600">
           <p className="font-semibold text-gray-800">Total Orders: {analyticsSummary.total_orders}</p>
           <p className="font-semibold text-gray-800">Total Revenue: {analyticsSummary.total_revenue}</p>
           <p>Completed Orders: {analyticsSummary.completed_orders}</p>
           <p>Pending Orders: {analyticsSummary.pending_orders}</p>
           <p>Failed Orders: {analyticsSummary.failed_orders}</p>
         </div>
       )}


       <h2 className="text-xl font-bold text-gray-800 mb-6 mt-8">Download Statements</h2>
       <div className="space-y-4">
         {orders.map((item) => (
           <div
             key={item.id}
             className="flex flex-col items-start justify-between gap-y-4 lg:flex-row lg:items-center lg:gap-x-6 border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition"
           >
             {/* Order ID and Title */}
             <div className="flex flex-col lg:flex-row items-start lg:items-center gap-x-4 flex-1 px-2 lg:px-0">
               <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">
                 ORD{item.id}
               </p>
               <p className="text-sm text-gray-800 font-medium">{item.title}</p>
             </div>


             {/* Order Details */}
             <div className="text-sm text-gray-600 flex flex-col gap-y-2">
               {/* <p>Status: {item.order_status}</p> */}
             </div>


             {/* Action Buttons */}
             <div className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-2">
               <button
                 onClick={() => handleDownload(item.id, 'financial')}
                 disabled={downloadingIds.has(item.id)}
                 className={`w-full lg:w-auto p-2 text-sm bg-blue-600 text-white rounded-md ${downloadingIds.has(item.id) ? 'opacity-50 cursor-not-allowed' : ''}`}
               >
                 <Download className="inline mr-2" size={16} />
                 {downloadingIds.has(item.id) ? 'Downloading...' : 'Download Financial Report'}
               </button>
               <button
                 onClick={() => handleDownload(item.id, 'contract')}
                 disabled={downloadingIds.has(item.id)}
                 className={`w-full lg:w-auto p-2 text-sm bg-green-600 text-white rounded-md ${downloadingIds.has(item.id) ? 'opacity-50 cursor-not-allowed' : ''}`}
               >
                 <FileText className="inline mr-2" size={16} />
                 {downloadingIds.has(item.id) ? 'Downloading...' : 'Download Contract'}
               </button>
             </div>
           </div>
         ))}
       </div>
     </div>
   </div>
 );
};


export default AnalyticsSection;



