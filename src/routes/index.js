const { ObjectId } = require('mongodb');

const Router = require('express').Router;
module.exports = function(app){
    const apiRouter = Router();

    apiRouter.get('/users', async (req, res)=>{
        const userModel = req.app.locals.userModel;
        try{
            const users = await userModel.find({});
            res.send(users);
        }
        catch(err){
            console.error(err);
            res.status(500).send("Server error:<br>" + err.toString());
        }
    });
    apiRouter.get('/users/:id', async (req,res)=>{
        const userModel = req.app.locals.userModel;
        try{
            const user = await userModel.findById(req.params.id)
            if(!user)
                res.sendStatus(404);
            else res.send(user);
        }
        catch(err){
            console.error(err);
            res.status(500).send("Server error:<br>" + err.toString());
        }
    });
    apiRouter.post('/users/', async (req,res)=>{
        const userModel = req.app.locals.userModel;
        try{
            const user = {name: req.body.name, age: req.body.age}
            const insertResult = await userModel.create(user);
            res.send(insertResult);
        }
        catch(err){
            console.error(err);
            res.status(500).send("Server error:<br>" + err.toString());
        }
    });
    apiRouter.put('/users/', async (req,res)=>{
        const userModel = req.app.locals.userModel;
        try{
            const updateResult = await userModel.findByIdAndUpdate(req.body.id,
                {name: req.body.name, age: req.body.age}, {returnDocument: "after"});
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
        const userModel = req.app.locals.userModel;
        try{
            const deletionResult = await userModel.findByIdAndDelete(req.params.id);
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
        res.render("home", {
            title: "Sweat Home"
        });
    });
    app.use('/users', async (req, res) => {
        const userModel = req.app.locals.userModel;
        try{
            const users = await userModel.find({}).lean();
            res.render('users', {
                title: "Users",
                users: [...users]
            });
        }
        catch(err){
            console.error(err);
            res.render('users', {
                title: "Users",
                users: []
            });
        }
    })
    app.use("/api", apiRouter);
}