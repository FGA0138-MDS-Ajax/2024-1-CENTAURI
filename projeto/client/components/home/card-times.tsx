"use client";

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card_custom"

import { Match } from "@/models/match";

interface CardTimesProps {
    match: Match;
};

export const CardTimes = ({ match }: CardTimesProps) => {
    if (match.data_hora === null) {
        return (
            <Card>
                <CardContent className="flex justify-center items-center h-32">
                    <p>Não há jogos</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>{match.formatDate()}</CardTitle>
            </CardHeader>

            <CardContent className="flex justify-center content-center">
                <p>{match.time1} X {match.time2} </p>
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
