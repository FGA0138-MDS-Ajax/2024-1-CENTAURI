import axios from 'axios';
import * as cheerio from 'cheerio';
import { type Game } from '../schemas/api.schema';

const url1 = 'https://mantosdofutebol.com.br/guia-de-jogos-tv-hoje-ao-vivo/';

function formatDate(date: Date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
}

class ScrapingRepository {
    async scrapingUrl1(): Promise<Game[]> {
        try {
            const response = await axios.get(url1);
            const html = response.data;
            const $ = cheerio.load(html);

            const today = new Date();
            const formattedDate = formatDate(today);

            const games: Game[] = [];
            $('h3').each((index, element) => {
                const hTexto = $(element).text().trim();
                const proximoElemento = $(element).next('p');
                const pTexto = proximoElemento.text().trim();

                if (/Brasileirão$/.test(hTexto)) {
                    const horaRegex = /(\d{2}h\d{2})/g;
                    const horaMatch = horaRegex.exec(hTexto);
                    const hora = horaMatch ? horaMatch[0] : null;

                    const timeRegex = /\s*([\p{L}\p{M}-]+(?:\s[\p{L}\p{M}-]+)*)\s*x\s*([\p{L}\p{M}-]+(?:\s[\p{L}\p{M}-]+)*)\s*/u;
                    const timesMatch = timeRegex.exec(hTexto);
                    const time1 = timesMatch ? timesMatch[1] : null;
                    const time2 = timesMatch ? timesMatch[2] : null;

                    const canais = pTexto.match(/Canais:\s*(.+)/);
                    const canaisList = canais ? canais[1].split(' e ') : [];

                    if (hora && time1 && time2 && canaisList.length > 0) {
                        const [hours, minutes] = hora.split('h').map(Number);
                        const datetime = new Date(today);
                        datetime.setHours(hours - 3);
                        datetime.setMinutes(minutes);
                        datetime.setSeconds(0);
                        datetime.setMilliseconds(0);

                        games.push({
                            campeonato: "Brasileirão",
                            hora: datetime,
                            time1: time1,
                            time2: time2,
                            channels: canaisList
                        });
                    }
                }
            });

            return games;
        } catch (error) {
            console.error(error);
            return [];
        }
    }
}

export default new ScrapingRepository();
