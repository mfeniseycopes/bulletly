const bcrypt = require('bcrypt')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const { user: User } = require('../models')

module.exports = app => {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.serializeUser((user, done) => {
    done(null, user.id) 
  })

  passport.deserializeUser((id, done) => {
    User.findById(id)
      .then(user => done(null, user))
  })

  passport.use('local-register', new LocalStrategy(
    (email, password, done) => {

      let passwordHash = null
      if (password)
        passwordHash = bcrypt.hashSync(password, 10)

      User.create({ email, passwordHash })
        .then(user => done(null, user))
        .catch(err => {
          done(null, false, { message: err })
        })
    })
  )


  return passport
}
