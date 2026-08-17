const { MongoClient } = require('mongodb');

const connection_string = process.env.MONGODB_URI;

const client = new MongoClient(connection_string, {
    connectTimeoutMS: 1000,
    serverSelectionTimeoutMS: 1000
});
module.exports = async function(){
    try{
        console.log(`Connecting to MongoDB on ${connection_string}`)
        await client.connect();
        console.log("Connected to MongoDB");
        return client.db("express").collection("users");
    }
    catch(err){
        throw err;
    }
}