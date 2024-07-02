"use client";

// Import para o componente Grid que armazenara os cards
import { Match } from "@/models/match";
import { CardTimes } from "@/components/home/card-times";
import {useEffect, useState} from "react";

export const GridTimes = () => {

  // Define o estado matches que armazenará os jogos
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    const fetchMatches = async () => {

      // Busca os jogos da API
      try {
        const response = await fetch(`http://localhost:8000/api/v4/games/8`);
        const data = await response.json();
        const fetchedMatches = data.map((item: any) => new Match(item.campeonato, item.data_hora, item.time_1, item.time_2, item.channels));
        setMatches(fetchedMatches);

        // Caso ocorra um erro, exibe no console
      } catch (error) {
        console.error('Erro ao buscar os dados:', error);
      }
    };

    fetchMatches();
  }, []);

  // Retorna um grid com os cards dos jogos
  return (
      <div className="grid grid-cols-2 gap-2">
        {/* Faz o mapeamento das partidas a serem exibidas nos cards */}
        {matches.map((match, index) => (
            <CardTimes key={index} match={match} />
        ))}
      </div>
  );
};
