import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => (
  <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4 p-2 sm:p-4 bg-white rounded-lg shadow-sm">
    {/* Previous Button */}
    <button
      onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
      disabled={currentPage === 1}
      className="w-full sm:w-auto px-3 py-1.5 sm:px-4 sm:py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 text-xs sm:text-sm"
    >
      Previous
    </button>

    {/* Page Number Info */}
    <span className="text-xs sm:text-sm font-medium text-gray-700">
      Page {currentPage} of {totalPages}
    </span>

    {/* Next Button */}
    <button
      onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
      disabled={currentPage === totalPages}
      className="w-full sm:w-auto px-3 py-1.5 sm:px-4 sm:py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 text-xs sm:text-sm"
    >
      Next
    </button>
  </div>
);

export default Pagination;