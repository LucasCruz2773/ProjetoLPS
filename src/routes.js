const routes = require('express').Router();

const authMiddleware = require('./app/middleware/auth');

const SessionController = require('./app/controllers/SessionController');
const UserController = require('./app/controllers/UserController');
const TitleController = require('./app/controllers/TitleController');
const ReservationController = require('./app/controllers/ReservationController');
const PenaltyController = require('./app/controllers/PenaltyController');

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

routes.get('/reservation', ReservationController.index);
routes.post('/reservation', ReservationController.reserve);
routes.post('/teacher_reservation', ReservationController.reserveTeacher);
routes.put('/reservation/:id', ReservationController.finishReserve);

routes.post('/penalty', PenaltyController.store);
routes.get('/penalty', PenaltyController.index);
routes.put('/penalty/:id', PenaltyController.paid);

module.exports = routes;