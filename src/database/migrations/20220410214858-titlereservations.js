'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('titlereservations', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      id_reservation: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      id_title: {
        type: Sequelize.INTEGER,
        allowNull: false,
      }
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('titlereservations')
  }
};
