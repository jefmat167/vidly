const {createLogger, format, transports} = require('winston');

module.exports = (err, req, res, next) => {
    logger = createLogger({
        level: 'info',
        format: format.json(),
        transports: [
            new transports.Console(),
            new transports.File({filename: 'combined.log'})
        ]
    });

    logger.log({
        level: 'error',
        message: err
    });
    res.status(500).send('Something failed...' + err);
}