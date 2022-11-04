const mongoose = require('mongoose');
const winston = require('winston');

module.exports = () => {
    const logger = winston.createLogger({
        format: winston.format.json(),
        transports: [
            new winston.transports.Console({level: 'info'})
        ]
    });
    mongoose.connect("mongodb://DESKTOP-SL10LP5:27017,DESKTOP-SL10LP5:27018,DESKTOP-SL10LP5:27019/vidly?replicaSet=rs")
    .then(() => {logger.info('Connection successful')});
    // .catch((err) => {console.error('connection failed... ', err)});
}