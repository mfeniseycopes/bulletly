const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

module.exports = app => {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(new LocalStrategy(
    function(email, password, done) {
      User.findOne({ email: email }, function(err, user) {
        if (err) return done(err)
        if (!user) {
          return done(null, false, { message: 'Incorrect email.' })
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' })
        }
        return done(null, user)
      })
    }
  ))

  return passport
}
