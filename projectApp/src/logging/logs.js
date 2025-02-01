const { logTransport } = require("./elastic");

const ENV = process.env;
let indexPrefix = "demo-logging-api-";
if (ENV.NODE_ENV === "localhost") {
    indexPrefix = indexPrefix.concat("local");
} else if (ENV.NODE_ENV === "DEVELOPMENT") {
    indexPrefix = indexPrefix.concat("dev");
} else if (ENV.NODE_ENV === "QA") {
    indexPrefix = indexPrefix.concat("qa");
} else if (ENV.NODE_ENV === "PRODUCTION") {
    indexPrefix = indexPrefix.concat("prod");
}

class Logger {
  
    info(msg, data) {
        const logger = logTransport(indexPrefix);
        const metaData = { data };
        logger.info(msg, metaData);
    }

    warning(msg, data) {
        const logger = logTransport(indexPrefix);
        const metaData = { data };
        logger.warn(msg, metaData);
    }

    http(msg, data) {
        const logger = logTransport(indexPrefix);
        const metaData = { data };
        logger.http(msg, metaData);
    }

    child(data) {
        const logger = logTransport(indexPrefix);
        // const metaData = { data };
        const child = logger.child(data);
        child.http();
    }

    error(msg, data) {
        const logger = logTransport(indexPrefix);
        const metaData = { data };
        logger.error(msg, metaData);
    }
 
    debug(msg, data) {
        const logger = logTransport(indexPrefix);
        const metaData = { data };
        logger.debug(msg, metaData);
    }
}

module.exports = new Logger();