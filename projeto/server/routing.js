const express = require('express');
const exampleRouter = require('./api/example.route');
const homeRouter = require('./api/home.route');

function routing(app) {
    app.use('/' , homeRouter);
    app.use('/api', exampleRouter);
}

module.exports = routing;