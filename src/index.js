const express = require('express');

const _port = 3000;
const _ip = "127.0.0.1";

const app = express();



app.get('/', (req, res) => {
    res.end("Hello");
});


app.listen(_port, _ip, () => console.log(`open on ${_ip}:${_port}`));