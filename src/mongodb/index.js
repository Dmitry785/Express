const { Schema, default: mongoose } = require('mongoose');

const connection_string = process.env.MONGODB_URI;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 0
    },
    age: {
        type: Number,
        min: 18,
        default: 18
    }
}, {versionKey: false})

const userModel = mongoose.model("User", userSchema);
module.exports = async function(){
    try{
        console.log(`Connecting to MongoDB on ${connection_string} with mongoose`)
        await mongoose.connect(connection_string, {
            timeoutMS: 1000,
            serverSelectionTimeoutMS: 1000
        });
        console.log("Connected to MongoDB");
        return userModel;
    }
    catch(err){
        throw err;
    }
}