import React, { useState } from 'react';
import { Order, Request, SoftwareRequest, ResearchRequest } from '../../types/order';
import ChatModal from '../dashboard/ChatRoomModal';
import { takeOrder } from '../../../services/orderService';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceDetails: Order | Request;
  onOrderTaken: () => void;
  type: 'order' | 'request';
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  serviceDetails,
  onOrderTaken,
  type
}) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen || !serviceDetails) return null;

  const toggleChat = () => setIsChatOpen(!isChatOpen);

  const handleTakeOrder = async () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      window.location.href = '/auth/signin/';
      return;
    }

    setIsLoading(true);
    try {
      await takeOrder(serviceDetails.id, token);
      onOrderTaken();
      alert('Order taken successfully!');
      onClose();
    } catch (error) {
      console.error('Error taking order:', error);
      alert('Failed to take order. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Type guard for Request
  const isRequest = (details: Order | Request): details is Request => {
    return 'request_type' in details;
  };

  // Function to convert Sizes object into an array of key-value pairs
  const formatSizes = (sizes: Record<string, number>) => {
    return Object.entries(sizes).map(([size, quantity]) => (
      <li key={size} className="text-sm text-gray-500">
        {size.charAt(0).toUpperCase() + size.slice(1)}: {quantity}
      </li>
    ));
  };

  // Function to render Service details
  const renderServiceDetails = () => {
    // For general Service (not software or research)
    if (!isRequest(serviceDetails)) {
      return (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Service Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="order-1">
              <p className="text-sm text-gray-600">Title</p>
              <p className="text-base">{serviceDetails.title}</p>
            </div>
            <div className="order-2">
              <p className="text-sm text-gray-600">Description</p>
              <p className="text-base">{serviceDetails.description || 'N/A'}</p>
            </div>
            <div className="order-3">
              <p className="text-sm text-gray-600">Cost</p>
              <p className="text-base">${serviceDetails.cost || 'N/A'}</p>
            </div>
            <div className="order-4">
              <p className="text-sm text-gray-600">Delivery Time</p>
              <p className="text-base">{serviceDetails.delivery_time || 'N/A'}</p>
            </div>
            {serviceDetails.features && serviceDetails.features.length > 0 && (
              <div className="order-5">
                <p className="text-sm text-gray-600">Features</p>
                <ul className="mt-2 list-disc list-inside space-y-1">
                  {serviceDetails.features.map((feature: string, index: number) => (
                    <li key={index} className="text-sm text-gray-500">{feature}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Move Sizes and Phone Number to the bottom */}
            <div className="order-6 md:order-last">
              <p className="text-sm text-gray-600">Sizes</p>
              <ul className="mt-2 list-disc list-inside space-y-1">
                {serviceDetails.sizes ? formatSizes(serviceDetails.sizes) : 'N/A'}
              </ul>
            </div>
            <div className="order-7 md:order-last">
              <p className="text-sm text-gray-600">Phone Number</p>
              <p className="text-base">{serviceDetails.phone_number || 'N/A'}</p>
            </div>
          </div>
        </div>  
      ); 
    }
    return null;
  };

  // Function to render Software request details
  const renderSoftwareRequestDetails = (softwareRequest: SoftwareRequest) => {
    return (
      <div className="space-y-6">
        <h3 className="text-lg font-semibold mb-2">Software Request Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">ID</p>
            <p className="text-base">{softwareRequest.id}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Title</p>
            <p className="text-base">{softwareRequest.title}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Project Description</p>
            <p className="text-base">{softwareRequest.project_description}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Request Type</p>
            <p className="text-base">{softwareRequest.request_type}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Budget Range</p>
            <p className="text-base">{softwareRequest.budget_range}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Timeline</p>
            <p className="text-base">{softwareRequest.timeline}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Frontend Languages</p>
            <p className="text-base">{softwareRequest.frontend_languages}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Backend Languages</p>
            <p className="text-base">{softwareRequest.backend_languages}</p>
          </div>
        </div>
      </div>
    );
  };

  // Function to render Research request details
  const renderResearchRequestDetails = (researchRequest: ResearchRequest) => {
    return (
      <div className="space-y-6">
        <h3 className="text-lg font-semibold mb-2">Research Request Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">ID</p>
            <p className="text-base">{researchRequest.id}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Title</p>
            <p className="text-base">{researchRequest.title}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Project Description</p>
            <p className="text-base">{researchRequest.project_description}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Request Type</p>
            <p className="text-base">{researchRequest.request_type}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Writing Technique</p>
            <p className="text-base">{researchRequest.writing_technique}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Citation Style</p>
            <p className="text-base">{researchRequest.citation_style}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Pages</p>
            <p className="text-base">{researchRequest.number_of_pages}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Deadline</p>
            <p className="text-base">{researchRequest.deadline}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative bg-white rounded-lg shadow-lg w-11/12 max-w-4xl p-6 md:p-8 lg:p-10 my-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-200 transition duration-200"
          aria-label="Close modal"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <header className="border-b border-gray-200 pb-4 mb-6">
          <h2 id="modal-title" className="text-2xl md:text-3xl font-semibold text-gray-800">
            {isRequest(serviceDetails)
              ? `${serviceDetails.request_type.charAt(0).toUpperCase() + 
                  serviceDetails.request_type.slice(1)} Request Details`
              : 'Service Details'}
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            ORD{serviceDetails.id}
          </p>
        </header>

        <main className="overflow-y-auto max-h-[calc(100vh-300px)]">
          {isRequest(serviceDetails) && serviceDetails.request_type === 'software' ? (
            renderSoftwareRequestDetails(serviceDetails as SoftwareRequest)
          ) : isRequest(serviceDetails) && serviceDetails.request_type === 'research' ? (
            renderResearchRequestDetails(serviceDetails as ResearchRequest)
          ) : (
            renderServiceDetails()
          )}
        </main>

        <footer className="border-t border-gray-200 pt-4 mt-6 flex justify-end space-x-4">
          {!serviceDetails.is_taken && (
            <button
              onClick={handleTakeOrder}
              disabled={isLoading}
              className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 disabled:opacity-50"
            >
              {isLoading ? 'Taking Order...' : 'Take Order'}
            </button>
          )}

          <button
            onClick={toggleChat}
            className="bg-blue-50 text-blue-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
          >
            {isChatOpen ? 'Close Chat' : 'Open Chat'}
          </button>
        </footer>
      </div>

      {isChatOpen && (
        <ChatModal
          isOpen={isChatOpen}
          onClose={toggleChat}
          roomId={serviceDetails.id.toString()}
        />
      )}
    </div>
  );
};

export default Modal;
