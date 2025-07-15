import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="px-8 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="material-symbols-outlined text-primary-600 text-xl">newspaper</span>
            <span className="font-bold text-gray-900">NewsHub</span>
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