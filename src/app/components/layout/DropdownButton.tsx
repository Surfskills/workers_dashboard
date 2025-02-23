// DropdownButton.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Share2, Copy, Facebook, Twitter } from 'lucide-react';

type MenuItem = {
  label: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
};

type DropdownButtonProps = {
  label: string;
  menuItems?: MenuItem[];
  variant?: 'default' | 'share';
  isMobile?: boolean;
  onNotification?: (message: string) => void;
};

const DropdownButton = ({ 
  label, 
  menuItems = [], 
  variant = 'default',
  isMobile,
  onNotification 
}: DropdownButtonProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showLocalNotification, setShowLocalNotification] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      if (onNotification) {
        onNotification('Link copied to clipboard');
      } else {
        setShowLocalNotification(true);
        setTimeout(() => {
          setShowLocalNotification(false);
        }, 2000);
      }
      setDropdownOpen(false);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  useEffect(() => {
    if (isMobile) {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setDropdownOpen(false);
        }
      };

      const handleScroll = () => setDropdownOpen(false);

      document.addEventListener('mousedown', handleClickOutside);
      window.addEventListener('scroll', handleScroll);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [isMobile]);

  const shareMenuItems = [
    {
      label: 'Share on Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${typeof window !== 'undefined' ? window.location.href : ''}`,
      icon: Facebook
    },
    {
      label: 'Share on Twitter',
      href: `https://twitter.com/intent/tweet?url=${typeof window !== 'undefined' ? window.location.href : ''}`,
      icon: Twitter
    }
  ];

  const items = variant === 'share' ? shareMenuItems : menuItems;

  return (
    <div 
      className={`relative group ${!isMobile ? 'hover:cursor-pointer' : ''}`} 
      ref={dropdownRef}
    >
      {/* Create an invisible overlay that extends down to connect the button and dropdown */}
      {!isMobile && (
        <div className="fixed inset-0 z-40 bg-transparent group-hover:block hidden" />
      )}
      
      <button
        onClick={() => isMobile && setDropdownOpen(!dropdownOpen)}
        className={`
          relative flex items-center space-x-2 px-3 py-2 rounded-lg
          hover:bg-gray-50 transition-all duration-200
          ${isMobile ? 'w-full' : ''}
          ${!isMobile ? 'z-50' : ''}
        `}
        aria-expanded={dropdownOpen}
        aria-haspopup="true"
      >
        {variant === 'share' ? (
          <Share2 className="w-5 h-5 text-gray-600 transition-all duration-200 group-hover:text-blue-600" />
        ) : (
          <span className="text-gray-700">{label}</span>
        )}
      </button>

      {/* Add a connecting div between button and dropdown */}
      {!isMobile && (
        <div className="absolute -bottom-2 left-0 right-0 h-2 bg-transparent z-50 group-hover:block hidden" />
      )}

      <div
        className={`
          absolute right-0 w-56 
          ${isMobile ? (dropdownOpen ? 'block' : 'hidden') : 'hidden group-hover:block'}
          ${isMobile ? 'relative w-full' : 'z-50'}
        `}
      >
        <div className="py-2 mt-1 bg-white rounded-lg shadow-xl border border-gray-100">
          {variant === 'share' && (
            <div className="px-4 py-2 text-sm font-medium text-gray-500">Share via</div>
          )}
          
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link
                key={index}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                onClick={() => setDropdownOpen(false)}
              >
                {Icon && <Icon className="w-4 h-4" />}
                <span>{item.label}</span>
              </Link>
            );
          })}

          {variant === 'share' && (
            <button
              onClick={copyToClipboard}
              className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              <Copy className="w-4 h-4" />
              <span>Copy link</span>
            </button>
          )}
        </div>
      </div>

      {showLocalNotification && !onNotification && (
        <div 
          className="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-in fade-in duration-200"
          role="alert"
        >
          Link copied to clipboard
        </div>
      )}
    </div>
  );
};

export default DropdownButton;