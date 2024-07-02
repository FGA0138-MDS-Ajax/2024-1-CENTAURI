'use client';

// Imports necessários para a página do canal
import React, {useEffect, useState} from "react";
import { Bebas_Neue } from "next/font/google";
import { cn } from "@/lib/utils";
import {CardTimes} from "@/components/home/card-times";
import {Match} from "@/models/match";

// Define a fonte utilizada na página
const font = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Home() {
  // Realiza a busca dos jogos que passam no canal
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
      fetch("http://localhost:8000/api/v2/games/band")
          .then(response => response.json())
          .then(data => {
              // Converte os dados para o modelo de partida
              const matchInstances = data.map((matchData: any) => new Match(
                  matchData.campeonato,
                  matchData.data_hora,
                  matchData.time_1,
                  matchData.time_2,
                  matchData.channels
              ));
              setMatches(matchInstances);
          })

          // Exibe um erro caso ocorra algum problema na busca dos dados 
          .catch(error => {
              console.error('Erro ao buscar os dados:', error);
          });
  }, []);

  return (
    <div className="min-h-screen bg-custom-gradient">
      <main className="flex flex-col items-center justify-center flex-grow">
        {/* Busca a logo do canal */}
        <img
          src="https://seeklogo.com/images/B/bandeirantes-logo-51FB194B24-seeklogo.com.png?v=638249318130000000"
          alt="Band"
          width={200}
          height={200}
        />
        <div className="space-y-6 text-center">

          {/* Define um titulo com o nome do canal */}
          <h1 className={cn(
              "text-6xl font-semibold text-white drop-shadow-md", font.className)}>
            Band</h1>

          {/* Lista os jogos que irão passar no canal em cards*/}
          <div className="grid grid-cols-2 gap-2">
              {matches.map((match, index) => (
                  <CardTimes key={index} match={match} />))}
          </div>

        </div>

      </main>
    </div>
  );
}

