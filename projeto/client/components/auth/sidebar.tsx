'use client';

import React, { useState } from 'react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={toggleSidebar}
        className="absolute top-1 left-4 inline-flex justify-center items-center w-10 h-10 rounded-md border border-gray-300 shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="fixed inset-0 flex z-50">
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white shadow-lg">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                type="button"
                onClick={toggleSidebar}
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:bg-gray-600"
              >
                <span className="sr-only">Close sidebar</span>
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <nav className="mt-5 px-4 space-y-1">
                <a
                  href="#"
                  className="group flex items-center px-2 py-2 text-base leading-6 font-medium text-gray-900 rounded-md hover:bg-gray-50"
                >
                  Campeonatos
                </a>
                <a
                  href="#"
                  className="group flex items-center px-2 py-2 text-base leading-6 font-medium text-gray-900 rounded-md hover:bg-gray-50"
                >
                  Times
                </a>
                <a
                  href="#"
                  className="group flex items-center px-2 py-2 text-base leading-6 font-medium text-gray-900 rounded-md hover:bg-gray-50"
                >
                  Option 3
                </a>
              </nav>
            </div>
          </div>
          <div className="flex-shrink-0 w-14">
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
