import React, { useState } from 'react';
import { Order } from '../../types/order';
import { Request } from '../../types/request';
import ChatModal from './ChatRoomModal'; // Import ChatModal component

// ModalProps interface with support for both Order and Request types
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceDetails: Order | Request | null;
  renderContent: (service: Order | Request) => React.ReactElement;
  onDelete: (id: number) => Promise<void>;
  type?: 'order' | 'request';
}

const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  serviceDetails, 
  renderContent, 
  onDelete,
  type = 'order'
}) => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Function to toggle chat modal
  const toggleChat = () => setIsChatOpen(!isChatOpen);

  if (!isOpen || !serviceDetails) return null;

  const handleDelete = async () => {
    const confirmDelete = window.confirm(`Are you sure you want to delete this ${type}? This action is permanent.`);
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

  // Helper function to determine if it's a request
  const isRequest = (details: Order | Request): details is Request => {
    return 'request_type' in details;
  };


  // Only render content if we have valid details
  const content = serviceDetails ? renderContent(serviceDetails) : null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      {/* Modal Container */}
      <div className="relative bg-white rounded-lg shadow-lg w-11/12 max-w-4xl p-6 md:p-8 lg:p-10">
        {/* Close Icon */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-200 transition duration-200"
        >
          <span className="text-2xl font-bold leading-none">&times;</span>
        </button>

        {/* Modal Header */}
        <header className="border-b border-gray-200 pb-4 mb-6">
          <h2 id="modal-title" className="text-2xl md:text-3xl font-semibold text-gray-800">
            {isRequest(serviceDetails) ? 
              `${serviceDetails.request_type.charAt(0).toUpperCase() + serviceDetails.request_type.slice(1)} Request Details` : 
              'Service Details'
            }
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Learn more about this {isRequest(serviceDetails) ? serviceDetails.request_type + ' request' : 'service'} below.
          </p>
        </header>

        {/* Modal Content */}
        <main className="overflow-y-auto max-h-[70vh]" id="modal-description">
          {content}
        </main>

        {/* Modal Footer */}
        <footer className="border-t border-gray-200 pt-4 mt-6 text-right">
          {/* Delete Button */}
          <button
            onClick={handleDelete}
            className="ml-4 bg-gray-100 text-red-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-200"
          >
            Delete {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>

          {/* Chat Button */}
          <button
            onClick={toggleChat}
            className="ml-4 bg-blue-100 text-blue-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
          >
            {isChatOpen ? 'Close Chat' : 'Open Chat'}
          </button>
        </footer>
      </div>

      {/* Chat Modal */}
      {isChatOpen && (
        <ChatModal 
          isOpen={isChatOpen} 
          onClose={toggleChat} 
          roomId={serviceDetails.id.toString()} // Pass the room ID here if applicable

        />
      )}
    </div>
  );
};

export default Modal;
