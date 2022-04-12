const request = require('supertest');
const app = require('../../src/app');
const bcrypt = require('bcryptjs');
const factory = require('../factories');
const { User } = require('../../src/app/models');
const truncate = require('../utils/truncate');

describe('User', () => {
    

    it('should encrypt user password', async () => {
        const user = await User.create({ 
            name: 'Lucas', 
            email: 'teste2@gmail.com', 
            password: '123123',
            cpf: '48980859899',
            address: 'Rua tal',
            telephone: '19995730199',
            type: 'manager'
        });

        const compareHash = await bcrypt.compare('123123', user.password_hash)

        expect(compareHash).toBe(true);
    })

    it('should login to create a user', async () => {
        const user = await factory.create('User', {
            password: '123123',
            type: 'manager',
        })

        const newUser = { 
            name: 'Lucas', 
            email: 'teste10@gmail.com', 
            password: '123123',
            cpf: '48980859899',
            address: 'Rua tal',
            telephone: '19995730199',
            type: 'manager'
        };

        const response = await request(app)
            .post('/user')
            .set('Authorization', `Bearer ${user.generateToken()}`)
            .send(newUser);

        expect(response.status).toBe(200);
    })

    it('should not create a user with missing fields', async () => {
        const user = await factory.create('User', {
            password: '123123'
        })

        const newUser = { 
            name: 'Lucas', 
            password: '123123',
            cpf: '48980859899',
            address: 'Rua tal',
            telephone: '19995730199',
            type: 'manager'
        };

        const response = await request(app)
            .post('/user')
            .set('Authorization', `Bearer ${user.generateToken()}`)
            .send(newUser);

        expect(response.status).toBe(401);
    })

    it('should not create a user with same emails', async () => {
        const user = await User.create({ 
            name: 'Lucas', 
            email: 'teste@gmail.com', 
            password: '123123',
            cpf: '48980859899',
            address: 'Rua tal',
            telephone: '19995730199',
            type: 'manager'
        });

        const newUser = { 
            name: 'Lucas', 
            email: 'teste@gmail.com',
            password: '123123',
            cpf: '48980859899',
            address: 'Rua tal',
            telephone: '19995730199',
            type: 'manager'
        };

        const response = await request(app)
            .post('/user')
            .set('Authorization', `Bearer ${user.generateToken()}`)
            .send(newUser);

        expect(response.status).toBe(401);
    })

    it('should not be able to find users without being a manager', async () => {
        const user = await factory.create('User', {
            password: '123123',
            type: 'student'
        })

        const response = await request(app)
            .get('/user')
            .set('Authorization', `Bearer ${user.generateToken()}`)
        expect(response.status).toBe(401);
    })

    it('should not be able to create a user without being a manager', async () => {
        const user = await factory.create('User', {
            password: '123123',
            type: 'student'
        })

        const newUser = { 
            name: 'Lucas', 
            email: 'teste9@gmail.com',
            password: '123123',
            cpf: '48980859899',
            address: 'Rua tal',
            telephone: '19995730199',
            type: 'manager'
        };

        const response = await request(app)
            .post('/user')
            .set('Authorization', `Bearer ${user.generateToken()}`)
            .send(newUser);
        expect(response.status).toBe(401);
    })

    it('should be able to update a user', async () => {
        const user = await factory.create('User', {
            password: '123123',
            type: 'manager'
        })
        const newUser = { 
            name: 'Lucas', 
        };

        const response = await request(app)
            .put(`/user/${user.id}`)
            .set('Authorization', `Bearer ${user.generateToken()}`)
            .send(newUser);
        expect(response.status).toBe(200);
    })

    it('should be able to delete a user', async () => {
        const user = await factory.create('User', {
            password: '123123',
            type: 'manager'
        })

        const response = await request(app)
            .delete(`/user/${user.id}`)
            .set('Authorization', `Bearer ${user.generateToken()}`)
        expect(response.status).toBe(200);
    })

})