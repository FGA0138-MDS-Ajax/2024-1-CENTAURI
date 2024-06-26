'use client';

import React, { useState } from 'react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);
  const [isNestedDropdownOpen, setIsNestedDropdownOpen] = useState(false);
  const [isNestedDropdownOpen2, setIsNestedDropdownOpen2] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleDropdown2 = () => {
    setIsDropdownOpen2(!isDropdownOpen2);
  };

  const toggleNestedDropdown = () => {
    setIsNestedDropdownOpen(!isNestedDropdownOpen);
  };

  const toggleNestedDropdown2 = () => {
    setIsNestedDropdownOpen2(!isNestedDropdownOpen2);
  };


  return (
    <div className="relative">
      <button
        type="button"
        onClick={toggleSidebar}
        className="absolute top-1 left-4 inline-flex justify-center items-center w-10 h-10 bg-transparent text-black hover:bg-gray-200 text-lg font-semibold rounded-lg focus:outline-none "
      >
        <svg
          className="w-8 h-8"
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
            <div className="flex-1 h-0 pt-0 pb-4 overflow-y-auto">
              <span className="text-white flex items-center justify-between py-3 px-2 bg-[#005B14]">
                Menu
              </span>
              <nav className="mt-0">
                <ol className="relative">
                  <button
                    type="button"
                    className="flex items-center w-full p-2 text-base text-white transition duration-75 group hover:bg-[#004B14] py-4"
                    onClick={toggleDropdown}
                  >
                    <span className="flex-1 text-left rtl:text-right whitespace-nowrap">
                      Campeonatos Disponíveis
                    </span>
                    <svg
                      className={`w-3 h-3 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
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
                    <ul className="py- space-y-2">
                      <li>
                        <a
                          className="flex items- w-full p-1 text-white pl-4 "
                        >
                          <img src="https://logospng.org/download/brasileirao-serie-a/logo-brasileirao-escudo-256.png" alt="Brasileirão" className="w-8 h-8 mr-1 ml-1" />
                          Brasileirão Série A
                        </a>
                      </li>
                      <li>
                        <a
                          className="flex items-center w-full p-1 text-white  pl-4 "
                        >
                          <img src="https://logospng.org/download/copa-libertadores/logo-copa-libertadores-256.png" alt="Libertadores" className="w-8 h-10 mr-1 ml-1" />
                          Libertadores
                        </a>
                      </li>
                    </ul>
                  )}
                </ol>
              </nav>
              <nav className="mt-0">
                <ol className="relative">
                  <button
                    type="button"
                    className="flex items-center w-full p-2 text-base text-white transition duration-75 group hover:bg-[#004B14] py-4"
                    onClick={toggleDropdown2}
                  >
                    <span className="flex-1 text-left rtl:text-right whitespace-nowrap">
                      Times
                    </span>
                    <svg
                      className={`w-3 h-3 transition-transform duration-300 transform ${isDropdownOpen2 ? 'rotate-180' : ''}`}
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
                    <ul className="py-0 space-y-2">
                      <li>
                        <button
                          type="button"
                          className="flex items-center w-full p-2 text-base text-white transition duration-75 pl-1 group hover:bg-[#004B14]"
                          onClick={toggleNestedDropdown}
                        >
                          <span className="px-3 flex-2 text-left rtl:text-right whitespace-nowrap">
                            Brasileiros
                          </span>
                          <svg
                            className={`w-2 h-2 transition-transform duration-300 transform ${isNestedDropdownOpen ? 'rotate-180' : ''}`}
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
                        {isNestedDropdownOpen && (
                          <ul className="flex py-1 space-x-0">
                          <li>
                            <a 
                              href="/home/timesBr/Bragantino"
                              className="flex items-center p-2 text-gray-900 transition duration-75 pl-4 group hover:bg-[#004B14]"
                            >
                               <img src="https://logodetimes.com/times/red-bull-bragantino/logo-red-bull-bragantino-1536.png" alt="Red Bull Bragantino" className="w-11 h-11 mr-1 ml-1" />
                               
                            </a>
                          </li>
                          <li>
                            <a
                              href="/home/timesBr/Cuiaba"
                              className="flex items-center p-2 text-gray-900 transition duration-75 pl-4 group hover:bg-[#004B14]"
                            >
                              <img src="https://logodetimes.com/times/cuiaba/logo-cuiaba-1536.png" alt="Cuiabá" className="w-11 h-11 mr-2" />
              
                            </a>
                          </li>
                          <li>
                            <a
                              href="/home/timesBr/Internacional"
                              className="flex items-center p-2 text-gray-900 transition duration-75 pl-4 group hover:bg-[#004B14]"
                            >
                              <img src="https://logodetimes.com/times/internacional/logo-internacional-1536.png" alt="Internacional" className="w-11 h-11 mr-2" />
              
                            </a>
                          </li>
                          <li>
                            <a
                              href="/home/timesBr/Palmeiras"
                              className="flex items-center p-2 text-gray-900 transition duration-75 pl-4 group hover:bg-[#004B14]"
                            >
                              <img src="https://logodetimes.com/times/palmeiras/logo-palmeiras-1536.png" alt="Palmeiras" className="w-11 h-11 mr-2" />
              
                            </a>
                          </li>
                          
                        </ul>
                        
                      )}
                      {isNestedDropdownOpen && (
                        <ul className="flex py-1 space-x-0">
                          <li>
                            <a
                              href="/home/timesBr/Fortaleza"
                              className="flex items-center p-2 text-gray-900 transition duration-75 pl-4 group hover:bg-[#004B14]"
                            >
                              <img src="https://logodetimes.com/times/fortaleza/logo-fortaleza-1536.png" alt="Fortaleza" className="w-11 h-11 mr-2" />
              
                            </a>
                          </li>
                          <li>
                            <a
                              href="/home/timesBr/Vasco"
                              className="flex items-center p-2 text-gray-900 transition duration-75 pl-4 group hover:bg-[#004B14]"
                            >
                              <img src="https://logodetimes.com/times/vasco-da-gama/logo-vasco-da-gama-1536.png" alt="Vasco" className="w-11 h-11 mr-2" />
              
                            </a>
                          </li>
                          <li>
                            <a
                              href="/home/timesBr/Fluminense"
                              className="flex items-center p-2 text-gray-900 transition duration-75 pl-4 group hover:bg-[#004B14]"
                            >
                              <img src="https://logodetimes.com/times/fluminense/logo-fluminense-1536.png" alt="Fluminense" className="w-11 h-11 mr-2" />
              
                            </a>
                          </li>
                          <li>
                            <a
                              href="/home/timesBr/Cruzeiro"
                              className="flex items-center p-2 text-gray-900 transition duration-75 pl-4 group hover:bg-[#004B14]"
                            >
                              <img src="https://logodetimes.com/times/cruzeiro/logo-cruzeiro-1536.png" alt="Cruzeiro" className="w-11 h-11 mr-2" />
              
                            </a>
                          </li>
                        </ul>
                      )}
                      {isNestedDropdownOpen && (
                        <ul className="flex py-1 space-x-0">
                          <li>
                            <a
                              href="/home/timesBr/Botafogo"
                              className="flex items-center p-2 text-gray-900 transition duration-75 pl-4 group hover:bg-[#004B14]"
                            >
                              <img src="https://logodetimes.com/times/botafogo/logo-botafogo-2048.png" alt="Botafogo" className="w-11 h-11 mr-2" />
              
                            </a>
                          </li>
                          <li>
                            <a
                              href="/home/timesBr/Bahia"
                              className="flex items-center p-2 text-gray-900 transition duration-75 pl-4 group hover:bg-[#004B14]"
                            >
                              <img src="https://logodetimes.com/times/bahia/logo-bahia-2048.png" alt="Bahia" className="w-11 h-11 mr-2" />
              
                            </a>
                          </li>
                          <li>
                            <a
                              href="/home/timesBr/Atletico_Paranaense"
                              className="flex items-center p-2 text-gray-900 transition duration-75 pl-4 group hover:bg-[#004B14]"
                            >
                              <img src="https://logodetimes.com/times/atletico-paranaense/logo-atletico-paranaense-2048.png" alt="Atletico Paranaense" className="w-11 h-11 mr-2" />
              
                            </a>
                          </li>
                          <li>
                            <a
                              href="/home/timesBr/Atletico_Mineiro"
                              className="flex items-center p-2 text-gray-900 transition duration-75 pl-4 group hover:bg-[#004B14]"
                            >
                              <img src="https://logodetimes.com/times/atletico-mineiro/logo-atletico-mineiro-2048.png" alt="Atletico Mineiro" className="w-11 h-11 mr-2" />
              
                            </a>
                          </li>
                        </ul>
                      )}
                      {isNestedDropdownOpen && (
                        <ul className="flex py-1 space-x-0">
                          <li>
                            <a
                              href="/home/timesBr/Sao_Paulo"
                              className="flex items-center p-2 text-gray-900 transition duration-75 pl-4 group hover:bg-[#004B14]"
                            >
                              <img src="https://logodetimes.com/times/sao-paulo/logo-sao-paulo-2048.png" alt="São Paulo" className="w-11 h-11 mr-2" />
              
                            </a>
                          </li>
                          <li>
                            <a
                              href="/home/timesBr/Gremio"
                              className="flex items-center p-2 text-gray-900 transition duration-75 pl-4 group hover:bg-[#004B14]"
                            >
                              <img src="https://logodetimes.com/times/gremio/logo-gremio-2048.png" alt="Grêmio" className="w-11 h-11 mr-2" />
              
                            </a>
                          </li>
                          <li>
                            <a
                              href="/home/timesBr/America_Mineiro"
                              className="flex items-center p-2 text-gray-900 transition duration-75 pl-4 group hover:bg-[#004B14]"
                            >
                              <img src="https://logodetimes.com/times/america-mineiro/logo-america-mineiro-2048.png" alt="América Mineiro" className="w-11 h-11 mr-2" />
              
                            </a>
                          </li>
                          <li>
                            <a
                              href="/home/timesBr/Flamengo"
                              className="flex items-center p-2 text-gray-900 transition duration-75 pl-4 group hover:bg-[#004B14]"
                            >
                              <img src="https://logodetimes.com/times/flamengo/logo-flamengo-2048.png" alt="Flamengo" className="w-11 h-11 mr-2" />
              
                            </a>
                          </li>
                        </ul>
                      )}
                      {isNestedDropdownOpen && (
                        <ul className="flex py-1 space-x-0">
                          <li>
                            <a
                              href="/home/timesBr/Corinthias"
                              className="flex items-center p-2 text-gray-900 transition duration-75 pl-4 group hover:bg-[#004B14]"
                            >
                              <img src="https://logodetimes.com/times/corinthians/logo-corinthians-2048.png" alt="Corinthias" className="w-11 h-11 mr-2" />
              
                            </a>
                          </li>
                          <li>
                            <a
                              href="/home/timesBr/Criciuma"
                              className="flex items-center p-2 text-gray-900 transition duration-75 pl-4 group hover:bg-[#004B14]"
                            >
                              <img src="https://logodetimes.com/times/criciuma/logo-criciuma-1.png" alt="Criciuma" className="w-11 h-11 mr-2" />
              
                            </a>
                          </li>
                          <li>
                            <a
                              href="/home/timesBr/Juventude"
                              className="flex items-center p-2 text-gray-900 transition duration-75 pl-4 group hover:bg-[#004B14]"
                            >
                              <img src="https://logodetimes.com/times/juventude/logo-juventude-2048.png" alt="Juventude" className="w-11 h-11 mr-2" />
              
                            </a>
                          </li>
                          <li>
                            <a
                              href="/home/timesBr/Atletico_Goianiense"
                              className="flex items-center p-2 text-gray-900 transition duration-75 pl-4 group hover:bg-[#004B14]"
                            >
                              <img src="https://logodetimes.com/times/atletico-goianiense/logo-atletico-goianiense-512.png" alt="Atletico Goianiense" className="w-11 h-11 mr-2" />
              
                            </a>
                          </li>
                        </ul>
                      )}
                      {isNestedDropdownOpen && (
                        <ul className="flex py-1 space-x-0">
                          <li>
                            <a
                              href="/home/timesBr/Vitoria"
                              className="flex items-center p-2 text-gray-900 transition duration-75 pl-4 group hover:bg-[#004B14]"
                            >
                              <img src="https://logodetimes.com/times/vitoria/logo-vitoria-2048.png" alt="Vitória" className="w-11 h-11 mr-2" />
              
                            </a>
                          </li>
                        </ul>
                      )} 
                      </li>
                      <li>
                        <button
                          type="button"
                          className="flex items-center w-full p-2 text-base text-white transition duration-75 pl-1 group hover:bg-[#004B14]"
                          onClick={toggleNestedDropdown2}
                        >
                          <span className="px-3 flex-2 text-left rtl:text-right whitespace-nowrap">
                            Sul-americanos
                          </span>
                          <svg
                            className={`w-2 h-2 transition-transform duration-300 transform ${isNestedDropdownOpen2 ? 'rotate-180' : ''}`}
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
                        {isNestedDropdownOpen2 && (
                          <ul className="flex py-1 space-x-0">
                          <li>
                            <a
                              href="/home/timesSa/San_Lorenzo"
                              className="flex items-center p-2 text-gray-900 transition duration-75 pl-4 group hover:bg-[#004B14]"
                            >
                              <img src="https://logodetimes.com/times/san-lorenzo/logo-san-lorenzo-4096.png" alt="San Lorenzo" className="w-11 h-11 mr-2" />
              
                            </a>
                          </li>
                          <li>
                            <a
                              href="/home/timesSa/ColoColo"
                              className="flex items-center p-2 text-gray-900 transition duration-75 pl-4 group hover:bg-[#004B14]"
                            >
                              <img src="https://icons.iconarchive.com/icons/giannis-zographos/south-american-football-club/128/Colo-Colo-icon.png" alt="Colo Colo" className="w-11 h-11 mr-2" />
              
                            </a>
                          </li>
                          <li>
                            <a
                              href="/home/timesSa/junior_barranquilla"
                              className="flex items-center p-2 text-gray-900 transition duration-75 pl-4 group hover:bg-[#004B14]"
                            >
                              <img src="https://logodetimes.com/times/junior-barranquilla/logo-junior-barranquilla-4096.png" alt="Junior Barranquilla" className="w-11 h-11 mr-2" />
              
                            </a>
                          </li>
                          <li>
                            <a
                              href="/home/timesSa/Penarol"
                              className="flex items-center p-2 text-gray-900 transition duration-75 pl-4 group hover:bg-[#004B14]"
                            >
                              <img src="https://logodetimes.com/times/penarol/logo-penarol-4096.png" alt="Peñarol" className="w-11 h-11 mr-2" />
              
                            </a>
                          </li>
                        </ul>
                        )}
                        {isNestedDropdownOpen2 && (
                          <ul className="flex py-1 space-x-0">
                          <li>
                            <a
                              href="/home/timesSa/The_Strongest"
                              className="flex items-center p-2 text-gray-900 transition duration-75 pl-4 group hover:bg-[#004B14]"
                            >
                              <img src="/the-strongest-logo-escudo.png" alt="The Strongest" className="w-11 h-11 mr-2" />
              
                            </a>
                          </li>
                          <li>
                            <a
                              href="/home/timesSa/Talleres"
                              className="flex items-center p-2 text-gray-900 transition duration-75 pl-4 group hover:bg-[#004B14]"
                            >
                              <img src="https://logodetimes.com/times/talleres/logo-talleres-4096.png" alt="Talleres" className="w-11 h-11 mr-2" />
              
                            </a>
                          </li>
                          <li>
                            <a
                              href="/home/timesSa/River_Plate"
                              className="flex items-center p-2 text-gray-900 transition duration-75 pl-4 group hover:bg-[#004B14]"
                            >
                              <img src="https://logodetimes.com/times/river-plate/logo-river-plate.png" alt="River Plate" className="w-11 h-11 mr-2" />
              
                            </a>
                          </li>
                          <li>
                            <a
                              href="/home/timesSa/Nacional-URU"
                              className="flex items-center p-2 text-gray-900 transition duration-75 pl-4 group hover:bg-[#004B14]"
                            >
                              <img src="https://logodetimes.com/times/nacional-uruguai/logo-nacional-uruguai-4096.png" alt="Nacional-URU" className="w-11 h-11 mr-2" />
              
                            </a>
                          </li>
                        </ul>
                        )}
                        {isNestedDropdownOpen2 && (
                          <ul className="flex py-1 space-x-0">
                          <li>
                            <a
                              href="/home/timesSa/Bolivar"
                              className="flex items-center p-2 text-gray-900 transition duration-75 pl-4 group hover:bg-[#004B14]"
                            >
                              <img src="https://logodetimes.com/times/bolivar/logo-bolivar-4096.png" alt="Bolivar" className="w-11 h-11 mr-2" />
              
                            </a>
                          </li>
                        </ul>
                        )}
                      </li>
                    </ul>
                  )}
                </ol>
              </nav>
            </div>
            </div>
            <div className="fixed bottom-0 py-0 space-y-2">
              <button
                type="button"
                className="flex items-center p-4 text-base text-white transition duration-75 group hover:bg-[#004B14]"
              >
                <span className="flex-1 text-left rtl:text-right whitespace-nowrap">
                </span>
              </button>
              <li>
                <a
                  href="/settings"
                  className="flex items-center p-2 text-gray-900 transition duration-75 pl-4 group hover:bg-[#004B14]"
                >
                  <img src="/icons8-settings-50(1).png" alt="Settings" className="w-6 h-6 mr-2" />
              
                </a>
              </li>
          </div>
          <div className="flex-shrink-0 w-14" aria-hidden="true">
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
