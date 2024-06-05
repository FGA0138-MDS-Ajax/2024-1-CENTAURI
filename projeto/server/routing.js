const express = require('express');
const exampleRouter = require('./api/example.route');
const homeRouter = require('./api/home.route');
const scrapingRouter = require('./api/scraping.route');

function routing(app) {
    app.use('/' , homeRouter);
    app.use('/api', exampleRouter);
    app.use('/scraping', scrapingRouter);
}

module.exports = routing;