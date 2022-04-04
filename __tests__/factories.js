const faker = require('faker-br');
const { factory } = require('factory-girl');
const { User } = require('../src/app/models');

factory.define('User', User, { 
    name: faker.name.findName(), 
    email: faker.internet.email, 
    password: faker.internet.password(),
    cpf: faker.br.cpf(),
    address: faker.address.streetAddress(),
    telephone: faker.phone.phoneNumber(),
    type: 'manager'
})

module.exports = factory;