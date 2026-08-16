module.exports = async function(client, connection_string){
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