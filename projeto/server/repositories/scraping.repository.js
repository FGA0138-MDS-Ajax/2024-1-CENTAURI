const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://mantosdofutebol.com.br/guia-de-jogos-tv-hoje-ao-vivo/';

class ScrapingRepository {
    async getScraping() {
        try {
            const results = [];
            const { data } = await axios.get(url);
            const $ = cheerio.load(data);

            $('h3').each((i, element) => {
                const matchDetails = $(element).text().trim();
                if (matchDetails.includes('Brasileirão') && matchDetails.match(/Brasileirão\s*$/)) {
                    const channels = $(element).next('p').find('strong').text();
                    results.push({
                        matchDetails: matchDetails,
                        channels: channels.replace('Canais: ', '').trim()
                    });
                }
            });
            return results;
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = new ScrapingRepository();
