import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full bg-custom-gradient">
      <Navbar />
      <main className="items-center justify-centerv">
        <div className="absolute top-4 left-4">
          <Sidebar />
        </div>
        {children}
      </main>
    </div>
  );
}
