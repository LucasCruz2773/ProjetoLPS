const request = require('supertest');
const app = require('../../src/app');
const factory = require('../factories');
const { User, Title } = require('../../src/app/models');
const truncate = require('../utils/truncate');

describe('Title', () => {
    

    it('should show titles', async() => {
        const response = await request(app)
            .get('/title');

        expect(response.status).toBe(200);
    })

    it('should login to create a title', async () => {
        const user = await factory.create('User', {
            password: '123123',
            type: 'manager',
        })

        const title = { 
            name: 'Título 1', 
            quantity: 10, 
            deadline: 10,
            description: 'Descrição 1',
            type: 'livros'
        };

        const response = await request(app)
            .post('/title')
            .set('Authorization', `Bearer ${user.generateToken()}`)
            .send(title);

        expect(response.status).toBe(200);
    })


    it('should not be able to create a title without being a manager', async () => {
        const user = await factory.create('User', {
            password: '123123',
            type: 'student'
        })

        const title = { 
            name: 'Título 1', 
            quantity: 10, 
            deadline: 10,
            description: 'Descrição 1',
            type: 'livros'
        };

        const response = await request(app)
            .post('/title')
            .set('Authorization', `Bearer ${user.generateToken()}`)
            .send(title);
        expect(response.status).toBe(401);
    })

    it('should be able to update a title', async () => {
        const user = await factory.create('User', {
            password: '123123',
            type: 'manager'
        })

        const title = await factory.create('Title', {
            type: 'livros'
        });

        const newTitle = { 
            description: 'Descrição 1', 
        };

        const response = await request(app)
            .put(`/title/${title.id}`)
            .set('Authorization', `Bearer ${user.generateToken()}`)
            .send(newTitle);
        expect(response.status).toBe(200);
    })

    it('should be able to delete a title', async () => {
        const user = await factory.create('User', {
            password: '123123',
            type: 'manager'
        })

        const title = await factory.create('Title', {
            type: 'livros'
        });

        const response = await request(app)
            .delete(`/title/${title.id}`)
            .set('Authorization', `Bearer ${user.generateToken()}`)
        expect(response.status).toBe(200);
    })

})