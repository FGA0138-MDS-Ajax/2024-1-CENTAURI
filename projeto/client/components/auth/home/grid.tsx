"use client";

import { Match } from "@/app/models/match";
import { CardTimes } from "@/components/auth/home/card-times";

const matches: Match[] = [
  new Match("Brasileirão", "24/06/2024 13:30", "Time A", "Time B", ["Globo", "SporTV"]),
  new Match("Brasileirão", "25/06/2024 16:00", "Time C", "Time D", ["ESPN", "Fox Sports"]),
  new Match("Brasileirão", "26/06/2024 18:30", "Time E", "Time F", ["TNT Sports", "Premiere"]),
  new Match("Brasileirão", "27/06/2024 20:45", "Time G", "Time H", ["Globo", "SporTV"]),
  new Match("Brasileirão", "28/06/2024 21:00", "Time I", "Time J", ["ESPN", "Fox Sports"]),
  new Match("Brasileirão", "29/06/2024 14:00", "Time K", "Time L", ["TNT Sports", "Premiere"]),
  new Match("Brasileirão", "30/06/2024 15:30", "Time M", "Time N", ["Globo", "SporTV"]),
  new Match("Brasileirão", "01/07/2024 19:00", "Time O", "Time P", ["ESPN", "Fox Sports"])
];

export const GridTimes = () => {
  return (
    <div className="grid grid-cols-2 gap-2">
      {matches.map((match, index) => (
        <CardTimes key={index} match={match} />
      ))}
    </div>
  );
};
