"use client";

import { Match } from "@/app/models/match";
import { CardTimes } from "@/components/auth/home/card-times";

// Cria um vetor de 8 instâncias de Match
const matches: Match[] = [
  new Match("Brasileirão", "24/06/2024 13:30", "Time A", "Time B", ["Globo", "SporTV"]),
];

export const GridBrasileirao = () => {
  return (
    <div className="grid grid-cols-2 gap-2 ">
      {matches.map((match, index) => (
        <CardTimes key={index} match={match} />
      ))}
    </div>
  );
};