import React, { useState } from 'react';
import { Order, Request, SoftwareRequest, ResearchRequest } from '../../../types/order';
import ChatModal from '../../dashboard/ChatRoomModal';
import { completeOrder, uploadFiles, returnOrder } from '../../../../services/orderService';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  acceptedOffer: Order | Request; // Changed prop name to accept full AcceptedOffer
  onOrderTaken: () => void;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  acceptedOffer,
  onOrderTaken,
}) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  if (!isOpen || !acceptedOffer) return null;

  const toggleChat = () => setIsChatOpen(!isChatOpen);

  const handleFileSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFiles(Array.from(event.target.files)); // Store all selected files
    }
  };
  
  // Extract nested details from acceptedOffer
  const { service, software_request, research_request } = acceptedOffer;
  const serviceDetails = service || software_request || research_request;

  // Type guard for Request
  const isRequest = (details: Order | Request): details is Request => {
    return 'request_type' in details;
  };

  // Function to convert Sizes object into an array of key-value pairs
  const formatSizes = (sizes: Record<string, number>) => {
    return Object.entries(sizes).map(([size, quantity]) => (
      <div key={size} className="flex justify-between py-1 border-b border-gray-100 last:border-0">
        <span className="text-sm text-gray-800">
          {size.charAt(0).toUpperCase() + size.slice(1)}
        </span>
        <span className="text-sm text-gray-600">Qty: {quantity}</span>
      </div>
    ));
  };

  const handleCompleteOrder = async () => {
    if (selectedFiles.length === 0) {
      console.log("No files uploaded.");
      return;
    }
  
    const token = localStorage.getItem('access_token');
    if (!token) {
      window.location.href = '/auth/signin/';
      return;
    }
  
    // Determine upload type and object id based on acceptedOffer
    let uploadType = '';
    let objectId = '';
    if (acceptedOffer.service) {
      uploadType = 'service';
      objectId = acceptedOffer.service.id.toString();
    } else if (acceptedOffer.software_request) {
      uploadType = 'software_request';
      objectId = acceptedOffer.software_request.id.toString();
    } else if (acceptedOffer.research_request) {
      uploadType = 'research_request';
      objectId = acceptedOffer.research_request.id.toString();
    }
    
    setIsLoading(true);
    try {
      console.log("Uploading files...");
      // Pass extra parameters to uploadFiles
      await uploadFiles(selectedFiles, token, uploadType, objectId);
      console.log("Files uploaded successfully.");
  
      console.log("Completing order...");
      // Pass three arguments: offerId, offerType, and token
      await completeOrder(acceptedOffer.id, uploadType, token);
      console.log("Order successfully completed!");
  
      // Clear selected files and notify parent component
      setSelectedFiles([]);
      onOrderTaken();
      onClose();
    } catch (error) {
      console.error("Error processing order:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  
  const handleReturnOrder = async () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      window.location.href = '/auth/signin/';
      return;
    }
  
    setIsLoading(true);
    try {
      // Use the acceptedOffer's ID
      await returnOrder(acceptedOffer.id, token);
      onOrderTaken();
      onClose();
    } catch (error) {
      console.error('Error returning order:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to render Service details
  const renderServiceDetails = () => {
    if (service && !isRequest(service)) {
      return (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
            <h3 className="text-lg md:text-xl font-bold text-blue-800 mb-4">Service Specifications</h3>
            
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-3 md:p-4 shadow-sm">
                <h4 className="text-base md:text-lg font-semibold text-gray-800 border-b border-gray-100 pb-2 mb-3">
                  Essential Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">Title</p>
                    <p className="text-sm md:text-base font-medium text-gray-800">{service.title}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">Cost</p>
                    <p className="text-sm md:text-base font-medium text-gray-800">${service.cost || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">Delivery</p>
                    <p className="text-sm md:text-base font-medium text-gray-800">{service.delivery_time || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">Contact</p>
                    <p className="text-sm md:text-base font-medium text-gray-800">{service.phone_number || 'N/A'}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-3 md:p-4 shadow-sm">
                <h4 className="text-base md:text-lg font-semibold text-gray-800 border-b border-gray-100 pb-2 mb-3">
                  Project Scope
                </h4>
                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">Description</p>
                  <p className="text-sm md:text-base font-medium text-gray-700 leading-relaxed">
                    {service.description || 'No description provided'}
                  </p>
                </div>
              </div>

              {service.features?.length > 0 && (
                <div className="bg-white rounded-lg p-3 md:p-4 shadow-sm">
                  <h4 className="text-base md:text-lg font-semibold text-gray-800 border-b border-gray-100 pb-2 mb-3">
                    Service Features
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {service.features.map((feature: string, index: number) => (
                      <div key={`${feature}-${index}`} className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <svg className="h-4 w-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-2 text-sm text-gray-700">{feature}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {service.sizes && Object.keys(service.sizes).length > 0 && (
                <div className="bg-white rounded-lg p-3 md:p-4 shadow-sm">
                  <h4 className="text-base md:text-lg font-semibold text-gray-800 border-b border-gray-100 pb-2 mb-3">
                    Size Options
                  </h4>
                  <div className="divide-y divide-gray-100">
                    {formatSizes(service.sizes)}
                  </div>
                </div>
              )}
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
      <div className="space-y-4">
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-lg">
          <h3 className="text-lg md:text-xl font-bold text-indigo-800 mb-4">Software Development Brief</h3>
          
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-3 md:p-4 shadow-sm">
              <h4 className="text-base md:text-lg font-semibold text-gray-800 border-b border-gray-100 pb-2 mb-3">
                Project Overview
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">Project ID</p>
                  <p className="text-sm md:text-base font-medium text-gray-800">#{softwareRequest.id}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">Title</p>
                  <p className="text-sm md:text-base font-medium text-gray-800">{softwareRequest.title}</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">Project Vision</p>
                <p className="text-sm md:text-base font-medium text-gray-700 leading-relaxed">{softwareRequest.project_description}</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-3 md:p-4 shadow-sm">
              <h4 className="text-base md:text-lg font-semibold text-gray-800 border-b border-gray-100 pb-2 mb-3">
                Project Parameters
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">Budget Range</p>
                  <p className="text-sm md:text-base font-medium text-gray-800">{softwareRequest.budget_range}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">Timeline</p>
                  <p className="text-sm md:text-base font-medium text-gray-800">{softwareRequest.timeline}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-3 md:p-4 shadow-sm">
              <h4 className="text-base md:text-lg font-semibold text-gray-800 border-b border-gray-100 pb-2 mb-3">
                Technical Stack
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">Frontend</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {softwareRequest.frontend_languages.split(',').map((lang, idx) => (
                      <span key={idx} className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded text-xs font-medium">
                        {lang.trim()}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">Backend</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {softwareRequest.backend_languages.split(',').map((lang, idx) => (
                      <span key={idx} className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded text-xs font-medium">
                        {lang.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Function to render Research request details
  const renderResearchRequestDetails = (researchRequest: ResearchRequest) => {
    return (
      <div className="space-y-4">
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-4 rounded-lg">
          <h3 className="text-lg md:text-xl font-bold text-teal-800 mb-4">Research Project Details</h3>
          
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-3 md:p-4 shadow-sm">
              <h4 className="text-base md:text-lg font-semibold text-gray-800 border-b border-gray-100 pb-2 mb-3">
                Project Identity
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">Project ID</p>
                  <p className="text-sm md:text-base font-medium text-gray-800">#{researchRequest.id}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">Title</p>
                  <p className="text-sm md:text-base font-medium text-gray-800">{researchRequest.title}</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">Research Scope</p>
                <p className="text-sm md:text-base font-medium text-gray-700 leading-relaxed">{researchRequest.project_description}</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-3 md:p-4 shadow-sm">
              <h4 className="text-base md:text-lg font-semibold text-gray-800 border-b border-gray-100 pb-2 mb-3">
                Academic Requirements
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">Citation Style</p>
                  <p className="text-sm md:text-base font-medium text-gray-800">{researchRequest.citation_style}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">Writing Technique</p>
                  <p className="text-sm md:text-base font-medium text-gray-800">{researchRequest.writing_technique}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">Page Count</p>
                  <p className="text-sm md:text-base font-medium text-gray-800">{researchRequest.number_of_pages}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">Deadline</p>
                  <p className="text-sm md:text-base font-medium text-gray-800">{researchRequest.deadline}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm overflow-y-auto p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-4xl overflow-hidden transition-all transform duration-300 ease-in-out">
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/90 text-gray-500 hover:text-gray-800 hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            aria-label="Close modal"
          >
            <svg
              className="w-5 h-5"
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
        </div>

        <header className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 md:px-6 py-4 text-white">
          <div className="flex items-center space-x-2">
            <div className="bg-white/20 text-xs font-bold px-2 py-1 rounded">
              ORD{acceptedOffer.id} {/* Use AcceptedOffer ID instead of service ID */}
            </div>
            <div className="h-5 w-px bg-white/30"></div>
            <div className="text-sm font-medium text-blue-100">
              {serviceDetails?.request_type 
                ? serviceDetails.request_type.charAt(0).toUpperCase() + serviceDetails.request_type.slice(1)
                : 'Service'}
            </div>
          </div>
          <h2 id="modal-title" className="text-xl md:text-2xl font-bold mt-2">
            {serviceDetails?.request_type
              ? `${serviceDetails.request_type.charAt(0).toUpperCase() + 
                  serviceDetails.request_type.slice(1)} Request Details`
              : 'Service Specifications'}
          </h2>
        </header>

        <main className="p-4 md:p-6 overflow-y-auto max-h-[calc(100vh-240px)] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {software_request ? (
            renderSoftwareRequestDetails(software_request)
          ) : research_request ? (
            renderResearchRequestDetails(research_request)
          ) : (
            renderServiceDetails()
          )}
        </main>

    <footer className="bg-gray-50 px-4 md:px-6 py-4 flex flex-col sm:flex-row sm:justify-end gap-3">
      {/* Chat Toggle Button */}
      <button
        onClick={toggleChat}
        className="w-full sm:w-auto order-2 sm:order-1 bg-white text-blue-600 border border-blue-200 px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 flex justify-center items-center"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
        {isChatOpen ? "Close Chat" : "Open Chat"}
      </button>

      {/* Return Order Button */}
      <button
        onClick={handleReturnOrder}
        disabled={isLoading}
        className="w-full sm:w-auto order-1 sm:order-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 disabled:opacity-50 flex justify-center items-center"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </>
        ) : (
          <>
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Return Order
          </>
        )}
      </button>

      {/* File Input for Upload */}
      <input type="file" id="file-upload" multiple onChange={handleFileSelection} className="hidden" />
      <label
        htmlFor="file-upload"
        className="w-full sm:w-auto order-1 sm:order-2 bg-gray-200 text-gray-700 px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-300 cursor-pointer flex justify-center items-center"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V12M7 12V8m0 4h10m4 0a4 4 0 10-8 0 4 4 0 008 0zM5 20h14a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2z" />
        </svg>
        Select Files
      </label>

      {/* Upload & Complete Order Button */}
      <button
        onClick={handleCompleteOrder}
        disabled={isLoading || selectedFiles.length === 0}
        className="w-full sm:w-auto order-1 sm:order-2 bg-green-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-200 disabled:opacity-50 flex justify-center items-center"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Uploading...
          </>
        ) : (
          <>
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Upload & Complete
          </>
        )}
      </button>
    </footer>

      </div>

      {isChatOpen && (
        <ChatModal
          isOpen={isChatOpen}
          onClose={toggleChat}
          roomId={acceptedOffer.id.toString()} 
        />
      )}
    </div>
  );
};

export default Modal;