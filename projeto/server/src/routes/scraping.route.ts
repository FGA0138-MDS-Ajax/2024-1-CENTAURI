import {Router} from 'express';
import ScrapingRepository from '../repositories/scraping.repository';

const router = Router();

router.get("/v1/scraping1", async (req, res) => {
    try{
        let response = await ScrapingRepository.scrapingUrl1();
        res.send(response);
    }
    catch(error){
        res.status(500).send(error);
    }
});

export default router;