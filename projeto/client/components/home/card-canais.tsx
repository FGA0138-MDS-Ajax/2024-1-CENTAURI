"use client";

// Imports necessários para o componente CardCanais
import React from "react";
import { Card, CardTitle, CardContent } from "@/components/ui/channel-card";
import Image from "next/image";

// Define a interface de propriedas a serem passadas ao componente CardCanais
interface CardCanaisProps {
    canais: string[];
}

// Exporta o componente CardCanais
export const CardCanais = ({ canais }: CardCanaisProps) => {
    return (
        <Card>
            <CardTitle> </CardTitle>
            <CardContent className="flex justify-center">
                {/* Define o conteudo do card como uma lista de canais */}

                <div className="flex gap-8">
                    {canais.sort().map((canal, index) => (
                        // Cria um link para cada canal

                        // eslint-disable-next-line react/jsx-key
                        <a href={`/home/canais/${canal.toLowerCase()}`}>
                            <div key={index} className="flex flex-col items-center justify-center px-2">
                                {/* Exibe a imagem do canal */}

                                <div className="h-24 flex items-center justify-center">
                                    <Image src={`/${canal}.png`} alt={canal} width={100} height={100} />
                                </div>
                                {/* Exibe o nome do canal */}

                                <span className="mt-2">{canal}</span>
                            </div>
                        </a>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};
