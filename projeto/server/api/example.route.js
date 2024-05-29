const express = require('express')
const router = express.Router()
const exampleRepository = require('../repositories/example.repository')

router.get('/example', async (req, res) => {
    try {
        let response = await exampleRepository.getExamples();
        res.send(response);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

router.post('/example', async (req, res) => {
    try {
        const { example } = req.body;
        let response = await exampleRepository.postExample(example);
        res.send(response);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

module.exports = router;