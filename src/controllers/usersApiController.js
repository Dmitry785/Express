exports.getAll = async function(req,res){
        const userModel = req.app.locals.userModel;
        try{
            const users = await userModel.find({});
            res.send(users);
        }
        catch(err){
            console.error(err);
            res.status(500).send("Server error:<br>" + err.toString());
        }
    }

exports.get  = async (req,res)=>{
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
    }

exports.create = async (req,res)=>{
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
    }
exports.update = async (req,res)=>{
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
    }
exports.delete = async (req,res)=>{
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
    }