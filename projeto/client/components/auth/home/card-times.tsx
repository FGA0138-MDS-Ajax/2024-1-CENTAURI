"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Match } from "@/app/models/match";

interface CardTimesProps {
  match: Match;
};

export const CardTimes = ({ match }: CardTimesProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{match.formatDate()}</CardTitle>
      </CardHeader>

      <CardContent className="flex justify-center content-center">
        <p>{match.time1} <a href="">🏐</a> X <a href="">🏐</a> {match.time2} </p>
      </CardContent>

      <CardFooter className="flex space-x-2 justify-center">
        {match.channels.map((channel, index) => (
          <span key={index} className="channel-item">
            {channel} 
          </span>
        ))}
      </CardFooter>
    </Card>
  );
};
