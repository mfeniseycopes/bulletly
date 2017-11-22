'use strict';

module.exports = {
  up: (queryInterface, {DataTypes}) => {
    queryInterface.addColumn('bullets', 'ownerId', {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
      allowNull: false,
    })
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('bullets', 'ownerId')
  }
};
