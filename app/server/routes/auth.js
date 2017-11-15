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

  authRouter.post('/register', (req, res, next) => {
    const password = req.body.password
    let passwordHash = null
    if (password)
      passwordHash = bcrypt.hashSync(password, 10)

    const user = {
      email: req.body.email,
      passwordHash
    }
    req.login(user, err => console.log(err))
    User
      .create(user)
      .then(user => {
        singleResponse(res)(user)
      })
  })

  app.use(baseRoute, authRouter)
}

module.exports = setupAuth
