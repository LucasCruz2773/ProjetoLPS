const routes = require('express').Router();

const authMiddleware = require('./app/middleware/auth');

const SessionController = require('./app/controllers/SessionController');
const UserController = require('./app/controllers/UserController');
const TitleController = require('./app/controllers/TitleController');
const ReservationController = require('./app/controllers/ReservationController');

routes.post('/sessions', SessionController.store);

routes.get('/title', TitleController.index);
routes.get('/title/:id', TitleController.find);

routes.use(authMiddleware);
routes.post('/user', UserController.store);
routes.get('/user', UserController.index);
routes.get('/user/:id', UserController.find);
routes.put('/user/:id', UserController.update);
routes.delete('/user/:id', UserController.delete);

routes.post('/title', TitleController.store);
routes.put('/title/:id', TitleController.update);
routes.delete('/title/:id', TitleController.delete);

routes.post('/reservation', ReservationController.reserve);

module.exports = routes;