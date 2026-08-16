const { ObjectId } = require('mongodb');

const Router = require('express').Router;
module.exports = function(app){
    const apiRouter = Router();

    apiRouter.get('/users', async (req, res)=>{
        const collection = req.app.locals.collection;
        try{
            const users = await collection.find({}).toArray();
            res.send(users);
        }
        catch(err){
            console.error(err);
            res.status(500).send("Server error:<br>" + err.toString());
        }
    });
    apiRouter.get('/users/:id', async (req,res)=>{
        const collection = req.app.locals.collection;
        try{
            const user = await collection.findOne({_id: new ObjectId(req.params.id)})
            if(!user){
                res.sendStatus(404);
                return;
            }
            res.send(user);
        }
        catch(err){
            console.error(err);
            res.status(500).send("Server error:<br>" + err.toString());
        }
    });
    apiRouter.post('/users/', async (req,res)=>{
        const collection = req.app.locals.collection;
        try{
            const user = {name: req.body.name, age: req.body.age}
            const insertResult = await collection.insertOne(user);
            if (insertResult)
                res.send(insertResult);
            else res.sendStatus(200);
        }
        catch(err){
            console.error(err);
            res.status(500).send("Server error:<br>" + err.toString());
        }
    });
    apiRouter.put('/users/', async (req,res)=>{
        const collection = req.app.locals.collection;
        try{
            const updateResult = await collection.findOneAndUpdate({_id: new ObjectId(req.body.id)},
                {$set: {name: req.body.name, age: req.body.age}}, {returnDocument: "after"});
            if (updateResult)
                res.send(updateResult);
            else res.sendStatus(404);
        }
        catch(err){
            console.error(err);
            res.status(500).send("Server error:<br>" + err.toString());
        }
    });
    apiRouter.delete('/users/:id', async (req,res)=>{
        const collection = req.app.locals.collection;
        try{
            const deletionResult = await collection.findOneAndDelete({_id: new ObjectId(req.params.id)});
            if (deletionResult)
                res.send(deletionResult);
            else res.sendStatus(404);
        }
        catch(err){
            console.error(err);
            res.status(500).send("Server error:<br>" + err.toString());
        }
    });


    app.get('/', (req, res) => {
        res.render("home");
    });
    app.use('/users', (req, res) => {
        res.render('users', {
            title: "Users edit page"
        });
    })
    app.use("/api", apiRouter);
}