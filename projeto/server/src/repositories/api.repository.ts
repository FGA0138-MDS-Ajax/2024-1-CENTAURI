import { mysqlConn } from '../base/mysql';
import ScrapingRepository from '../repositories/scraping.repository';
import { GameSchema, InsertGameSchema, InsertGame } from '../schemas/api.schema';

function toMySQLDateTimeString(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

class GameRepository {
    async updateGames(): Promise<void> {
        try {
            let rawGames = await ScrapingRepository.scrapingUrl1();

            const games: InsertGame[] = rawGames.map(game => {
                const horaMySQL = toMySQLDateTimeString(new Date(game.hora));

                const channels = game.channels.length > 2 ? game.channels.slice(0, 2) : game.channels;

                const insertGame: InsertGame = {
                    campeonato: game.campeonato,
                    hora: horaMySQL,
                    time1: game.time1,
                    time2: game.time2,
                    channels: channels
                };

                return InsertGameSchema.parse(insertGame);
            });

            const today = new Date();
            const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
            const endOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);

            await mysqlConn.execute("DELETE FROM JOGO WHERE DATA_HORA < ? OR DATA_HORA > ?", [startOfToday, endOfToday]);

            for (const game of games) {
                const [result]: any = await mysqlConn.execute(
                    "INSERT INTO JOGO (TIME_1, TIME_2, DATA_HORA, CAMPEONATO) VALUES (?, ?, ?, ?)",
                    [game.time1, game.time2, game.hora, game.campeonato]
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
        } catch (error) {
            console.error(error);
            throw new Error("Failed to update games");
        }
    }
}

export default new GameRepository();
