const bcrypt = require('bcrypt')
const Router = require('express').Router

const { user: User } = require('../models')
const { singleResponse } = require('../util/response')

const setupAuth = (baseRoute, app, passport) => {

  const authRouter = Router()

  authRouter.all('/', (req, res, next) => {
    res.contentType('application/json')
    next()
  })

  authRouter.post(
    '/register', (req, res, next) =>
    passport.authenticate('local-register', 
      (err, user, info) => {
        if (user)
          singleResponse(res)(user)
        else {
          res.status(422)
          res.send(info.toJSON())
        }
      }
    )(req, res, next)
  )

  app.use(baseRoute, authRouter)
}

module.exports = setupAuth
