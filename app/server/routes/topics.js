const bulletController = require('../controllers/bullet')
const topicController = require('../controllers/topic')
const { 
  authenticateTopic, 
  ensureSession } = require('../controllers/helpers')

const setupTopics = (baseRoute, app, passport) => {
  
  const topicRouter = require('express').Router()

  // ROUTES
  topicRouter.all('/', 
    (req, res, next) => {
      res.contentType('application/json')
      next()
    },
    ensureSession
  )

  topicRouter.get('/', 
    topicController.index)

  topicRouter.post('/', 
    topicController.create)
  
  topicRouter.put('/:topicId', 
    authenticateTopic,
    topicController.update)

  topicRouter.delete('/:topicId', 
    authenticateTopic,
    topicController.destroy)

  topicRouter.get('/:topicId/bullets',
    authenticateTopic,
    bulletController.index)

  topicRouter.post('/:topicId/bullets', 
    authenticateTopic,
    bulletController.create)

  app.use(baseRoute, topicRouter)
}

module.exports = setupTopics 
