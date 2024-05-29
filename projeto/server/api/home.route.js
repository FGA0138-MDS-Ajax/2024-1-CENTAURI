const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('Aqui é a home');
});

module.exports = router;