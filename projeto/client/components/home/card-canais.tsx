"use client";

import React from "react";
import { Card, CardTitle, CardContent } from "@/components/ui/channel-card";
import Image from "next/image";

interface CardCanaisProps {
    canais: string[];
}

export const CardCanais = ({ canais }: CardCanaisProps) => {
    return (
        <Card>
            <CardTitle> </CardTitle>
            <CardContent className="flex justify-center">
                <div className="flex gap-8">
                    {canais.sort().map((canal, index) => (
                        <div key={index} className="flex flex-col items-center justify-center px-2">
                            <div className="h-24 flex items-center justify-center">
                                <Image src={`/${canal}.png`} alt={canal} width={100} height={100} />
                            </div>
                            <span className="mt-2">{canal}</span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};
