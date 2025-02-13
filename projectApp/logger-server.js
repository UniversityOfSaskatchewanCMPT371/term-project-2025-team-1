import express from 'express';
import cors from 'cors';
import pino from 'pino';

// logger code
const logger = pino({
    transport: {
        targets: [
            {target: 'pino-pretty'}, // outputs logs to console
            {target: 'pino/file', options: {destination: 'mylogs.txt'}} // writes logs to a file
        ]
    }
});

// server code
const app = express();
const PORT = 3030;

app.use(cors());
app.use(express.json());

app.post('/log', (req, res) => {
    let m = req.body.message;
    // console.log(m);
    logger.info(m);

    res.sendStatus(200);
});

app.listen(PORT, () => {
    console.log("log server running at http://localhost:" + PORT);
});