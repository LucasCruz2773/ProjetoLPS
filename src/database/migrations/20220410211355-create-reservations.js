'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('reservations', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      id_user: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' }
      },
      initial_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      final_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false.valueOf,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false.valueOf,
      }
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('reservations')
  }
};
