'use client';

import React, { useState } from 'react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const toggleDropdown2 = () => {
    setIsDropdownOpen2(!isDropdownOpen2);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={toggleSidebar}
        className="absolute top-1 left-4 inline-flex justify-center items-center w-10 h-10 rounded-md border border-gray-300 shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none "
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
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-[#003B14] shadow-lg">
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
            <div className="flex-1 h-0 pt-0 pb-4 overflow-y-auto ">
              <span className="text-white flex items-center justify-between  py-3 px-5 bg-[#005B14]">
                Menu
              </span>
              <nav className="mt-0">
                <li className="relative">
                  <button
                    type="button"
                    className="flex items-center w-full p-2 text-base text-white transition duration-75 group hover:bg-[#004B14] py-4"
                    onClick={toggleDropdown}
                  >
                    <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap ">
                      Campeonatos
                    </span>
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4"
                      />
                    </svg>
                  </button>
                  {isDropdownOpen && (
                    <ul className="py-2 space-y-2">
                      <li>
                        <a
                          href="#"
                          className="flex items- w-full p-2 text-white transition duration-75 pl-8 group hover:bg-[#004B14]"
                        >
                          Brasileirão Série A
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="flex items-center w-full p-2 text-white transition duration-75 pl-8 group hover:bg-[#004B14]"
                        >
                          Libertadores
                        </a>
                      </li>
                    </ul>
                  )}
                </li>
              </nav>
              <nav className="mt-0">
                <li className="relative">
                  <button
                    type="button"
                    className="flex items-center w-full p-2 text-base text-white transition duration-75  group hover:bg-[#004B14] py-4"
                    onClick={toggleDropdown2}
                  >
                    <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                      Times
                    </span>
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4"
                      />
                    </svg>
                  </button>
                  {isDropdownOpen2 && (
                    <ul className="flex py-1 space-x-0">
                      <li>
                        <a
                          href="/auth/home/Times/Bragantino"
                          className="flex items-center p-2 text-gray-900 transition duration-75 pl-4 group hover:bg-[#004B14]"
                        >
                           <img src="https://logodetimes.com/times/red-bull-bragantino/logo-red-bull-bragantino-1536.png" alt="Red Bull Bragantino" className="w-11 h-11 mr-1 ml-1" />
                           
                        </a>
                      </li>
                      <li>
                        <a
                          href="/auth/home/Times/Cuiaba"
                          className="flex items-center p-2 text-gray-900 transition duration-75 pl-4 group hover:bg-[#004B14]"
                        >
                          <img src="https://logodetimes.com/times/cuiaba/logo-cuiaba-1536.png" alt="Cuiabá" className="w-11 h-11 mr-2" />
          
                        </a>
                      </li>
                      <li>
                        <a
                          href="/auth/home/Times/Internacional"
                          className="flex items-center p-2 text-gray-900 transition duration-75 pl-4 group hover:bg-[#004B14]"
                        >
                          <img src="https://logodetimes.com/times/internacional/logo-internacional-1536.png" alt="Internacional" className="w-11 h-11 mr-2" />
          
                        </a>
                      </li>
                      <li>
                        <a
                          href="/auth/home/Times/Palmeiras"
                          className="flex items-center p-2 text-gray-900 transition duration-75 pl-4 group hover:bg-[#004B14]"
                        >
                          <img src="https://logodetimes.com/times/palmeiras/logo-palmeiras-1536.png" alt="Palmeiras" className="w-11 h-11 mr-2" />
          
                        </a>
                      </li>
                      
                    </ul>
                    
                  )}
                  {isDropdownOpen2 && (
                    <ul className="flex py-1 space-x-0">
                      <li>
                        <a
                          href="/auth/home/Times/Fortaleza"
                          className="flex items-center p-2 text-gray-900 transition duration-75 pl-4 group hover:bg-[#004B14]"
                        >
                          <img src="https://logodetimes.com/times/fortaleza/logo-fortaleza-1536.png" alt="Fortaleza" className="w-11 h-11 mr-2" />
          
                        </a>
                      </li>
                      <li>
                        <a
                          href="/auth/home/Times/Vasco"
                          className="flex items-center p-2 text-gray-900 transition duration-75 pl-4 group hover:bg-[#004B14]"
                        >
                          <img src="https://logodetimes.com/times/vasco-da-gama/logo-vasco-da-gama-1536.png" alt="Vasco" className="w-11 h-11 mr-2" />
          
                        </a>
                      </li>
                      <li>
                        <a
                          href="/auth/home/Times/Fluminense"
                          className="flex items-center p-2 text-gray-900 transition duration-75 pl-4 group hover:bg-[#004B14]"
                        >
                          <img src="https://logodetimes.com/times/fluminense/logo-fluminense-1536.png" alt="Fluminense" className="w-11 h-11 mr-2" />
          
                        </a>
                      </li>
                      <li>
                        <a
                          href="/auth/home/Times/Cruzeiro"
                          className="flex items-center p-2 text-gray-900 transition duration-75 pl-4 group hover:bg-[#004B14]"
                        >
                          <img src="https://logodetimes.com/times/cruzeiro/logo-cruzeiro-1536.png" alt="Cruzeiro" className="w-11 h-11 mr-2" />
          
                        </a>
                      </li>
                    </ul>
                  )}
                  {isDropdownOpen2 && (
                    <ul className="flex py-1 space-x-0">
                      <li>
                        <a
                          href="/auth/home/Times/Botafogo"
                          className="flex items-center p-2 text-gray-900 transition duration-75 pl-4 group hover:bg-[#004B14]"
                        >
                          <img src="https://logodetimes.com/times/botafogo/logo-botafogo-2048.png" alt="Botafogo" className="w-11 h-11 mr-2" />
          
                        </a>
                      </li>
                      <li>
                        <a
                          href="/auth/home/Times/Bahia"
                          className="flex items-center p-2 text-gray-900 transition duration-75 pl-4 group hover:bg-[#004B14]"
                        >
                          <img src="https://logodetimes.com/times/bahia/logo-bahia-2048.png" alt="Bahia" className="w-11 h-11 mr-2" />
          
                        </a>
                      </li>
                      <li>
                        <a
                          href="/auth/home/Times/Atletico_Paranaense"
                          className="flex items-center p-2 text-gray-900 transition duration-75 pl-4 group hover:bg-[#004B14]"
                        >
                          <img src="https://logodetimes.com/times/atletico-paranaense/logo-atletico-paranaense-2048.png" alt="Atletico Paranaense" className="w-11 h-11 mr-2" />
          
                        </a>
                      </li>
                      <li>
                        <a
                          href="/auth/home/Times/Atletico_Mineiro"
                          className="flex items-center p-2 text-gray-900 transition duration-75 pl-4 group hover:bg-[#004B14]"
                        >
                          <img src="https://logodetimes.com/times/atletico-mineiro/logo-atletico-mineiro-2048.png" alt="Atletico Mineiro" className="w-11 h-11 mr-2" />
          
                        </a>
                      </li>
                    </ul>
                  )}
                  {isDropdownOpen2 && (
                    <ul className="flex py-1 space-x-0">
                      <li>
                        <a
                          href="/auth/home/Times/Sao_Paulo"
                          className="flex items-center p-2 text-gray-900 transition duration-75 pl-4 group hover:bg-[#004B14]"
                        >
                          <img src="https://logodetimes.com/times/sao-paulo/logo-sao-paulo-2048.png" alt="São Paulo" className="w-11 h-11 mr-2" />
          
                        </a>
                      </li>
                      <li>
                        <a
                          href="/auth/home/Times/Gremio"
                          className="flex items-center p-2 text-gray-900 transition duration-75 pl-4 group hover:bg-[#004B14]"
                        >
                          <img src="https://logodetimes.com/times/gremio/logo-gremio-2048.png" alt="Grêmio" className="w-11 h-11 mr-2" />
          
                        </a>
                      </li>
                      <li>
                        <a
                          href="/auth/home/Times/America_Mineiro"
                          className="flex items-center p-2 text-gray-900 transition duration-75 pl-4 group hover:bg-[#004B14]"
                        >
                          <img src="https://logodetimes.com/times/america-mineiro/logo-america-mineiro-2048.png" alt="América Mineiro" className="w-11 h-11 mr-2" />
          
                        </a>
                      </li>
                      <li>
                        <a
                          href="/auth/home/Times/Flamengo"
                          className="flex items-center p-2 text-gray-900 transition duration-75 pl-4 group hover:bg-[#004B14]"
                        >
                          <img src="https://logodetimes.com/times/flamengo/logo-flamengo-2048.png" alt="Flamengo" className="w-11 h-11 mr-2" />
          
                        </a>
                      </li>
                    </ul>
                  )}
                  {isDropdownOpen2 && (
                    <ul className="flex py-1 space-x-0">
                      <li>
                        <a
                          href="/auth/home/Times/Corinthias"
                          className="flex items-center p-2 text-gray-900 transition duration-75 pl-4 group hover:bg-[#004B14]"
                        >
                          <img src="https://logodetimes.com/times/corinthians/logo-corinthians-2048.png" alt="Corinthias" className="w-11 h-11 mr-2" />
          
                        </a>
                      </li>
                      <li>
                        <a
                          href="/auth/home/Times/Criciuma"
                          className="flex items-center p-2 text-gray-900 transition duration-75 pl-4 group hover:bg-[#004B14]"
                        >
                          <img src="https://logodetimes.com/times/criciuma/logo-criciuma-1.png" alt="Criciuma" className="w-11 h-11 mr-2" />
          
                        </a>
                      </li>
                      <li>
                        <a
                          href="/auth/home/Times/Juventude"
                          className="flex items-center p-2 text-gray-900 transition duration-75 pl-4 group hover:bg-[#004B14]"
                        >
                          <img src="https://logodetimes.com/times/juventude/logo-juventude-2048.png" alt="Juventude" className="w-11 h-11 mr-2" />
          
                        </a>
                      </li>
                      <li>
                        <a
                          href="/auth/home/Times/Atletico_Goianiense"
                          className="flex items-center p-2 text-gray-900 transition duration-75 pl-4 group hover:bg-[#004B14]"
                        >
                          <img src="https://logodetimes.com/times/atletico-goianiense/logo-atletico-goianiense-512.png" alt="Atletico Goianiense" className="w-11 h-11 mr-2" />
          
                        </a>
                      </li>
                    </ul>
                  )}
                  {isDropdownOpen2 && (
                    <ul className="flex py-1 space-x-0">
                      <li>
                        <a
                          href="/auth/home/Times/Vitoria"
                          className="flex items-center p-2 text-gray-900 transition duration-75 pl-4 group hover:bg-[#004B14]"
                        >
                          <img src="https://logodetimes.com/times/vitoria/logo-vitoria-2048.png" alt="Vitória" className="w-11 h-11 mr-2" />
          
                        </a>
                      </li>
                    </ul>
                  )}
                </li>
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
