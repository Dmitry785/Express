const express = require('express');
const hbs = require('hbs');
const expressHbs = require('express-handlebars');
const path = require("node:path")

const _port = 3000;
const _ip = "0.0.0.0";

const app = express();

app.engine("hbs", expressHbs.engine(
    {
        layoutsDir: "views/layouts",
        defaultLayout: "layout",
        extname: "hbs"
    }
))

hbs.registerPartials(path.join(__dirname, "..", "views/partials"));

app.set("view engine", "hbs");

app.get('/', (req, res) => {
    res.render("home");
});

app.use('/contacts', (_, res) => {
    res.render('contact', {
        title: "Contacts page",
        showList: true,
        list: ["tag 1", "tag 2", "tag 3"]
    });
})


app.listen(_port, _ip, () => console.log(`open on ${_ip}:${_port}\ndir: ${__dirname}`));