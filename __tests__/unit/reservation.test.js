const request = require('supertest');
const app = require('../../src/app');
const factory = require('../factories');
const { Reservation, Title } = require('../../src/app/models');
const truncate = require('../utils/truncate');

describe('Reservation', () => {
    

    it('should show reservations', async() => {
        const user = await factory.create('User', {
            password: '123123',
            type: 'manager',
        })

        const response = await request(app)
            .get('/reservation')
            .set('Authorization', `Bearer ${user.generateToken()}`)

        expect(response.status).toBe(200);
    })

    it('should login to create a reservation', async () => {
        const user = await factory.create('User', {
            password: '123123',
            type: 'manager',
        })

        const title = await Title.create({ 
            name: 'Título 1', 
            quantity: 10, 
            deadline: 10,
            description: 'Descrição 1',
            type: 'livros'
        });

        const reservation = { 
            titles: [title.id],
        };

        const response = await request(app)
            .post('/reservation')
            .set('Authorization', `Bearer ${user.generateToken()}`)
            .send(reservation);

        expect(response.status).toBe(200);
    })

    it('should login to finish a reservation', async () => {
        const user = await factory.create('User', {
            password: '123123',
            type: 'manager',
        })

        const title = await Title.create({ 
            name: 'Título 1', 
            quantity: 10, 
            deadline: 10,
            description: 'Descrição 1',
            type: 'livros'
        });



        const reservation = await Reservation.create({ 
            id_user: user.id, 
            initial_date: new Date(),
            final_date: new Date(),
            status: 'emprestado'
        });

        const responseUpdate = await request(app)
            .put(`/reservation/${reservation.id}`)
            .set('Authorization', `Bearer ${user.generateToken()}`)
            .send();

        expect(responseUpdate.status).toBe(200);
    })

    it('should login as a teacher to create a teacher reservation', async () => {
        const user = await factory.create('User', {
            password: '123123',
            type: 'teacher',
        })

        const title = await Title.create({ 
            name: 'Título 1', 
            quantity: 10, 
            deadline: 10,
            description: 'Descrição 1',
            type: 'livros'
        });

        const reservation = { 
            titles: [title.id],
            days: 20,
        };

        const response = await request(app)
            .post('/teacher_reservation')
            .set('Authorization', `Bearer ${user.generateToken()}`)
            .send(reservation);

        expect(response.status).toBe(200);
    })

})