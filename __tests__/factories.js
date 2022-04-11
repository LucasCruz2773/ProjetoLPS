const faker = require('faker-br');
const { factory } = require('factory-girl');
const { User, Title } = require('../src/app/models');

factory.define('User', User, { 
    name: faker.name.findName(), 
    email: faker.internet.email, 
    password: faker.internet.password(),
    cpf: faker.br.cpf(),
    address: faker.address.streetAddress(),
    telephone: faker.phone.phoneNumber(),
    type: 'manager'
})

factory.define('Title', Title, { 
    name: faker.name.title(), 
    quantity: 12, 
    deadline: 7,
    description: faker.random.words(),
    type: 'livros'
})

module.exports = factory;