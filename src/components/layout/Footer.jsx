import React from 'react';
import Icon from '../../assets/Icon.png';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="px-8 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img src={Icon} alt="AIvestor icon" className="w-6 h-6" />
            <span className="font-bold text-gray-900">AIvestor</span>
          </div>
          <div className="flex items-center space-x-6">
            <a href="#" className="text-sm text-gray-600 hover:text-primary-600 transition-colors duration-200">About</a>
            <a href="#" className="text-sm text-gray-600 hover:text-primary-600 transition-colors duration-200">Contact</a>
            <a href="#" className="text-sm text-gray-600 hover:text-primary-600 transition-colors duration-200">Privacy</a>
            <a href="#" className="text-sm text-gray-600 hover:text-primary-600 transition-colors duration-200">Terms</a>
          </div>
        </div>
        <div className="mt-4 text-center text-xs text-gray-500">
          © 2024 NewsHub. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;