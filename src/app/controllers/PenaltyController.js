const { User, Penalty } = require('../models')
const jwt = require('jsonwebtoken');

class PenaltyController {
    async index(req, res) {
        const userLogged = await User.findOne({ where: { id: req.userId } });

        if(userLogged && userLogged.type != 'manager'){
            return res.status(401).json({ message: 'Forbiden access' });
        }

        const penalties = await Penalty.findAll();


        return res.json(penalties);
    }

    async store(req, res) {
        const penaltyReq = req.body;
        const userLogged = await User.findOne({ where: { id: req.userId } });
        penaltyReq.paid_at = null;
        if(userLogged && userLogged.type != 'manager'){
            return res.status(401).json({ message: 'Forbiden access' });
        }
        try{
            const penalty = await Penalty.create(penaltyReq)
            return res.json(penalty);
        } catch(err) {
            console.log(err)
        } 
    }

    async paid(req, res) {
        const userLogged = await User.findOne({ where: { id: req.userId } });

        if(userLogged && userLogged.type != 'manager'){
            return res.status(401).json({ message: 'Forbiden access' });
        }

        await Penalty.update({
            paid_at: new Date()
        }, { where: { id: req.params.id } });
        const penalty = await Penalty.findOne({ where: { id: req.params.id } });

        return res.json(penalty);
    }

}

module.exports = new PenaltyController();