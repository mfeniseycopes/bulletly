const bulletController = require('../controllers/bullet')
const { 
  authenticateBullet, 
  ensureSession,
  setResponseType, } = require('../controllers/helpers')

const setupBullets = (baseRoute, app, passport) => {

  const bulletRouter = require('express').Router()

  // ROUTES
  bulletRouter.all('/',
    setResponseType('application/json'),
    ensureSession)

  bulletRouter.get('/',
    bulletController.index)

  bulletRouter.post('/:parentId/bullets',
    authenticateBullet('parentId'),
    bulletController.create)

  bulletRouter.put('/:id',
    authenticateBullet('id'),
    bulletController.update)

  bulletRouter.delete('/:id',
    authenticateBullet('id'),
    bulletController.destroy)

  app.use(baseRoute, bulletRouter)
}

module.exports = setupBullets 
