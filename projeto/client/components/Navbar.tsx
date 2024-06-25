import Image from 'next/image';
import { HomeButton } from '@/components/auth/home-button';

const Navbar = () => {
  return (
    <nav className="bg-[#005B14] p-4 relative">
      <div className="container mx-auto flex justify-between items-center">
        <div className="container mx-auto flex justify-center items-center">
          <Image src="/logo.png" alt="Logo" width={60} height={60} />
        </div>
        <div className="absolute right-8 top-5 bg-transparent text-black hover:bg-gray-200 text-lg font-semibold py-2 px-4 rounded-lg">
          <HomeButton mode="redirect">Home</HomeButton>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

