const express = require('express');

const _port = 3000;
const _ip = "0.0.0.0";

const app = express();

app.set("view engine", "hbs");

app.get('/', (req, res) => {
    res.end("Hello");
});

app.get('/contacts', (req, res) => {
    res.render('contact.hbs', {
        title: "Contacts page",
        showList: false,
        list: ["tag 1", "tag 2", "tag 3"]
    });
})


app.listen(_port, _ip, () => console.log(`open on ${_ip}:${_port}\ndir: ${__dirname}`));