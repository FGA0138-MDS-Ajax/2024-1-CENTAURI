import {mysqlConn} from '../base/mysql';
import ScrapingRepository from '../repositories/scraping.repository';
import {
    GameChannel,
    GameChannelSchema,
    InsertGame,
    InsertGameSchema,
} from '../schemas/api.schema';

function toMySQLDateTimeString(date: Date): string {
    return date.toISOString().slice(0, 19).replace('T', ' ');
}

function fromMySQLDateTimeToBrazilianString(date: string | Date): string {
    if (date instanceof Date) {
        date = date.toISOString().slice(0, 19).replace('T', ' ');
    }
    const [datePart, timePart] = date.split(' ');
    const [year, month, day] = datePart.split('-');
    const [hours, minutes] = timePart.split(':');

    return `${day}/${month}/${year} ${hours}:${minutes}`;
}

function adjustHourToLocal(dateString: string): string {
    const date = new Date(dateString);
    date.setHours(date.getHours() - 3);
    return date.toISOString().slice(0, 19).replace('T', ' ');
}

function retornaJogos(games: any): GameChannel[]{
    return games.map((game: any) => {
        const channels = game.CHANNELS.split(',').map((channel: string) => channel.trim());

        const adjustedDateHora = adjustHourToLocal(game.DATA_HORA);
        const hora = fromMySQLDateTimeToBrazilianString(adjustedDateHora);

        const gameChannel: GameChannel = {
            campeonato: game.CAMPEONATO,
            data_hora: hora,
            time_1: game.TIME_1,
            time_2: game.TIME_2,
            channels: channels
        };

        return GameChannelSchema.parse(gameChannel);
    });
}

class GameRepository {
    async updateGames(): Promise<void> {
        try {
            const hoje = new Date();
            const startOfToday = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate(), 0, 0, 0);
            const endOfToday = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate(), 23, 59, 59);

            await mysqlConn.execute("DELETE FROM JOGO WHERE DATA_HORA < ?", [startOfToday]);

            const rawGamesUrl2 = await ScrapingRepository.scrapingUrl2();
            const rawGamesLiberta = await ScrapingRepository.scrapingUrlLiberta();
            const rawGames = [...rawGamesUrl2, ...rawGamesLiberta];

            const games: InsertGame[] = rawGames.map(game => {
                const horaMySQL = toMySQLDateTimeString(new Date(game.hora));

                const channels = game.channels.length > 2 ? game.channels.slice(0, 2) : game.channels;

                const insertGame: InsertGame = {
                    rodada: game.rodada,
                    campeonato: game.campeonato,
                    hora: horaMySQL,
                    time1: game.time1,
                    time2: game.time2,
                    channels: channels
                };

                return InsertGameSchema.parse(insertGame);
            });

            for (const game of games) {
                const [existingGame]: any = await mysqlConn.execute(
                    "SELECT IDJOGO FROM JOGO WHERE TIME_1 = ? AND TIME_2 = ? AND DATA_HORA = ? AND CAMPEONATO = ?",
                    [game.time1, game.time2, game.hora, game.campeonato]
                );

                if (existingGame.length === 0) {
                    const [result]: any = await mysqlConn.execute(
                        "INSERT INTO JOGO (TIME_1, TIME_2, DATA_HORA, CAMPEONATO, RODADA) VALUES (?, ?, ?, ?, ?)",
                        [game.time1, game.time2, game.hora, game.campeonato, game.rodada]
                    );
                    const jogoId = result.insertId;

                    for (const canal of game.channels) {
                        const [canalResult]: any = await mysqlConn.execute(
                            "SELECT IDCANAL FROM CANAL WHERE NOME_CANAL = ?",
                            [canal]
                        );
                        let canalId;
                        if (canalResult.length > 0) {
                            canalId = canalResult[0].IDCANAL;
                        } else {
                            const [newCanalResult]: any = await mysqlConn.execute(
                                "INSERT INTO CANAL (NOME_CANAL) VALUES (?)",
                                [canal]
                            );
                            canalId = newCanalResult.insertId;
                        }

                        await mysqlConn.execute(
                            "INSERT INTO PASSA_EM (ID_JOGO, ID_CANAL) VALUES (?, ?)",
                            [jogoId, canalId]
                        );
                    }
                }
            }
        } catch (error) {
            console.error(error);
            throw new Error("Failed to update games");
        }
    }


    async getGames(): Promise<GameChannel[]> {
        try {
            const [games]: any = await mysqlConn.execute(
                "SELECT J.CAMPEONATO, J.DATA_HORA, J.TIME_1, J.TIME_2, GROUP_CONCAT(C.NOME_CANAL) AS CHANNELS " +
                "FROM JOGO J " +
                "JOIN PASSA_EM PE ON J.IDJOGO = PE.ID_JOGO " +
                "JOIN CANAL C ON PE.ID_CANAL = C.IDCANAL " +
                "WHERE J.DATA_HORA >= NOW()" +
                "GROUP BY J.CAMPEONATO, J.DATA_HORA, J.IDJOGO"
            );

            return retornaJogos(games);
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async getGamesByTime(time: string): Promise<GameChannel[]> {
        try {
            const [games]: any = await mysqlConn.execute(
                "SELECT J.CAMPEONATO, J.DATA_HORA, J.TIME_1, J.TIME_2, GROUP_CONCAT(C.NOME_CANAL) AS CHANNELS " +
                "FROM JOGO J " +
                "JOIN PASSA_EM PE ON J.IDJOGO = PE.ID_JOGO " +
                "JOIN CANAL C ON PE.ID_CANAL = C.IDCANAL " +
                "WHERE J.DATA_HORA >= NOW() " +
                "GROUP BY J.CAMPEONATO, J.DATA_HORA, J.IDJOGO " +
                "HAVING J.TIME_1 = ? OR J.TIME_2 = ?", [time, time]
            );

            return retornaJogos(games);
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async getGamesByChannel(channel: string): Promise<GameChannel[]> {
        try {
            const [games]: any = await mysqlConn.execute(
                "SELECT J.CAMPEONATO, J.DATA_HORA, J.TIME_1, J.TIME_2, GROUP_CONCAT(C.NOME_CANAL) AS CHANNELS " +
                "FROM JOGO J " +
                "JOIN PASSA_EM PE ON J.IDJOGO = PE.ID_JOGO " +
                "JOIN CANAL C ON PE.ID_CANAL = C.IDCANAL " +
                "WHERE J.DATA_HORA >= NOW() " +
                "AND C.NOME_CANAL = ? " +
                "GROUP BY J.CAMPEONATO, J.DATA_HORA, J.IDJOGO", [channel]
            );

            return retornaJogos(games);
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async getGamesByCampeonato(campeonato: string): Promise<GameChannel[]> {
        try {
            const [games]: any = await mysqlConn.execute(
                "SELECT J.CAMPEONATO, J.DATA_HORA, J.TIME_1, J.TIME_2, GROUP_CONCAT(C.NOME_CANAL) AS CHANNELS " +
                "FROM JOGO J " +
                "JOIN PASSA_EM PE ON J.IDJOGO = PE.ID_JOGO " +
                "JOIN CANAL C ON PE.ID_CANAL = C.IDCANAL " +
                "WHERE J.DATA_HORA >= NOW() " +
                "GROUP BY J.CAMPEONATO, J.DATA_HORA, J.IDJOGO " +
                "HAVING J.CAMPEONATO = ?", [campeonato]
            );

            return retornaJogos(games);
        } catch (error) {
            console.error(error);
            return []
        }
    }

    async getRodada(): Promise<number> {
        try {
            const [response]: [any[], any[]] = await mysqlConn.execute("SELECT RODADA FROM JOGO");
            const rodada: number = response[0].RODADA;
            return rodada;
        } catch (error) {
            console.error(error);
            return 0;
        }
    }

    async getGamesByQuantidade(quantidade: string): Promise<GameChannel[]> {
        try {
            const [games]: any = await mysqlConn.execute(
                "SELECT J.CAMPEONATO, J.DATA_HORA, J.TIME_1, J.TIME_2, GROUP_CONCAT(C.NOME_CANAL) AS CHANNELS " +
                "FROM JOGO J " +
                "JOIN PASSA_EM PE ON J.IDJOGO = PE.ID_JOGO " +
                "JOIN CANAL C ON PE.ID_CANAL = C.IDCANAL " +
                "WHERE J.DATA_HORA >= NOW() " +
                "GROUP BY J.CAMPEONATO, J.DATA_HORA, J.IDJOGO " +
                "LIMIT ?", [quantidade]
            );

            return retornaJogos(games);
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async getGamesBrasileiraoByFavorito(favorito: string): Promise<GameChannel[]> {
        try {
            const [games]: any = await mysqlConn.execute(
                "SELECT J.CAMPEONATO, J.DATA_HORA, J.TIME_1, J.TIME_2, GROUP_CONCAT(C.NOME_CANAL) AS CHANNELS " +
                "FROM JOGO J " +
                "JOIN PASSA_EM PE ON J.IDJOGO = PE.ID_JOGO " +
                "JOIN CANAL C ON PE.ID_CANAL = C.IDCANAL " +
                "WHERE J.DATA_HORA >= NOW() " +
                "AND (J.TIME_1 = ? OR J.TIME_2 = ?) " +
                "AND J.CAMPEONATO = 'Brasileirão' " +
                "GROUP BY J.CAMPEONATO, J.DATA_HORA, J.IDJOGO "+
                "LIMIT 1", [favorito, favorito]
            );

            return retornaJogos(games);
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async getGamesLibertaByFavorito(favorito: string): Promise<GameChannel[]> {
        try {
            const [games]: any = await mysqlConn.execute(
                "SELECT J.CAMPEONATO, J.DATA_HORA, J.TIME_1, J.TIME_2, GROUP_CONCAT(C.NOME_CANAL) AS CHANNELS " +
                "FROM JOGO J " +
                "JOIN PASSA_EM PE ON J.IDJOGO = PE.ID_JOGO " +
                "JOIN CANAL C ON PE.ID_CANAL = C.IDCANAL " +
                "WHERE J.DATA_HORA >= NOW() " +
                "AND (J.TIME_1 = ? OR J.TIME_2 = ?) " +
                "AND J.CAMPEONATO = 'Libertadores' " +
                "GROUP BY J.CAMPEONATO, J.DATA_HORA, J.IDJOGO " +
                "LIMIT 1", [favorito, favorito]
            );

            return retornaJogos(games);
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async getCanais(): Promise<string[]> {
        try {
            const [response]: [any[], any[]] = await mysqlConn.execute("SELECT NOME_CANAL FROM CANAL");
            return response.map((canal: any) => canal.NOME_CANAL);
        } catch (error) {
            console.error(error);
            return [];
        }
    }

}

export default new GameRepository();
