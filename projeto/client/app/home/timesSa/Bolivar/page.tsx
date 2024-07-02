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

// Função que renderiza a página do time
export default function Home() {
    const [matches, setMatches] = useState<Match[]>([]);

    // Função que busca os dados dos jogos do time
    useEffect(() => {
        fetch("http://localhost:8000/api/v1/games/bolivar")
            .then(response => response.json())
            .then(data => {

                // Transforma as informações lidas em instâncias de Match
                const matchInstances = data.map((matchData: any) => new Match(
                    matchData.campeonato,
                    matchData.data_hora,
                    matchData.time_1,
                    matchData.time_2,
                    matchData.channels
                ));
                setMatches(matchInstances);
            })

            // Trata erros na busca dos dados
            .catch(error => {
                console.error('Erro ao buscar os dados:', error);
            });
    }, []);

    return (
        <div className="min-h-screen bg-custom-gradient">
            <main className="flex flex-col items-center justify-center flex-grow">

                {/* Busca a logo do time */}
                <img src="https://logodetimes.com/times/bolivar/logo-bolivar-4096.png" alt="Bolivar" width={100} height={100} />
                <div className="space-y-6 text-center">

                    {/* Define um título com o nome do time */}
                    <h1 className={cn(
                            'text-6xl font-semibold text-white drop-shadow-md',
                            font.className)}>Bolivar</h1>
                    
                    {/* Lista os jogos do time em cards */}
                    <div className="grid grid-cols-2 gap-2">
                        {matches.map((match, index) => (
                            <CardTimes key={index} match={match} />))}
                    </div>
                </div>
            </main>
        </div>
    );
}
