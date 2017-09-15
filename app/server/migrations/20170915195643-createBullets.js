'use strict';

module.exports = {
  up: (queryInterface, {DataTypes, fn}) => {
    return queryInterface.createTable('bullets', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      ord: DataTypes.INTEGER,
      type: {
        type: DataTypes.ENUM('task', 'note', 'event'),
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      body: DataTypes.TEXT,
      body_type: {
        type: DataTypes.ENUM('markdown', 'latex'),
        allowNull: false,
        defaultValue: 'markdown',
      },
      due_date: {
        type: DataTypes.DATE,
        defaultValue: fn('now'),
      },
      completed_on: DataTypes.DATE,
      recurrence: DataTypes.STRING,
      topic_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      parent_id: DataTypes.INTEGER,
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('bullets');
  }
};
