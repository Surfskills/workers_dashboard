// Header.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '../../components/auth/AuthContext';
import { useRouter } from 'next/navigation';
import { Menu, X, Wrench, GraduationCap, Share2, LogIn, UserPlus } from 'lucide-react';
import DropdownButton from './DropdownButton';

const Header = () => {
  const { logout, isAuthenticated } = useAuth();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const handleNotification = (message: string) => {
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 2000);
  };

  const navigationItems = [
    {
      href: '/apps',
      label: 'Learn',
      icon: GraduationCap,
      iconColor: '#3B82F6'
    },
    { 
      href: '/services/services', 
      label: 'Specialities', 
      icon: Wrench,
      iconColor: '#10B981'
    }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md p-2" role="banner">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center" aria-label="Remote-CTIO Home">
            <Image src="/logo.svg" alt="" width={32} height={32} priority />
            <span className="ml-2 text-base font-bold sm:text-lg bg-clip-text text-transparent bg-gradient-to-r from-black via-blue-700 to-blue-500">
              Remote-CTIO
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6" aria-label="Main navigation">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-50 transition-all duration-200"
                >
                  <Icon 
                    className="w-5 h-5 transition-transform group-hover:scale-110" 
                    color={item.iconColor}
                  />
                  <span className="text-gray-700 group-hover:text-gray-900 font-medium">
                    {item.label}
                  </span>
                </Link>
              );
            })}
            
            <DropdownButton 
              label="Share" 
              variant="share"
              onNotification={handleNotification}
            />

            {!isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link
                  href="auth/signin"
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <LogIn className="w-5 h-5" />
                  <span>Sign In</span>
                </Link>
                {/* <Link
                  href="/signup"
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <UserPlus className="w-5 h-5" />
                  <span>Sign Up</span>
                </Link> */}
              </div>
            ) : (
              <button
                onClick={handleLogout}
                className="bg-red-100 text-red-600 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors"
                aria-label="Logout"
              >
                Logout
              </button>
            )}
          </nav>

          <button
            className="md:hidden p-3 rounded-md hover:bg-gray-100 focus:outline-none transition-all duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-600" />
            ) : (
              <Menu className="w-6 h-6 text-gray-600" />
            )}
          </button>
        </div>

        <div
          id="mobile-menu"
          className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} absolute top-16 left-0 right-0 bg-white shadow-lg z-[100]`}
        >
          <div className="p-4 space-y-4">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50 transition-all duration-200"
                >
                  <Icon className="w-5 h-5" color={item.iconColor} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
            
            <DropdownButton 
              label="Share" 
              variant="share" 
              isMobile={true}
              onNotification={handleNotification}
            />

            {!isAuthenticated ? (
              <div className="space-y-2">
                <Link
                  href="/signin"
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50 transition-all duration-200"
                >
                  <LogIn className="w-5 h-5" />
                  <span>Sign In</span>
                </Link>
              </div>
            ) : (
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-md transition-all duration-200"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>

      {showNotification && (
        <div 
          className="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-in fade-in duration-200"
          role="alert"
        >
          Link copied to clipboard
        </div>
      )}
    </header>
  );
};

export default Header;