'use strict';

module.exports = {
  up: (queryInterface, {DataTypes, fn}) => {
    return queryInterface.addColumn('topics', 'ownerId', {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
      allowNull: false,
    })
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('topics', 'ownerId')
  }
};
