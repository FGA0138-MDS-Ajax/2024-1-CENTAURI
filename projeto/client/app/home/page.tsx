"use client";

import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Match } from '@/app/models/match';
import { Bebas_Neue } from 'next/font/google';
import { GridTimes } from '@/components/home/grid';
import { CardTimes } from '@/components/home/card-times';
import { CardCanais } from '@/components/home/card-canais';

const font = Bebas_Neue({
    subsets: ['latin'],
    weight: ['400'],
});

const h1ClassName = "text-4xl font-semibold text-black drop-shadow-md text-center mt-8 mb-8";
const h2ClassName = "text-3xl font-semibold text-black drop-shadow-md";

const lib = new Match("Libertadores", "Sem Jogos", "", "", [""]);
const br = new Match("Brasileirão", "Sem Jogos", "", "", [""]);
const canais = ["Sportv", "Premiere", "Globo", "ESPN", "Disney+", "Paramount+"].sort();

export default function HomePage() {
    const [favorito, setFavorito] = useState();
    useEffect(() => {
        fetch("http://localhost:8000/auth/v1/favorito")
            .then(response => response.json())
            .then(data => {
                setFavorito(data.favorito);
            })
            .catch(error => {
                console.error('Erro ao buscar os dados:', error);
            });
    }, []);

    const [rodada, setRodada] = useState(0);
    useEffect(() => {
        fetch("http://localhost:8000/api/v1/rodada")
            .then(response => response.json())
            .then(data => {
                setRodada(data);
            })
            .catch(error => {
                console.error('Erro ao buscar os dados:', error);
            });
    }, []);

    const [jogoBr, setJogoBr] = useState<Match>(br);
    useEffect(() => {
        fetch(`http://localhost:8000/api/v1/games/brasileirao/${favorito}`)
            .then(response => response.json())
            .then(data => {
                const jogoBrData = data[0];
                if (jogoBrData.campeonato && jogoBrData.data_hora && jogoBrData.time_1 && jogoBrData.time_2 && jogoBrData.channels) {
                    const JogoBR = new Match(jogoBrData.campeonato, jogoBrData.data_hora, jogoBrData.time_1, jogoBrData.time_2, jogoBrData.channels);
                    console.log(JogoBR);
                    setJogoBr(JogoBR);
                } else {
                    console.error('Dados inválidos recebidos da API', jogoBrData);
                }
            })
            .catch(error => {
                console.error('Erro ao buscar o jogo do Brasileirão:', error);
            });
    }, [favorito]);

    const [jogoLib, setJogoLib] = useState<Match>(lib);
    useEffect(() => {
        fetch(`http://localhost:8000/api/v1/games/liberta/${favorito}`)
            .then(response => response.json())
            .then(data => {
                const jogoLibData = data[0];
                if (jogoLibData.campeonato && jogoLibData.data_hora && jogoLibData.time_1 && jogoLibData.time_2 && jogoLibData.channels) {
                    const JogoLib = new Match(jogoLibData.campeonato, jogoLibData.data_hora, jogoLibData.time_1, jogoLibData.time_2, jogoLibData.channels);
                    console.log(JogoLib);
                    setJogoLib(JogoLib);
                } else {
                    console.error('Dados inválidos recebidos da API', data);
                }
            })
            .catch(error => {
                console.error('Erro ao buscar o jogo da Libertadores:', error);
            });
    }, [favorito]);

    return (
        <div className="h-full">
            <div className="grid grid-cols-2 divide-x-2 divide-black content-start">
    
                <div className="pt-2 pl-4 pr-4 pb-2">
                    <h1 className={cn(h1ClassName, font.className)}>Rodada {rodada}</h1>
                    <GridTimes />
                </div>
    
                <div className="pt-2 pl-4 pr-4 pb-2">
                    <h1 className={cn(h1ClassName, font.className)}>{favorito}</h1>
    
                    <div className="grid grid-rows-3 divide-y-2 divide-black gap-2">
                        <div className="pb-2">
                            <h2 className={cn(h2ClassName, font.className)}>Brasileirão</h2>
                            <div className='w-432px mx-auto'>
                                <CardTimes match={jogoBr} />
                            </div>
                        </div>
    
                        <div className="pb-2">
                            <h2 className={cn(h2ClassName, font.className)}>Libertadores</h2>
                            <div className='w-432px mx-auto'>
                                <CardTimes match={jogoLib} />
                            </div>
                        </div>
    
                        <div className="pt-2 pb-2">
                            <h2 className={cn(h2ClassName, font.className)}>Canais de Transmissão</h2>
                            <div>
                                <CardCanais canais={canais}/>
                            </div>
                        </div>

                    </div>
                    
                </div>
    
            </div>
        </div>
    );
};