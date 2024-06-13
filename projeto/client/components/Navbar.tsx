import Image from 'next/image';

const Navbar = () => {
  return (
    <nav className="bg-[#005B14] p-4">
      <div className="container mx-auto flex justify-center items-center">
        <Image src="/logo.png" alt="Logo" width={50} height={50} />
      </div>
    </nav>
  );
};

export default Navbar;
