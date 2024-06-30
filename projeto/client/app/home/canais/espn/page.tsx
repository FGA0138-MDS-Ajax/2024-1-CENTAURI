'use client';

import React, {useEffect, useState} from "react";
import { Bebas_Neue } from "next/font/google";
import { cn } from "@/lib/utils";
import {CardTimes} from "@/components/home/card-times";
import {Match} from "@/models/match";

const font = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Home() {
    const [matches, setMatches] = useState<Match[]>([]);

    useEffect(() => {
        fetch("http://localhost:8000/api/v2/games/espn")
            .then(response => response.json())
            .then(data => {
                const matchInstances = data.map((matchData: any) => new Match(
                    matchData.campeonato,
                    matchData.data_hora,
                    matchData.time_1,
                    matchData.time_2,
                    matchData.channels
                ));
                setMatches(matchInstances);
            })
            .catch(error => {
                console.error('Erro ao buscar os dados:', error);
            });
    }, []);
  return (
    <div className="min-h-screen bg-custom-gradient">
    <main className="flex flex-col items-center justify-center flex-grow">
      <img
        src="https://cdn-icons-png.flaticon.com/128/16574/16574426.png"
        alt="Espn"
        width={200}
        height={200}
      />
  
      <div className="space-y-6 text-center">
        <h1
          className={cn(
            "text-6xl font-semibold text-white drop-shadow-md",
            font.className
          )}
        >
          Espn
        </h1>
          <div className="grid grid-cols-2 gap-2">
              {matches.map((match, index) => (
                  <CardTimes key={index} match={match} />
              ))}
          </div>
      </div>
    </main>
    </div>
  );
}