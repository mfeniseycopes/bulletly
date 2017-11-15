const bcrypt = require('bcrypt')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const { user: User } = require('../models')

module.exports = app => {
  app.use(passport.initialize())
  app.use(passport.session())

  const fieldMapping = {
    usernameField: 'email',
    passwordField: 'password',
  }

  passport.serializeUser((user, done) => {
    done(null, user.id) 
  })

  passport.deserializeUser((id, done) => {
    User.findById(id)
      .then(user => done(null, user))
  })

  passport.use('local-register', new LocalStrategy(
    fieldMapping,
    (email, password, done) => {
      let passwordHash = null
      if (password)
        passwordHash = User.generatePasswordHash(password) 

      User.create({ email, passwordHash })
        .then(user => done(null, user))
        .catch(err => done(null, false, { message: err }))
    })
  )

  passport.use('local-login', new LocalStrategy(
    fieldMapping,
    (email, password, done) =>
      User.findOne({ where: { email: email } })
        .then(user => 
          (user && User.isPassword(user, password)) ?
            done(null, user) :
            done(null, false, { message: 'Invalid credentials' }))
  ))

  return passport
}
