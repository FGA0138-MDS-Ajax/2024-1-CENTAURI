import React from 'react';
import { Bebas_Neue } from 'next/font/google';
import { cn } from '@/lib/utils';


const font = Bebas_Neue({
  subsets: ['latin'],
  weight: ['400'],
});

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center flex-grow">
      <img src="https://logodetimes.com/times/america-mineiro/logo-america-mineiro-2048.png" alt="América Mineiro" width={100} height={100} />
        <div className="space-y-6 text-center">
         
         <h1
            className={cn(
              'text-6xl font-semibold text-white drop-shadow-md',
              font.className
            )}
          >
            América Mineiro
          </h1>
          <p className="text-lg text-black">
            Chega de ficar se perguntando onde o jogo do seu time favorito será transmitido
          </p>
        </div>
    </main>

  );
}