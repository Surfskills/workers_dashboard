import React, { useState } from 'react';
import { Order, Request } from '../../types/order';
import ChatModal from '../dashboard/ChatRoomModal';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceDetails: Order | Request;
  onDelete: (id: number) => Promise<void>;
  type: 'order' | 'request';
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  serviceDetails,
  onDelete,
  type
}) => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  if (!isOpen || !serviceDetails) return null;

  const toggleChat = () => setIsChatOpen(!isChatOpen);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete this ${type}? This action is permanent.`
    );
    if (confirmDelete) {
      try {
        await onDelete(serviceDetails.id);
        onClose();
      } catch (error) {
        console.error(`Error deleting ${type}:`, error);
        alert(`Failed to delete the ${type}. Please try again.`);
      }
    }
  };

  // Type guard for Request
  const isRequest = (details: Order | Request): details is Request => {
    return 'request_type' in details;
  };

  // Render service details based on type
  const renderServiceDetails = () => {
    const commonDetails = (
      <>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Title</p>
              <p className="text-base">{serviceDetails.title}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Price</p>
              {/* <p className="text-base">${serviceDetails.price}</p> */}
            </div>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Description</h3>
          {/* <p className="text-base whitespace-pre-wrap">{serviceDetails.description}</p> */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Created At</p>
            <p className="text-base">
              {/* {new Date(serviceDetails.created_at).toLocaleDateString()} */}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Last Updated</p>
            <p className="text-base">
              {/* {new Date(serviceDetails.updated_at).toLocaleDateString()} */}
            </p>
          </div>
        </div>
      </>
    );

    if (isRequest(serviceDetails)) {
      return (
        <div className="space-y-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Request Type</h3>
            <p className="text-base capitalize">{serviceDetails.request_type}</p>
          </div>
          {commonDetails}
        </div>
      );
    }

    return <div className="space-y-6">{commonDetails}</div>;
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
              : 'Order Details'}
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            ID: {serviceDetails.id}
          </p>
        </header>

        <main className="overflow-y-auto max-h-[calc(100vh-300px)]">
          {renderServiceDetails()}
        </main>

        <footer className="border-t border-gray-200 pt-4 mt-6 flex justify-end space-x-4">
          <button
            onClick={handleDelete}
            className="bg-red-50 text-red-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-200"
          >
            Delete {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>

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