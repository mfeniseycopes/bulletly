const Router = require('express').Router 

const userController = require('../controllers/user')
const { 
  setResponseType,
} = require('../controllers/helpers')

const setupAuth = (baseRoute, app, passport) => {

  const authRouter = Router()

  authRouter.all('/', setResponseType('application/json'))

  authRouter.post('/register', 
    passport.authenticate('local-register'),
    userController.create)

  authRouter.post('/login', 
    passport.authenticate('local-login'),
    userController.login)

  authRouter.delete('/logout',
    userController.logout)

  app.use(baseRoute, authRouter)
}

module.exports = setupAuth
