"use client";

import { Match } from "@/models/match";
import { CardTimes } from "@/components/home/card-times";
import {useEffect, useState} from "react";

export const GridTimes = () => {
  const [matches, setMatches] = useState<Match[]>([]);

  const [favorito, setFavorito] = useState();
    useEffect(() => {
        fetch(`http://localhost:8000/auth/v1/favorito`)
            .then(response => response.json())
            .then(data => {
                setFavorito(data.favorito);
            })
            .catch(error => {
                console.error('Erro ao buscar os dados:', error);
            });
    }, []);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/v1/games/brasileirao/${favorito}`);
        const data = await response.json();
        const fetchedMatches = data.map((item: any) => new Match(item.campeonato, item.data_hora, item.time_1, item.time_2, item.channels));
        setMatches(fetchedMatches);
      } catch (error) {
        console.error('Erro ao buscar os dados:', error);
      }
    };

    fetchMatches();
  }, [favorito]);

  return (
      <div className="grid grid-cols-2 gap-2">
        {matches.map((match, index) => (
            <CardTimes key={index} match={match} />
        ))}
      </div>
  );
};
