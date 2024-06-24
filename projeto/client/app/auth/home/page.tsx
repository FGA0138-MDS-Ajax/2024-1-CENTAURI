import React from 'react';
import { cn } from '@/lib/utils';
import { Bebas_Neue } from 'next/font/google';
import { GridTimes } from '@/components/auth/home/grid';

const font = Bebas_Neue({
  subsets: ['latin'],
  weight: ['400'],
});

export default function HomePage() {
  return (
    <div className="min-h-full w-full">
        <div className="h-full grid grid-cols-2 divide-x-2 divide-black">
            <div className="pt-2 pl-4 pr-4">
                <h1 className={cn(
                'text-4xl font-semibold text-black drop-shadow-md',
                font.className
              )}>Rodada X</h1>

              <GridTimes/>
            </div>
            
            <div className="pt-2 pl-4">
                <h1 className={cn(
                'text-4xl font-semibold text-black drop-shadow-md',
                font.className
              )}>Time Usuário</h1>
            </div>    
          </div>
    </div>   
  );
}