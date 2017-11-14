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
  }, {
    hooks: {
      beforeCreate: user =>
      user.passwordHash = bcrypt.hash(user.password, 10),
    }
  })

  User.associate = db => {
    
    User.hasMany(db.topic, {
      foreignKey: 'owner_id',
      as: 'topics',
      hooks: true,
    })
  }

  return User
}

module.exports = userDefn
