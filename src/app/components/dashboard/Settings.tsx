'use client';

import React, { useState } from 'react';

const SettingsSection: React.FC = () => {
  const [profileData, setProfileData] = useState({
    email: 'user@example.com',
    phoneNumber: '+1234567890',
    mobileProcessor: '',
    location: '',
    clientType: '',
    emailNotifications: true,
  });

  const updateProfile = (field: string, value: string | boolean) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDeleteAccount = () => {
    if (
      window.confirm(
        'Are you sure you want to delete your account? This action cannot be undone.'
      )
    ) {
      // Implement account deletion logic
      alert('Account deletion process initiated');
    }
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold">Profile Settings</h2>

      {/* Personal Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Personal Information</h3>
        <input
          type="email"
          placeholder="Email"
          value={profileData.email}
          onChange={(e) => updateProfile('email', e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={profileData.phoneNumber}
          onChange={(e) => updateProfile('phoneNumber', e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="relative">
          <select
            value={profileData.mobileProcessor}
            onChange={(e) => updateProfile('mobileProcessor', e.target.value)}
            className="w-full px-4 py-2 border rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>
              Select Mobile Money Processor
            </option>
            <option value="paypal">PayPal</option>
            <option value="mpesa">M-Pesa</option>
            <option value="stripe">Stripe</option>
          </select>
        </div>

        <input
          type="text"
          placeholder="Location"
          value={profileData.location}
          onChange={(e) => updateProfile('location', e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="relative">
          <select
            value={profileData.clientType}
            onChange={(e) => updateProfile('clientType', e.target.value)}
            className="w-full px-4 py-2 border rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>
              Select Client Type
            </option>
            <option value="first-person">First Person</option>
            <option value="third-party">Third Party Individual</option>
            <option value="freelance">Freelancing Agency</option>
            <option value="company">Company</option>
          </select>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Notification Settings</h3>
        <div className="flex items-center justify-between">
          <span>Email Notifications</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={profileData.emailNotifications}
              onChange={(e) =>
                updateProfile('emailNotifications', e.target.checked)
              }
              className="sr-only"
            />
            <div className="w-10 h-6 bg-gray-300 rounded-full peer-checked:bg-green-500 transition"></div>
            <div className="w-4 h-4 bg-white rounded-full shadow peer-checked:translate-x-4 peer-checked:bg-white transition"></div>
          </label>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-red-600">Danger Zone</h3>
        <button
          type="button"
          onClick={handleDeleteAccount}
          className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default SettingsSection;
