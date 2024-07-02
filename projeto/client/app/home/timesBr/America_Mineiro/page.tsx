'use client';

// Imports necessários para a página do time
import React, { useEffect, useState } from 'react';
import { Bebas_Neue } from 'next/font/google';
import { cn } from '@/lib/utils';
import { CardTimes } from "@/components/home/card-times";
import { Match } from "@/models/match";

// Define a fonte utilizada na página
const font = Bebas_Neue({
    subsets: ['latin'],
    weight: ['400'],
});

// Define a página do time America Mineiro
export default function Home() {

    // Realiza a busca dos jogos do time
    const [matches, setMatches] = useState<Match[]>([]);

    useEffect(() => {
        fetch("http://localhost:8000/api/v1/games/america-mg")
            .then(response => response.json())
            .then(data => {

                // Converte os dados para o modelo Match
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

                {/* Busca a logo do time */}
                <img src="https://logodetimes.com/times/america-mineiro/logo-america-mineiro-2048.png" alt="America_Mineiro" width={100} height={100} />
                <div className="space-y-6 text-center">

                    {/* Define um titulo com o nome do time */}
                    <h1 className={cn(
                            'text-6xl font-semibold text-white drop-shadow-md', font.className)}>America Mineiro</h1>

                    {/* Lista os jogos do time em cards*/}
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
