const express = require('express');
const router = express.Router();
const scrapingRepository = require('../repositories/scraping.repository');

router.get('/', async (req, res) => {
    try {
        let response = await scrapingRepository.getScraping();
        res.send(response);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

module.exports = router;
