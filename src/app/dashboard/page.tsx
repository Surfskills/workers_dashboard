'use client';

import React, { useState, useEffect, Suspense } from 'react';
import AnalyticsSection from '../components/dashboard/Analytics';
import SettingsSection from '../components/dashboard/Settings';
import SupportTicketForm from '../components/dashboard/Support';
import { useAuth } from '../components/auth/AuthContext';
import { useRouter } from 'next/navigation';
import Loading from './loading';
import AvailableOrders from '../components/orders/AllOrders/AvailableOrders';  // Keep this import only
import MyOrders from '../components/orders/MyOrders/MyOrders';

const CalendlyIntegration = {
  loadScript: (setCalendlyLoaded: React.Dispatch<React.SetStateAction<boolean>>) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://assets.calendly.com/assets/external/widget.css';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    script.onload = () => setCalendlyLoaded(true);
    document.body.appendChild(script);
  },

  initBooking: (calendlyLoaded: boolean) => {
    const calendlyUrl = 'https://calendly.com/remote-ctio-fred/contractor-consultation';
    if (calendlyLoaded && window.Calendly) {
      window.Calendly.initPopupWidget({ url: calendlyUrl });
    }
  },
};

// Define the type for the valid keys of the tabLabels object
type TabKey = 'availableorders' | 'myorders' | 'analytics' | 'settings' | 'support';

const DashboardPage = () => {
  // Explicitly type activeTab as one of the valid keys of TabKey
  const [activeTab, setActiveTab] = useState<TabKey>('availableorders');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [calendlyLoaded, setCalendlyLoaded] = useState(false);
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    CalendlyIntegration.loadScript(setCalendlyLoaded);
    if (!isAuthenticated) {
      router.push('/auth/signin/');
    }
  }, [isAuthenticated, router]);

  const handleBookingClick = () => {
    CalendlyIntegration.initBooking(calendlyLoaded);
  };

  const renderTabContent = (): React.JSX.Element => (
    <Suspense fallback={<Loading />}>
      {activeTab === 'availableorders' && <AvailableOrders />}
      {activeTab === 'myorders' && <MyOrders />}
      {activeTab === 'analytics' && <AnalyticsSection />}
      {activeTab === 'settings' && <SettingsSection />}
      {activeTab === 'support' && <SupportTicketForm />}
    </Suspense>
  );

  const tabLabels: Record<TabKey, string> = {
    availableorders: 'Available Orders',
    myorders: 'My Orders',
    analytics: 'Analytics',
    settings: 'Settings',
    support: 'Support Ticket',
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header with Navigation */}
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          {/* Top Bar */}
          <div className="flex justify-between items-center">
            <h1 className="text-lg font-medium text-blue-600 sm:text-xl">Contractor Dashboard</h1>
            
            {/* Mobile Menu Button */}
            <button
              className="sm:hidden p-2 rounded-lg hover:bg-gray-100"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Navigation Tabs */}
          <nav className={`${
            isMenuOpen ? 'block' : 'hidden'
          } sm:block mt-4 sm:mt-4 transition-all duration-300 ease-in-out`}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
                {Object.entries(tabLabels).map(([key, label]) => (
                  <button
                    key={key}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors w-full sm:w-auto text-left ${
                      activeTab === key
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                    onClick={() => {
                      setActiveTab(key as TabKey); // Type assertion for `key`
                      setIsMenuOpen(false);
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <button
                onClick={handleBookingClick}
                className="mt-4 sm:mt-0 flex items-center justify-center px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium w-full sm:w-auto"
              >
                <span className="mr-2">Schedule Meeting</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-6">
        <main className="bg-white shadow-lg rounded-lg">
          <div className="p-3 sm:p-6">
            <h2 className="text-lg font-medium text-blue-600 sm:text-xl mb-4 sm:mb-6">
              {tabLabels[activeTab]} {/* Render the active tab label */}
            </h2>
            {renderTabContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
