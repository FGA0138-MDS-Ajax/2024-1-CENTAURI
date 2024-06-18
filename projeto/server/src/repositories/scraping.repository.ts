import axios, {AxiosInstance, AxiosResponse} from 'axios';
import * as cheerio from 'cheerio';
import { type Game } from '../schemas/api.schema';

const url1 = 'https://mantosdofutebol.com.br/guia-de-jogos-tv-hoje-ao-vivo/';
const url2 = 'https://olympics.com/pt/noticias/campeonato-brasileiro-2024-jogo-tv-aberta'
const urlLibertadores = "https://olympics.com/pt/noticias/copa-libertadores-2024-datas-horarios-assistir-oitavas"

function formatDate(date: Date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
}

async function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const A: AxiosInstance = axios.create({
    headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
        'Cache-Control': 'max-age=0',
        'Connection': 'keep-alive',
        'Host': 'olympics.com',
        'Referer': 'https://olympics.com',
        'Upgrade-Insecure-Requests': '1',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36',
    },
    timeout: 10000
});

async function fetchWithRetry(url: string, retries: number, delayMs: number): Promise<AxiosResponse<any>> {
    for (let i = 0; i < retries; i++) {
        try {
            return await A.get(url);
        } catch (error) {
            console.error(`Attempt ${i + 1} failed. Error: ${error}`);
            if (i < retries - 1) {
                console.warn(`Retrying in ${delayMs}ms...`);
                await delay(delayMs);
            } else {
                throw error;
            }
        }
    }
    throw new Error('Maximum retries reached');
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

    async scrapingUrl2(): Promise<Game[]> {
        try {
            const hoje = new Date();
            const response = await fetchWithRetry(url2, 3, 2000); // 3 retries com 2 segundos de atraso
            const html = response.data;
            const $ = cheerio.load(html);

            const months: { [key: string]: string } = {
                janeiro: "01",
                fevereiro: "02",
                março: "03",
                abril: "04",
                maio: "05",
                junho: "06",
                julho: "07",
                agosto: "08",
                setembro: "09",
                outubro: "10",
                novembro: "11",
                dezembro: "12"
            };

            const games: Game[] = [];
            $('p').each((index, element) => {
                const pTexto = $(element).text().trim();
                console.log(`Processing paragraph: ${pTexto}`);

                const dataRegex = /(\d{1,2})\s+de\s+(\p{L}+)/u;
                const dataMatch = dataRegex.exec(pTexto);
                const dia = dataMatch ? dataMatch[1] : null;
                const mes = dataMatch ? months[dataMatch[2]] : null;

                console.log(`Extracted date - Day: ${dia}, Month: ${mes}`);

                if (dataMatch) {
                    const listaJogos = $(element).next('ul');
                    $(listaJogos).find('li').each((index, element) => {
                        const liTexto = $(element).text().trim();
                        console.log(`Processing list item: ${liTexto}`);

                        const horaRegex = /(\d{2}h\d{2})/g;
                        const horaMatch = horaRegex.exec(liTexto);
                        const hora = horaMatch ? horaMatch[0] : null;

                        const timeRegex = /\s*([\p{L}\p{M}-]+(?:\s[\p{L}\p{M}-]+)*)\s*x\s*([\p{L}\p{M}-]+(?:\s[\p{L}\p{M}-]+)*)\s-/u;
                        const timesMatch = timeRegex.exec(liTexto);
                        const time1 = timesMatch ? timesMatch[1] : null;
                        const time2 = timesMatch ? timesMatch[2] : null;

                        const canaisRegex = /\s+-\s+(.*)$/;
                        const canaisMatch = canaisRegex.exec(liTexto);
                        const canais = canaisMatch ? canaisMatch[1] : null;

                        let canaisList: string[] = [];
                        if (canais) {
                            canaisList = canais.split(/\s+e\s+/);
                        }

                        console.log(`Extracted - Hour: ${hora}, Team1: ${time1}, Team2: ${time2}, Channels: ${canaisList}`);

                        if (hora && time1 && time2 && canaisList.length > 0) {
                            const [hours, minutes] = hora.split('h').map(Number);
                            const datetime = new Date(hoje.getFullYear(), Number(mes) - 1, Number(dia), hours, minutes);
                            datetime.setHours(hours - 3);
                            datetime.setMinutes(minutes);
                            datetime.setSeconds(0);
                            datetime.setMilliseconds(0);

                            console.log(`Game datetime: ${datetime}`);

                            games.push({
                                campeonato: "Brasileirão",
                                hora: datetime,
                                time1: time1,
                                time2: time2,
                                channels: canaisList
                            });

                            console.log(`Game added: ${JSON.stringify(games[games.length - 1])}`);
                        }
                    });
                }
            });
            console.log(`Total games from URL2: ${games.length}`);
            return games;
        } catch (error) {
            console.error('Error during scraping URL2:', error);
            return [];
        }
    }

    async scrapingUrlLiberta(): Promise<Game[]> {
        try {
            const hoje = new Date();
            const response = await fetchWithRetry(urlLibertadores, 3, 2000); // 3 retries com 2 segundos de atraso
            const html = response.data;
            const $ = cheerio.load(html);

            const months: { [key: string]: string } = {
                janeiro: "01",
                fevereiro: "02",
                março: "03",
                abril: "04",
                maio: "05",
                junho: "06",
                julho: "07",
                agosto: "08",
                setembro: "09",
                outubro: "10",
                novembro: "11",
                dezembro: "12"
            };

            const games: Game[] = [];
            $('h4').each((index, element) => {
                const pTexto = $(element).text().trim();
                console.log(`Processing paragraph: ${pTexto}`);

                const dataRegex = /(\d{1,2})\s+de\s+(\p{L}+)/u;
                const dataMatch = dataRegex.exec(pTexto);
                const dia = dataMatch ? dataMatch[1] : null;
                const mes = dataMatch ? months[dataMatch[2]] : null;

                console.log(`Extracted date - Day: ${dia}, Month: ${mes}`);

                if (dataMatch) {
                    const listaJogos = $(element).next('ul');
                    $(listaJogos).find('li').each((index, element) => {
                        const liTexto = $(element).text().trim();
                        console.log(`Processing list item: ${liTexto}`);

                        const timeRegex = /\s*(\d{1,2}h\d{0,2})\s*-\s*([\p{L}\p{M}\s.-]+?)\s*x\s*([\p{L}\p{M}\s.-]+?)\s*\(([^)]+)\)/u;

                        const timesMatch = timeRegex.exec(liTexto);
                        const hora = timesMatch ? timesMatch[1].trim() : null;
                        const time1 = timesMatch ? timesMatch[2].trim() : null;
                        const time2 = timesMatch ? timesMatch[3].trim() : null;
                        const canais = timesMatch ? timesMatch[4].trim() : null;

                        const canaisList = canais ? canais.split(/\s*(?:,|e)\s+/) : [];
                        console.log(`Extracted - Hour: ${hora}, Team1: ${time1}, Team2: ${time2}, Channels: ${canaisList}`);

                        if (hora && time1 && time2 && canaisList.length > 0) {
                            const [hours, minutes] = hora.split('h').map(Number);
                            const datetime = new Date(hoje.getFullYear(), Number(mes) - 1, Number(dia), hours, minutes);
                            datetime.setHours(hours - 3);
                            datetime.setMinutes(minutes);
                            datetime.setSeconds(0);
                            datetime.setMilliseconds(0);

                            console.log(`Game datetime: ${datetime}`);

                            games.push({
                                campeonato: "Libertadores",
                                hora: datetime,
                                time1: time1,
                                time2: time2,
                                channels: canaisList
                            });

                            console.log(`Game added: ${JSON.stringify(games[games.length - 1])}`);
                        }
                    });
                }
            });
            console.log(`Total games from URL Libertadores: ${games.length}`);
            return games;
        } catch (error) {
            console.error('Error during scraping URL Libertadores:', error);
            return [];
        }
    }
}

export default new ScrapingRepository();
