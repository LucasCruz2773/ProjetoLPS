const { User, Reservation, Treservation, Title } = require('../models')
const jwt = require('jsonwebtoken');

class ReservationController {
    async index(req, res) {
        const reservations = await Reservation.findAll();
        return res.json(reservations);
    }

    async reserve(req, res) {
        const { titles } = req.body;
        const userLogged = await User.findOne({ where: { id: req.userId } });

        if(!userLogged){
            return res.status(401).json({ message: 'Forbiden access' });
        }
        

        
        Reservation.hasMany(Treservation, {foreignKey: 'id_reservation'})
        Treservation.belongsTo(Reservation, {foreignKey: 'id_reservation'})
        
        try{
            let cantCreate = false;
            let biggerDate = 0;
            await Promise.all(titles.map(async (title) => {
                const verifyTitle = await Title.findOne({ where: { id: title } })
                const reservations = await Treservation.findAll({ 
                    where: {
                        id_title: title
                    }, 
                    include: [{
                        model: Reservation,
                        where: {status: 'emprestado'}
                    }]
                })
                if((verifyTitle.quantity - reservations.length) <= 0){
                    cantCreate = true;
                }
                if(verifyTitle.deadline > biggerDate){
                    biggerDate = verifyTitle.deadline;
                }
            }))
            if(cantCreate){
                return res.status(401).json({ message: 'Title not acessible' });
            } else {
                let expiryDate = new Date();
                expiryDate.setDate(expiryDate.getDate() + biggerDate);
                const reservation = await Reservation.create({
                    id_user: req.userId,
                    initial_date: new Date(),
                    final_date: expiryDate,
                    status: 'emprestado'
                });
                titles.map(async (title) => {
                    await Treservation.create({
                        id_title: title,
                        id_reservation: reservation.id
                    })
                });
            }
        } catch(err){
            console.log(err);
        }
        

        return res.json({message: "Reservation has been created"});
    }

    async reserveTeacher(req, res) {
        const { titles, days } = req.body;
        const userLogged = await User.findOne({ where: { id: req.userId } });

        if(!userLogged){
            return res.status(401).json({ message: 'Forbiden access' });
        }

        if(userLogged && userLogged.type !== 'teacher'){
            return res.status(401).json({ message: 'Forbiden access' });
        }
        
        Reservation.hasMany(Treservation, {foreignKey: 'id_reservation'})
        Treservation.belongsTo(Reservation, {foreignKey: 'id_reservation'})
        
        try{
            let cantCreate = false;
            await Promise.all(titles.map(async (title) => {
                const verifyTitle = await Title.findOne({ where: { id: title } })
                const reservations = await Treservation.findAll({ 
                    where: {
                        id_title: title
                    }, 
                    include: [{
                        model: Reservation,
                        where: {status: 'emprestado'}
                    }]
                })
                if((verifyTitle.quantity - reservations.length) <= 0){
                    cantCreate = true;
                }
            }))
            if(cantCreate){
                return res.status(401).json({ message: 'Title not acessible' });
            } else {
                let expiryDate = new Date();
                expiryDate.setDate(expiryDate.getDate() + days);
                const reservation = await Reservation.create({
                    id_user: req.userId,
                    initial_date: new Date(),
                    final_date: expiryDate,
                    status: 'reservado'
                });
                titles.map(async (title) => {
                    await Treservation.create({
                        id_title: title,
                        id_reservation: reservation.id
                    })
                });
            }
        } catch(err){
            console.log(err);
        }
        

        return res.json({message: "Reservation has been created"});
    }

    async finishReserve(req, res) {

        const userLogged = await User.findOne({ where: { id: req.userId } });

        if(!userLogged){
            return res.status(401).json({ message: 'Forbiden access' });
        }

        await Reservation.update({
            status: 'devolvido'
        }, { where: { id: req.params.id } });
        const reservation = await Reservation.findOne({ where: { id: req.params.id } });

        return res.json(reservation);
    }

}

module.exports = new ReservationController();