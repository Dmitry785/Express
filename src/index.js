const express = require('express');
const { ServerApiVersion } = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const dotenv = require('dotenv').config({path: ".env.local"});
    
const connection_string = process.env.MONGODB_URI;

const client = new MongoClient(connection_string, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
});

async function run_db(){
    try{
        await client.connect(connection_string);
        const db = client.db("admin");
        const collection = db.collection("default");
        await collection.insertOne({name: "admin", password: "1234"});
        console.log(collection.find().toArray());
        console.log(`Connected to MongoDB on ${connection_string}`);
    }
    catch(err){
        console.log(err);
    }
    finally{
        await client.close();
        console.log("MongoDB connection closed");
    }
}

run_db(client).catch(console.error);

const _port = 3000;
const _ip = "localhost";

const app = express();

app.use("/static", express.static("public"));
app.use(express.json());

require('./routes')(app, {})
require('./handlebars')(app)

app.listen(_port, _ip, () => console.log(`open on ${_ip}:${_port}`));