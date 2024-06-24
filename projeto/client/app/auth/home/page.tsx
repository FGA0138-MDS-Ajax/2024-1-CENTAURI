import React from 'react';
import { Bebas_Neue } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { LoginButton } from '@/components/auth/login-button';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';

const font = Bebas_Neue({
  subsets: ['latin'],
  weight: ['400'],
});

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-custom-gradient">
      <Navbar />
      <main className="flex flex-col items-center justify-center flex-grow">
        <img src="/logo.png" alt="Logo" width={100} height={50} />
        
        <div className="absolute top-4 left-4">
      <Sidebar/>
        </div>

        <div className="space-y-6 text-center">
          <h1
            className={cn(
              'text-6xl font-semibold text-white drop-shadow-md',
              font.className
            )}
          >
            Onde é o jogo?
          </h1>
          <p className="text-lg text-black">
            Chega de ficar se perguntando onde o jogo do seu time favorito será transmitido
          </p>
        </div>
      </main>
    </div>
  );
}
