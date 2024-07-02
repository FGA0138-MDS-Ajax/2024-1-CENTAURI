'use client';

// Importação de componentes necessários 
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { HomeButton } from '@/components/auth/home-button';

// Componente funcional Navbar
const Navbar = () => {
  // Obtém o caminho atual da página usando o hook usePathname
  const pathname = usePathname();
  
  // Condicional para renderizar o navbar dependendo do pathname
  if (pathname === "/home") {
    // Navbar para a página inicial (pathname === "/home")
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

  // Navbar para outras páginas que não sejam a página inicial
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


// Exporta o componente Navbar como padrão para ser utilizado em outros arquivos
export default Navbar;
