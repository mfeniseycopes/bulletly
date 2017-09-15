'use strict';

module.exports = {
  up: (queryInterface, { DataTypes }) => {
    return queryInterface.createTable('topics', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Untitled Topic',
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('topics');
  }
};
