const bulletController = require('../controllers/bullet')
const topicController = require('../controllers/topic')
const { 
  authenticateTopic, 
  ensureSession,
  setResponseType, } = require('../controllers/helpers')

const setupTopics = (baseRoute, app, passport) => {
  
  const topicRouter = require('express').Router()

  // ROUTES
  topicRouter.all('/', 
    setResponseType('application/json'),
    ensureSession
  )

  topicRouter.get('/', 
    topicController.index)

  topicRouter.post('/', 
    topicController.create)
  
  topicRouter.put('/:topicId', 
    authenticateTopic('topicId'),
    topicController.update)

  topicRouter.delete('/:topicId', 
    authenticateTopic('topicId'),
    topicController.destroy)

  topicRouter.get('/:topicId/bullets',
    authenticateTopic('topicId'),
    bulletController.index)

  topicRouter.post('/:topicId/bullets', 
    authenticateTopic('topicId'),
    bulletController.create)

  app.use(baseRoute, topicRouter)
}

module.exports = setupTopics 
