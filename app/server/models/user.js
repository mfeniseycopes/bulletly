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

  User.generatePasswordHash = password =>
    bcrypt.hashSync(password, 10)

  User.isPassword = (user, password) =>
    bcrypt.compareSync(password, user.passwordHash);

  return User
}

module.exports = userDefn
