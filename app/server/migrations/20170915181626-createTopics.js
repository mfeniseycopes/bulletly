'use strict';

module.exports = {
  up: (queryInterface, { DataTypes }) => {
    return queryInterface.createTable('topics', {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Untitled Topic',
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('topics');
  }
};
