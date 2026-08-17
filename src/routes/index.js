const { ObjectId } = require('mongodb');
const Router = require('express').Router;

const userController = require('../controllers/usersApiController');
const homeController = require('../controllers/homeController');

module.exports = function(app){
    const apiRouter = Router();

    apiRouter.get('/users', userController.getAll);
    apiRouter.get('/users/:id', userController.get);
    apiRouter.post('/users/', userController.create);
    apiRouter.put('/users/', userController.update);
    apiRouter.delete('/users/:id', userController.delete);


    app.get('/', homeController.home);
    app.use('/users', homeController.users)
    app.use("/api", apiRouter);
}