exports.home = (req, res) => {
        res.render("home", {
            title: "Sweat Home"
        });
    }
exports.users = async (req, res) => {
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
    }