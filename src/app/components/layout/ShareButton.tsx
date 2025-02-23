'use client';

import { useState } from 'react';
import { Share, Copy, Twitter, Facebook, Linkedin, Check } from 'lucide-react';

type Platform = 'twitter' | 'facebook' | 'linkedin';

const Alert: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="fixed bottom-4 right-4 w-auto bg-green-50 border border-green-200 rounded-lg px-4 py-3 shadow-lg z-50">
    {children}
  </div>
);

const ShareButton: React.FC<{ isMobile?: boolean }> = ({ isMobile = false }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [copied, setCopied] = useState(false);
  const shareUrl = 'http://192.168.0.101:3000/';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareToSocial = (platform: Platform) => {
    let shareLink = '';
    const encodedUrl = encodeURIComponent(shareUrl);
    
    switch (platform) {
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?url=${encodedUrl}`;
        break;
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case 'linkedin':
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
    }
    
    window.open(shareLink, '_blank', 'width=600,height=400');
  };

  const buttonClassName = isMobile
    ? "flex items-center space-x-2 px-3 py-2 bg-purple-100 hover:bg-purple-200 text-purple-600 rounded-md transition-all duration-200 w-full"
    : "group flex items-center space-x-2 px-4 py-2 bg-purple-100 hover:bg-purple-200 rounded-lg transition-all duration-200";

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className={buttonClassName}
      >
        <Share className={`w-5 h-5 text-purple-600 ${!isMobile && 'transition-transform group-hover:scale-110'}`} />
        <span className="text-purple-600 font-medium">Share</span>
      </button>

      {showDropdown && (
        <div className={`absolute ${isMobile ? 'left-0' : 'right-0'} mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-[100]`}>
          <button
            onClick={handleCopy}
            className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center space-x-2"
          >
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied!' : 'Copy Link'}</span>
          </button>
          
          <button
            onClick={() => shareToSocial('twitter')}
            className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center space-x-2"
          >
            <Twitter className="w-4 h-4 text-blue-400" />
            <span>Twitter</span>
          </button>
          
          <button
            onClick={() => shareToSocial('facebook')}
            className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center space-x-2"
          >
            <Facebook className="w-4 h-4 text-blue-600" />
            <span>Facebook</span>
          </button>
          
          <button
            onClick={() => shareToSocial('linkedin')}
            className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center space-x-2"
          >
            <Linkedin className="w-4 h-4 text-blue-700" />
            <span>LinkedIn</span>
          </button>
        </div>
      )}

      {copied && (
        <Alert>
          <p className="text-green-800">Link copied to clipboard!</p>
        </Alert>
      )}
    </div>
  );
};

export default ShareButton;