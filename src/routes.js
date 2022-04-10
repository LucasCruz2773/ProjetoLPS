const routes = require('express').Router();

const authMiddleware = require('./app/middleware/auth');

const SessionController = require('./app/controllers/SessionController');
const UserController = require('./app/controllers/UserController');

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);
routes.post('/user', UserController.store);
routes.get('/user', UserController.index);
routes.get('/user/:id', UserController.find);
routes.put('/user/:id', UserController.update);
routes.delete('/user/:id', UserController.delete);

module.exports = routes;