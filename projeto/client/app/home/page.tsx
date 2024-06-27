"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { Match } from '@/app/models/match';
import { Bebas_Neue } from 'next/font/google';
import { GridTimes } from '@/components/auth/home/grid';
import { CardTimes } from '@/components/auth/home/card-times';


const font = Bebas_Neue({
  subsets: ['latin'],
  weight: ['400'],
});

const h1ClassName = "text-4xl font-semibold text-black drop-shadow-md text-center mt-8 mb-8";
const h2ClassName = "text-3xl font-semibold text-black drop-shadow-md";
const divCardsClassName = "w-full pt-4 pb-4";

// Partidas exemplos
const lib = new Match("Libertadores", "24/06/2024 13:30", "Time A", "Time B", ["Globo", "SporTV"]);
const br = new Match("Brasileirão", "24/06/2024 13:30", "Time A", "Time B", ["Globo", "SporTV"]);

export default function HomePage() {
  return (
    <div className="min-h-full w-full">
      <div className="h-full grid grid-cols-2 divide-x-2 divide-black">

        <div className="pt-2 pl-4 pr-4">
          <h1 className={cn(h1ClassName,font.className
          )}>Rodada X</h1>
          <GridTimes />
        </div>

        <div className="pt-2 pl-4 pr-4">
          <h1 className={cn(h1ClassName,font.className)}
          >Time Usuário</h1>
          
          <div className="grid grid-rows-3 divide-y-2 divide-black content-between">
            <div className="w-full pb-4">
              <h2 className={cn(
                h2ClassName,font.className)}
                >Brasileirão</h2>

              <div className='w-432px mx-auto'>
                <CardTimes  match={br}/>
              </div>  

            </div>
            
            <div className={divCardsClassName}>
              <h2 className={cn(h2ClassName,font.className)}
                >Libertadores</h2>

                <div className='w-432px mx-auto'>
                  <CardTimes match={lib}/>
                </div>
            </div>
            
            <div className={divCardsClassName}>
            <h2 className={cn(h2ClassName,font.className)}
                >Canais de Transmissão</h2>
            </div>

          </div>

        </div>

      </div>
    </div>

  );
};
