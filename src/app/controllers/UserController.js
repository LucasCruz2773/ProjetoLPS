const { User } = require('../models')
const jwt = require('jsonwebtoken');

class UserController {
    async index(req, res) {
        const userLogged = await User.findOne({ where: { id: req.userId } });

        if(userLogged && userLogged.type != 'manager'){
            return res.status(401).json({ message: 'Forbiden access' });
        }

        const users = await User.findAll();


        return res.json(users);
    }

    async find(req, res) {
        
        const userLogged = await User.findOne({ where: { id: req.userId } });

        if(userLogged && userLogged.type != 'manager'){
            return res.status(401).json({ message: 'Forbiden access' });
        }

        const user = await User.findOne({ where: { id: req.params.id } });


        return res.json(user);
    }

    async update(req, res) {
        const userLogged = await User.findOne({ where: { id: req.userId } });
        const userReq = req.body;

        if(userLogged && userLogged.type != 'manager'){
            return res.status(401).json({ message: 'Forbiden access' });
        }

        await User.update(userReq, { where: { id: req.params.id } });
        const user = await User.findOne({ where: { id: req.params.id } });

        return res.json(user);
    }

    async delete(req, res) {
        const userLogged = await User.findOne({ where: { id: req.userId } });

        if(userLogged && userLogged.type != 'manager'){
            return res.status(401).json({ message: 'Forbiden access' });
        }

        const user = await User.findOne({ where: { id: req.params.id } });
        await User.destroy({ where: { id: req.params.id } });

        return res.json(user);
    }

    async store(req, res) {
        const { name, email, password, cpf, address, telephone, type } = req.body;
        const userLogged = await User.findOne({ where: { id: req.userId } });

        if(userLogged && userLogged.type != 'manager'){
            return res.status(401).json({ message: 'Forbiden access' });
        }

        if(!name || !email || !password || !cpf || !address || !telephone || !type){
            return res.status(401).json({ message: 'Missing field' });
        }

        const userFinded = await User.findOne({ where: { email } })

        if(userFinded) {
            return res.status(401).json({ message: 'Email already used' })
        }

        const user = await User.create({
            name,
            email,
            password,
            cpf,
            address,
            telephone,
            type
        })


        return res.json(user);
    }
}

module.exports = new UserController();