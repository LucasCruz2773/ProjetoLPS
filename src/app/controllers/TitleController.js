const { User, Title } = require('../models')
const jwt = require('jsonwebtoken');

class TitleController {
    async index(req, res) {
        const title = await Title.findAll();
        return res.json(title);
    }

    async find(req, res) {
        const title = await Title.findOne({ where: { id: req.params.id } });
        return res.json(title);
    }

    async store(req, res) {
        const titleReq = req.body;
        const userLogged = await User.findOne({ where: { id: req.userId } });

        if(userLogged && userLogged.type != 'manager'){
            return res.status(401).json({ message: 'Forbiden access' });
        }

        const title = await Title.create(titleReq)
        return res.json(title);
    }

    async update(req, res) {
        const userLogged = await User.findOne({ where: { id: req.userId } });
        const titleReq = req.body;

        if(userLogged && userLogged.type != 'manager'){
            return res.status(401).json({ message: 'Forbiden access' });
        }

        await Title.update(titleReq, { where: { id: req.params.id } });
        const title = await Title.findOne({ where: { id: req.params.id } });

        return res.json(title);
    }

    async delete(req, res) {
        const userLogged = await User.findOne({ where: { id: req.userId } });

        if(userLogged && userLogged.type != 'manager'){
            return res.status(401).json({ message: 'Forbiden access' });
        }

        const title = await Title.findOne({ where: { id: req.params.id } });
        await Title.destroy({ where: { id: req.params.id } });

        return res.json(title);
    }
}

module.exports = new TitleController();