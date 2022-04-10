const { User, Title, Reservation, titlereservations } = require('../models')
const jwt = require('jsonwebtoken');

class ReservationController {
    async index(req, res) {
        const title = await Title.findAll();
        return res.json(title);
    }

    async reserve(req, res) {
        const { titles } = req.body;
        const userLogged = await User.findOne({ where: { id: req.userId } });

        if(!userLogged){
            return res.status(401).json({ message: 'Forbiden access' });
        }
        

        const reservation = await Reservation.create({
            id_user: req.userId,
            initial_date: new Date(),
            final_date: new Date(),
            status: 'emprestado'
        });

        console.log(reservation)
        const ts = await titlereservations.findAll();
        console.log(ts);
        // const t = await TitleReservation.create({
        //     id_title: 3,
        //     id_reservation: 23
        // })

        // console.log(t);

        // titles.map(async (title) => {
        //     await TitleReservation.create({
        //         id_title: title,
        //         id_reservation: reservation.id
        //     })
        // })
        

        return res.json({message: "Reservation has been created"});
    }

}

module.exports = new ReservationController();