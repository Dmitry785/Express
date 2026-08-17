const express = require('express');
const dotenv = require('dotenv').config({path: ".env.local"});

const _port = 3000;
const _ip = "localhost";

require('./mongodb')()
    .catch(err=>{
        console.error("Couldn't connected to MongoDB");
        process.exit(0);
    })
    .then(collection => {
        const app = express();
        app.locals.collection = collection;
        main(app);
    });

function main(app) {
    app.use("/static", express.static("public"));
    app.use(express.json());

    require('./routes')(app);
    require('./handlebars')(app);

    app.listen(_port, _ip, () => console.log(`open on ${_ip}:${_port}`));
    process.on("SIGINT", async ()=>{
        app.locals.collection.db.client.close();
        console.log("MongoDB connection have closed");
        console.log("Program is closing");
        process.exit();
    });
}