import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-custom-gradient">
      <Navbar />
      <main className="w-screen items-center justify-center">
        <div className="absolute top-4 left-4">
          <Sidebar />
        </div>
        {children}
      </main>
    </div>
  );
}
