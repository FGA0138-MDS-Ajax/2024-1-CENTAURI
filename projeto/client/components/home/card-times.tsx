"use client";

// Import para o componente Card tradicional 
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card_custom";

// Import para o modelo Match que será armazenado no card
import { Match } from "@/models/match";

// Define a interface de propriedades a serem passadas ao componente 
interface CardTimesProps {
    match: Match;
};

// Exporta o componente CardTimes
export const CardTimes = ({ match }: CardTimesProps) => {
    // Retorna um Card indicando que não há jogos caso a data e hora sejam nulas
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
            {/* Titulo do Card formado pela data e hora */}
            <CardHeader>
                <CardTitle>{match.formatDate()}</CardTitle>
            </CardHeader>

            {/* Conteudo do Card formado pelo time 1 e time 2 */}
            <CardContent className="flex justify-center content-center">
                <p>{match.time1} X {match.time2} </p>
            </CardContent>

            {/* Canais que irão transmitir o jogo indicado */}
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
