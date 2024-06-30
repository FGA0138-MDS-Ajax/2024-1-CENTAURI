'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { HomeButton } from '@/components/auth/home-button';

const Navbar = () => {
  const pathname = usePathname();

  if (pathname === "/home") {
    return (
        <nav className="bg-[#005B14] p-3 relative">
          <div className="container mx-auto flex justify-between items-center">
            <div className="container mx-auto flex justify-center items-center">
                <a href={"/"}>
              <Image
                  src="/logoss.png" alt="Logo" width={120} height={120} />
                </a>
            </div>
            <div className="absolute right-8 top-5 bg-transparent text-black hover:bg-gray-200 text-lg font-semibold py-2 px-4 rounded-lg">
            </div>
          </div>
        </nav>
    );
  }

  return (
      <nav className="bg-[#005B14] p-3 relative">
        <div className="container mx-auto flex justify-between items-center">
          <div className="container mx-auto flex justify-center items-center">
              <a href={"/"}>
                  <Image
                      src="/logoss.png" alt="Logo" width={120} height={120} />
              </a>
          </div>
          <div className="absolute right-8 top-5 bg-transparent text-black hover:bg-gray-200 text-lg font-semibold py-2 px-4 rounded-lg">
            <HomeButton mode="redirect">Home</HomeButton>
          </div>
        </div>
      </nav>
  );
};

export default Navbar;
