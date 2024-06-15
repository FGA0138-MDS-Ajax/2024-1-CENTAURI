const axios = require('axios');
const cheerio = require('cheerio');

const url1 = 'https://mantosdofutebol.com.br/guia-de-jogos-tv-hoje-ao-vivo/';

function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}

function getURLForDate(date) {
    const formattedDate = formatDate(date);
    return `https://ge.globo.com/agenda/#/futebol/${formattedDate}`;
}

class ScrapingRepository {

    /* este scraping coleta os dados de um site que contém informações sobre jogos de futebol que serão transmitidos na TV no dia atual */
    async scrapingUrl1() {
        try {
            const response = await axios.get(url1);
            const html = await response.data;
            const $ = cheerio.load(html);

            const games = [];
            $('h3').each((index, element) => {
                const hTexto = $(element).text().trim();
                const proximoElemento = $(element).next('p');
                const pTexto = proximoElemento.text().trim();

                if(/Brasileirão$/.test(hTexto)){
                    const horaRegex = /(\d{2}h\d{2})/g;
                    const horaMatch = horaRegex.exec(hTexto);
                    const hora = horaMatch ? horaMatch[0] : null;

                    const timeRegex = /(\w+)\s+x\s+(\p{L}+)/u;
                    const timesMatch = timeRegex.exec(hTexto);
                    const time1 = timesMatch ? timesMatch[1] : null;
                    const time2 = timesMatch ? timesMatch[2] : null;

                    const canais = pTexto.match(/Canais:\s*(.+)/);
                    const canaisList = canais ? canais[1].split(' e ') : [null, null];
                    const canal1 = canaisList[0];
                    const canal2 = canaisList[1];

                    if(hora && time1 && time2 && canal1) {
                        games.push({
                            hora: hora,
                            time1: time1,
                            time2: time2,
                            canal1: canal1,
                            canal2: canal2
                        });
                    }
                }
            });
            return games;
        } catch (error) {
            console.error(error);
        }
    }
}


module.exports = new ScrapingRepository();
