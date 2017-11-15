const bcrypt = require('bcrypt')

const userDefn = (db, DataTypes) => {

  const User = db.define('user', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    }, 
  })

  User.associate = db => {
    
    User.hasMany(db.topic, {
      foreignKey: 'ownerId',
      as: 'topics',
      hooks: true,
    })
  }

  return User
}

module.exports = userDefn
