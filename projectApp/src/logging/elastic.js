/* eslint-disable no-undef */
const { createLogger, format, transports } = require('winston');
const { ElasticsearchTransport } = require('winston-elasticsearch');
require('dotenv').config();
require('winston-daily-rotate-file');
const uuid = require('uuid');
const packagejson = require('../../package.json');

const LOG_FILENAME = 'demo-output';
const { combine, timestamp, errors, json } = format;
const DIRNAME = __dirname;
const ENV = process.env;
const levels = {
    error: 0,
    warn: 1,
    http: 2,
    info: 3,
    debug: 4,
};

const elasticTransport = (spanTracerId, indexPrefix) => {
    const esTransportOpts = {
        level: 'debug',
        indexPrefix,
        indexSuffixPattern: 'YYYY-MM-DD',
        transformer: (logData) => {
            const spanId = spanTracerId;
            return {
                '@timestamp': new Date(),
                severity: logData.level,
                stack: logData.meta.stack,
                service_name: packagejson.name,
                service_version: packagejson.version,
                message: `${logData.message}`,
                data: JSON.stringify(logData.meta.data),
                span_id: spanId,
                utcTimestamp: logData.timestamp
            };
        },
        clientOpts: {
            node: 'http://localhost:9200',
            maxRetries: 5,
            requestTimeout: 10000,
            sniffOnStart: false,
            auth: {
                username: ENV.ELASTIC_USER,
                password: ENV.ELASTIC_PASSWORD,
            },
        },
    };
    return esTransportOpts;
};

module.exports.logTransport = (indexPrefix) => {
    const spanTracerId = uuid.v1();
    const transport = new transports.DailyRotateFile({
        filename: `${DIRNAME}/../../logs/${LOG_FILENAME}-%DATE%.log`,
        datePattern: 'YYYY-MM-DD-HH',
        zippedArchive: true,
        maxFiles: '7d',
        maxSize: '20m',
        frequency: '3h',
    });
    const logger = createLogger({
        level: 'debug',
        levels,
        format: combine(timestamp(), errors({ stack: true }), json()),
        transports: [
            transport,
            new ElasticsearchTransport({
            ...elasticTransport(spanTracerId, indexPrefix),
            }),
        ],
        handleExceptions: true,
    });
    if (ENV.NODE_ENV === 'localhost') {
        logger.add(
            new transports.Console({ format: format.splat(), level: 'debug' })
        );
    }
    return logger;
};