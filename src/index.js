const express = require('express');
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv').config({path: ".env.local"});

const _port = 3000;
const _ip = "localhost";
    
const connection_string = process.env.MONGODB_URI;

const client = new MongoClient(connection_string, {
    connectTimeoutMS: 1000,
    serverSelectionTimeoutMS: 1000
});

const app = express();

app.use("/static", express.static("public"));
app.use(express.json());

require('./mongodb')(client, connection_string)
    .catch(err=>{
        console.error("Couldn't connected to MongoDB");
        process.exit(0);
    })
    .then(collection => {
        app.locals.collection = collection;
        require('./routes')(app);
        require('./handlebars')(app);

        app.listen(_port, _ip, () => console.log(`open on ${_ip}:${_port}`));
    })
    


process.on("SIGINT", async ()=>{
    await client.close();
    console.log("MongoDB connection have closed");
    console.log("Program is closing");
    process.exit();
})