import express from 'express';
import cors from 'cors';
import pino from 'pino';

// logger code
// we can customize the output of the logs more, i just wanted to get this out to everyone and that
// can be changed later on - Madison
const logger = pino({
    transport: {
        targets: [
            // {target: 'pino/console'},
            {target: 'pino-pretty', options: {colorize: true}}, // outputs logs to console
            {target: 'pino/file', options: {destination: 'logs.txt'}} // writes logs to a file
        ]
    },
    customLevels: {
        test: 35
    }
});

// changes the level of log output that gets viewed
logger.level = "trace";

// server code
const app = express();
const PORT = 3030;

app.use(cors());
app.use(express.json());

app.post('/log', (req, res) => {
    let message = req.body.message;
    let level = req.body.level;

    switch (level) {
        case "trace":
            logger.trace(message);
            break;
        case "debug":
            logger.debug(message);
            console.log("debug");
            break;
        case "info":
            logger.info(message);
            break;
        case "warn":
            logger.warn(message);
            break;
        case "error":
            logger.error(message);
            break;
        case "fatal":
            logger.fatal(message);
            break;
        case "test":
            logger.test(message);
            break;
        default:
            console.log("error: not a level of logs")
            break;
    }

    res.sendStatus(200);
});

app.post('/error', (req, res) => {
    let name = req.body.name;
    let errmessage = req.body.errmessage;
    let stack = req.body.stack;
    let message = req.body.message;
    logger.error({name, errmessage, stack}, message);

    res.sendStatus(200);
})

app.listen(PORT, () => {
    console.log("log server running at http://localhost:" + PORT);
});