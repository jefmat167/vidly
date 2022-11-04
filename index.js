const express = require('express');
const winston = require('winston');
const app = express();

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();

const port = process.env.PORT || 3001; 
app.listen(port, () => { 
    winston.info(`Listening at port ${port}...`);
    // console.log(`Listening at port ${port}...`);
});