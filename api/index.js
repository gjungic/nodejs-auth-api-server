const app = require('express')();
// Configuration
require('./configuration')(app);

module.exports = app;
