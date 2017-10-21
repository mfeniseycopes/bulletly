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

  return User
}

module.exports = userDefn
