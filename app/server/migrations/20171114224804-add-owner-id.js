'use strict';

module.exports = {
  up: (queryInterface, {DataTypes, fn}) => {
    queryInterface.addColumn('topics', 'owner_id', {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
      allowNull: false,
    })
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('topics', 'owner_id')
  }
};
