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
    '/register', passport.authenticate('local-register'),
    (req, res) => {
      if (req.user)
        singleResponse(res)(req.user)
      else {
        res.status(422)
        res.send(JSON.stringify(info))
      }
    }
  )

  authRouter.post(
    '/login', 
    passport.authenticate('local-login'),
    (req, res) => {
      if (req.user)
        singleResponse(res)(req.user)
      else {
        res.status(404)
        res.send(JSON.stringify(info))
      }
    }
  )

  authRouter.delete('/logout', (req, res, next) => {
    req.logout()
    res.send('null')
  })

  app.use(baseRoute, authRouter)
}

module.exports = setupAuth
