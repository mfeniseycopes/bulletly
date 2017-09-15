'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('topics', { 
      title: {
        type: queryInterface.DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Untitled Topic',
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('topics');
  }
};
