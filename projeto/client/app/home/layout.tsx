import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';

// Define o layout da página
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full bg-custom-gradient">

      {/* Adiciona a Navbar na pagina */}
      <Navbar />
      <main className="items-center justify-centerv">
        <div className="absolute top-4 left-4">

          {/* Adiciona a Sidebar na pagina */}
          <Sidebar />
        </div>

        {/* Define o local aonde será os elementos principais da pagina */}
        {children}
      </main>
    </div>
  );
}
