import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full bg-white dark:bg-[#0A0A0A] border-t border-gray-200 dark:border-gray-800 py-8 mt-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between">
        <p className="text-sm text-gray-500 font-medium text-center md:text-left mb-4 md:mb-0">
          Built for the SRM Full Stack Engineering Challenge • Node.js / React 
        </p>
        <div className="flex space-x-6 text-sm font-semibold text-gray-400">
            <span className="hover:text-indigo-500 cursor-pointer">Candidate View</span>
            <span className="hover:text-indigo-500 cursor-pointer">API Specs</span>
            <span className="hover:text-indigo-500 cursor-pointer">Security</span>
        </div>
      </div>
    </footer>
  );
}
