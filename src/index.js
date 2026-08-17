const express = require('express');
const dotenv = require('dotenv').config({path: ".env.local"});

const _port = 3000;
const _ip = "localhost";

require('./mongodb')()
    .catch(err=>{
        console.error("Couldn't connected to MongoDB");
        process.exit(0);
    })
    .then(userModel => {
        const app = express();
        app.locals.userModel = userModel;
        main(app);
    });

function main(app) {
    app.use("/static", express.static("public"));
    app.use(express.json());

    require('./routes')(app);
    require('./handlebars')(app);

    app.listen(_port, _ip, () => console.log(`open on ${_ip}:${_port}`));
    process.on("SIGINT", async ()=>{
        app.locals.userModel.db.close();
        console.log("MongoDB connection have closed");
        console.log("Program is closing");
        process.exit();
    });
}