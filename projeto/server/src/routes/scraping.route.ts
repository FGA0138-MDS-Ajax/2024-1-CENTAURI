import {Router} from 'express';
import ScrapingRepository from '../repositories/scraping.repository';

const router = Router();

router.get("/v1/scraping", async (req, res) => {
    try{
        let response = await ScrapingRepository.scrapingUrl1();
        res.send(response);
    }
    catch(error){
        res.status(500).send(error);
    }
});

router.get("/v2/scraping", async (req, res) => {
    try{
        let response = await ScrapingRepository.scrapingUrl2();
        res.send(response);
    }
    catch(error) {
        res.status(500).send
    }
});

router.get("/v3/scraping", async (req, res) => {
    try{
        let response = await ScrapingRepository.scrapingUrlLiberta();
        res.send(response);
    }
    catch(error) {
        res.status(500).send
    }
});
export default router;