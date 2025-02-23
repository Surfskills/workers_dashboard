'use client';

import React, { useState } from 'react';

const SupportTicketForm: React.FC = () => {
  const [ticketData, setTicketData] = useState({
    issueTitle: '',
    issueType: '',
    urgencyLevel: '',
    issueDuration: '',
    email: '',
    phoneNumber: '',
    additionalDetails: '',
  });

  const updateTicketData = (field: string, value: string) => {
    setTicketData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const submitTicket = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Ticket Submitted:', ticketData);
    alert('Support ticket submitted successfully!');
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Submit Support Ticket</h2>
      <form onSubmit={submitTicket} className="space-y-4">
        {/* Issue Title */}
        <label className="block text-sm font-medium text-gray-600">
          Issue Title
          <input
            type="text"
            placeholder="Enter the title of your issue"
            value={ticketData.issueTitle}
            onChange={(e) => updateTicketData('issueTitle', e.target.value)}
            required
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </label>

        {/* Issue Type */}
        <label className="block text-sm font-medium text-gray-600">
          Issue Type
          <select
            value={ticketData.issueType}
            onChange={(e) => updateTicketData('issueType', e.target.value)}
            required
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="" disabled>Select Issue Type</option>
            <option value="order">Order Issue</option>
            <option value="payment">Payment Issue</option>
            <option value="technical">Technical Issue</option>
          </select>
        </label>

        {/* Urgency Level */}
        <label className="block text-sm font-medium text-gray-600">
          Urgency Level
          <select
            value={ticketData.urgencyLevel}
            onChange={(e) => updateTicketData('urgencyLevel', e.target.value)}
            required
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="" disabled>Select Urgency Level</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>

        {/* Issue Duration */}
        <label className="block text-sm font-medium text-gray-600">
          Issue Duration
          <input
            type="text"
            placeholder="How long has the issue been happening?"
            value={ticketData.issueDuration}
            onChange={(e) => updateTicketData('issueDuration', e.target.value)}
            required
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </label>

        {/* Email */}
        <label className="block text-sm font-medium text-gray-600">
          Your Email
          <input
            type="email"
            placeholder="Enter your email address"
            value={ticketData.email}
            onChange={(e) => updateTicketData('email', e.target.value)}
            required
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </label>

        {/* Phone Number */}
        <label className="block text-sm font-medium text-gray-600">
          Your Phone Number
          <input
            type="tel"
            placeholder="Enter your phone number"
            value={ticketData.phoneNumber}
            onChange={(e) => updateTicketData('phoneNumber', e.target.value)}
            required
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </label>

        {/* Additional Details */}
        <label className="block text-sm font-medium text-gray-600">
          Additional Details (Optional)
          <textarea
            placeholder="Provide any extra details that might help us resolve the issue"
            value={ticketData.additionalDetails}
            onChange={(e) => updateTicketData('additionalDetails', e.target.value)}
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            rows={4}
          ></textarea>
        </label>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit Ticket
        </button>
      </form>
    </div>
  );
};

export default SupportTicketForm;
