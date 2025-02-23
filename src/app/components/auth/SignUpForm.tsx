'use client';

import React from 'react';

interface SignInFormProps {
  email: string;
  password: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SignInForm({ email, password, onChange }: SignInFormProps) {
  return (
    <form className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-xs text-gray-600">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email" // Add a `name` attribute for proper handling
          value={email}
          onChange={onChange} // Use the onChange prop
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-xs text-gray-600">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password" // Add a `name` attribute for proper handling
          value={password}
          onChange={onChange} // Use the onChange prop
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </form>
  );
}
