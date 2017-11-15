const bcrypt = require('bcrypt')

const authRouter = require('express').Router()
const { user: User } = require('../models')
const { singleResponse } = require('../util/response')

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

module.exports = authRouter
