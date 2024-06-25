import React from 'react';
import { cn } from '@/lib/utils';
import { Bebas_Neue } from 'next/font/google';
import { GridTimes } from '@/components/auth/home/grid';
import { GridLiberta } from '@/components/auth/home/gird-liberta';
import { GridBrasileirao } from '@/components/auth/home/grid-brasileirao';

const font = Bebas_Neue({
  subsets: ['latin'],
  weight: ['400'],
});

export default function HomePage() {
  return (
    <div className="min-h-full w-full">
        <div className="h-full grid grid-cols-2 divide-x-2 divide-black">
            <div className="pt-2 pl-4 pr-4">
              <br/>
                <h1 className={cn(
                'text-4xl font-semibold text-black drop-shadow-md text-center',
                font.className
              )}>Rodada X</h1>
              <br/>
              <GridTimes/>
            </div>
            
            <div className="pt-2 pl-4">
              <br/>
                <h1 className={cn(
                'text-4xl font-semibold text-black drop-shadow-md text-center',
                font.className
              )}>Time Usuário</h1>
              <br/>
                <h1 className={cn(
                'text-4x1 font-semibold text-black drop-shadow-md',
                font.className
              )}>Brasileirão</h1>
              <GridBrasileirao></GridBrasileirao>
              <h1 className={cn(
                'text-4x1 font-semibold text-black drop-shadow-md',
                font.className
              )}>Libertadores</h1>
              <GridLiberta></GridLiberta>
            </div>    
          </div>
    </div>   
  );
}