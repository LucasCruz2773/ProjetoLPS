'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('treservations', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      id_reservation: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'reservations', key: 'id' }
      },
      id_title: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'titles', key: 'id' }
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false.valueOf,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false.valueOf,
      }
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('treservations')
  }
};
