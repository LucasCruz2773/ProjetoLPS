const request = require('supertest');
const app = require('../../src/app');
const factory = require('../factories');
const { Penalty, Reservation } = require('../../src/app/models');
const truncate = require('../utils/truncate');

describe('Reservation', () => {
    

    it('should show penalties', async() => {
        const user = await factory.create('User', {
            password: '123123',
            type: 'manager',
        })

        const response = await request(app)
            .get('/penalty')
            .set('Authorization', `Bearer ${user.generateToken()}`)

        expect(response.status).toBe(200);
    })

    it('should be a manager to create a penalty', async () => {
        const user = await factory.create('User', {
            password: '123123',
            type: 'manager',
        })

        const reservation = await Reservation.create({ 
            id_user: user.id, 
            initial_date: new Date(),
            final_date: new Date(),
            status: 'emprestado'
        });

        const penalty = { 
            id_reservation: reservation.id,
            value: 10,
        };

        const response = await request(app)
            .post('/penalty')
            .set('Authorization', `Bearer ${user.generateToken()}`)
            .send(penalty);

        expect(response.status).toBe(200);
    })

    it('should be a manager to paid a payment', async () => {
        const user = await factory.create('User', {
            password: '123123',
            type: 'manager',
        })

        const reservation = await Reservation.create({ 
            id_user: user.id, 
            initial_date: new Date(),
            final_date: new Date(),
            status: 'emprestado'
        });

        const penalty = await Penalty.create({ 
            id_reservation: reservation.id,
            value: 10,
            paid_at: null
        });

        const response = await request(app)
            .put(`/penalty/${penalty.id}`)
            .set('Authorization', `Bearer ${user.generateToken()}`)
            .send();

        expect(response.status).toBe(200);
    })

})