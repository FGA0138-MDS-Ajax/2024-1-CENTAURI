"use client";

// Imports necessários para a página Home
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Match } from '@/models/match';
import { Bebas_Neue } from 'next/font/google';
import { GridTimes } from '@/components/home/grid';
import { CardTimes } from '@/components/home/card-times';
import { useSession } from "next-auth/react";
import { CardCanais } from '@/components/home/card-canais';

// Define a fonte padrão para a página
const font = Bebas_Neue({
    subsets: ['latin'],
    weight: ['400'],
});

// Define algumas constantes de estilos que são repetidos
const h1ClassName = "text-4xl font-semibold text-white drop-shadow-md text-center mt-8 mb-8";
const h2ClassName = "text-3xl font-semibold text-white drop-shadow-md";

// Define as partidas padrões para a página
const lib = new Match("Libertadores", "Sem Jogos", "", "", [""]);
const br = new Match("Brasileirão", "Sem Jogos", "", "", [""]);

export default function HomePage() {

    // Define os estados da página
    const [favorito, setFavorito] = useState<string | undefined>();
    const [rodada, setRodada] = useState<number>(0);
    const [jogoBr, setJogoBr] = useState<Match>(br);
    const [jogoLib, setJogoLib] = useState<Match>(lib);
    const [canais, setCanais] = useState<string[]>([]);

    // Busca os dados do usuário logado
    const { data: session, status } = useSession();
    const id = session?.user?.id;

    // Busca os dados dos canais disponiveis
    useEffect(() => {
        fetch("http://localhost:8000/api/v1/canais")
            .then(response => response.json())
            .then(data => {
                setCanais(data);
            })
            .catch(error => {
                console.error('Erro ao buscar os dados:', error);
            });
    }, []);

    // Busca o time favorito do usuário
    useEffect(() => {
        if (id) {
            fetch(`http://localhost:8000/auth/v1/favorito/${id}`)
                .then(response => response.json())
                .then(data => {
                    setFavorito(data.TIME_FAVORITO);
                })
                .catch(error => {
                    console.error('Erro ao buscar os dados:', error);
                });
        }
    }, [id]);

    // Busca a rodada atual do Brasileirão
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

    // Verifica se a rodada é 0 para setar como 13, ou seja, a rodada atual
    if(rodada === 0){
        setRodada(13);
    }

    // Busca o jogo mais próximo do time favorito do usuário no Brasileirão
    useEffect(() => {
        if (favorito) {
            fetch(`http://localhost:8000/api/v1/games/brasileirao/${favorito}`)
                .then(response => response.json())
                .then(data => {
                    const jogoBrData = data[0];
                    if (jogoBrData.campeonato && jogoBrData.data_hora && jogoBrData.time_1 && jogoBrData.time_2 && jogoBrData.channels) {
                        const JogoBR = new Match(jogoBrData.campeonato, jogoBrData.data_hora, jogoBrData.time_1, jogoBrData.time_2, jogoBrData.channels);
                        setJogoBr(JogoBR);
                    } else {
                        console.error('Dados inválidos recebidos da API', jogoBrData);
                    }
                })
                .catch(error => {
                    console.error('Erro ao buscar o jogo do Brasileirão:', error);
                });
        }
    }, [favorito]);

    // Busca o jogo mais próximo do time favorito do usuário na Libertadores
    useEffect(() => {
        if (favorito) {
            fetch(`http://localhost:8000/api/v1/games/liberta/${favorito}`)
                .then(response => response.json())
                .then(data => {
                    const jogoLibData = data[0];
                    if (jogoLibData.campeonato && jogoLibData.data_hora && jogoLibData.time_1 && jogoLibData.time_2 && jogoLibData.channels) {
                        const JogoLib = new Match(jogoLibData.campeonato, jogoLibData.data_hora, jogoLibData.time_1, jogoLibData.time_2, jogoLibData.channels);
                        setJogoLib(JogoLib);
                    } else {
                        console.error('Dados inválidos recebidos da API', data);
                    }
                })
                .catch(error => {
                    console.error('Erro ao buscar o jogo da Libertadores:', error);
                });
        }
    }, [favorito]);

    // Verifica o status da página
    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    // Verifica se o usuário está logado
    if (!id) {
        return <div>User not logged in</div>;
    }

    return (
        <div className="min-h-screen bg-custom-gradient">
            <div className="h-full">

                {/* Separa a pagina em duas colunas principais */}
                <div className="grid grid-cols-2 divide-white content-start">

                    {/* Coluna da Esquerda */}
                    <div className="pt-2 pl-4 pr-4 pb-2">

                        {/* Define o titulo para os proximos 8 jogos */}
                        <h1 className={cn(h1ClassName, font.className)}>Rodada {rodada} do Brasileirão e Oitavas Libertadores</h1>
                        <GridTimes />
                    </div>

                    {/* Coluna da Direita */}
                    <div className="pt-2 pl-4 pr-4 pb-2">

                        {/* Time favorito do usuario */}
                        <h1 className={cn(h1ClassName, font.className)}>{favorito}</h1>

                        {/* Define 3 linhas para separar o conteudo*/}
                        <div className="grid grid-rows-3 divide-y-2 divide-white gap-2">

                            {/* Linha para o jogo mais próximo do time do usuário */}
                            <div className="pb-2">
                                <h2 className={cn(h2ClassName, font.className)}>Brasileirão</h2>
                                <div className='w-432px mx-auto'>
                                    <CardTimes match={jogoBr} />
                                </div>
                            </div>
        
                            {/* Linha para o jogo mais próximo do time do usuário */}
                            <div className="pb-2">
                                <h2 className={cn(h2ClassName, font.className)}>Libertadores</h2>
                                <div className='w-432px mx-auto'>
                                    <CardTimes match={jogoLib} />
                                </div>
                            </div>
        
                            {/* Linha para os canais de transmissão */}
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
        </div>
    );
};