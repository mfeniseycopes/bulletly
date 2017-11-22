const topicController = require('../controllers/topic')
const { 
  authenticateTopic, 
  ensureSession } = require('../controllers/helpers')
const { 
  singleResponse, 
  arrayResponse,
  fourO4Response,
} = require('../util/response')

// TODO: remove these when controllers complete
const { destroy, toJSON, update } = require('../util/pointfree')
const { bullet: Bullet, topic: Topic, user: User } = require('../models')
const createBullet = bullet => topic => {
  return topic ?
    topic.createBullet(bullet) :
    Promise.resolve()
}

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

  topicRouter.get('/:topicId/bullets', (req, res) =>
    Topic
    .findOne({
      where: {
        id: req.params.topicId,
        ownerId: req.user.id,
      },
    })
    .then(t => {
      if (t) { 
        t.getBullets({})
          .then(arrayResponse(res))
      } else {
        four04Response(res) 
      }
    })
  )

  topicRouter.post('/:topicId/bullets', 
    (req, res) => {
      Topic
        .findById(req.params.topicId)
        .then(createBullet(req.body))
        .then(singleResponse(res))
    })

  app.use(baseRoute, topicRouter)
}

module.exports = setupTopics 
