const bcrypt = require('bcryptjs');

const { User } = require('../../src/app/models');
const truncate = require('../utils/truncate');

describe('User', () => {
    beforeEach(async () => {
        await truncate();
    });

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
})