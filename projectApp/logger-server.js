import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3030;

app.use(cors());
app.use(express.json());

app.post('/log', (req, res) => {
    const message = req.body;
    console.log(message);
});

app.listen(PORT, () => {
    console.log("log server running at http://localhost:" + PORT);
});