import express from 'express';

const app = express();
const port = 5000;

app.get('/', (req, res) => {
    res.send("We are starting up a server with express.");
});

app.listen(port, () => {
    console.log(`Server is listening for requests on port: ${port}`);
});

