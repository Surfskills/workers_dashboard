import React, { useState } from 'react';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (rating: number, feedback: string) => void;
  currentRating: number;
  feedback: string; // Add feedback prop
  setFeedback: React.Dispatch<React.SetStateAction<string>>; // Add setFeedback prop
}

const FeedbackModal = ({ isOpen, onClose, onSubmit, currentRating, feedback, setFeedback }: FeedbackModalProps) => {
  const [rating, setRating] = useState(currentRating);

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  const handleSubmit = () => {
    onSubmit(rating, feedback);
    onClose();
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-xl font-semibold text-gray-800">Provide Your Feedback</h2>

          {/* Star Rating */}
          <div className="flex items-center gap-2 mt-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => handleRatingChange(star)}
                className={`text-yellow-500 ${rating >= star ? 'text-yellow-500' : 'text-gray-400'}`}
              >
                ★
              </button>
            ))}
          </div>

          {/* Feedback Textarea */}
          <textarea
            className="w-full mt-4 p-2 border rounded-md"
            placeholder="Leave additional feedback here..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)} // Update feedback state on change
          />

          {/* Action Buttons */}
          <div className="flex justify-between mt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded-md text-gray-700 hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default FeedbackModal;
