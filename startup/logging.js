require('express-async-errors');
const winston = require('winston');
module.exports = () => {
    const logger = winston.createLogger({format: winston.format.json()});

logger.exceptions.handle(new winston.transports.File({filename: 'exception.log'}));
logger.exceptions.handle(new winston.transports.Console({colorize: true}));
logger.rejections.handle(new winston.transports.File({filename: 'rejection.log'}));
}