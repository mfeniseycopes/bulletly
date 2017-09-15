const topicRouter = require('express').Router()
const { models: { bullet: Bullet, topic: Topic } } = require('../models')
const { destroy, toJSON, update } = require('../util/pointfree')
const { singleResponse, arrayResponse, four04Response } = require('../util/response')

// POINTFREE HELPERS

const createBullet = bullet => topic =>
  topic ?
  topic.createBullet(bullet) :
  Promise.resolve()

// ROUTES 

topicRouter.all('/', (req, res, next) => {
  res.contentType('application/json')
  next()
})

topicRouter.get('/', (req, res) =>
  Topic
    .findAll()
    .then(arrayResponse(res))
    .catch(console.log))

topicRouter.get('/:topicId/bullets', (req, res) =>
  Topic
    .findById(req.params.topicId)
    .then(t => t.getBullets({}))
    .then(arrayResponse(res)))

topicRouter.post('/', (req, res) =>
  Topic
    .create(req.body)
    .then(singleResponse(res)))

topicRouter.post('/:topicId/bullets', (req, res) =>
  Topic
    .findById(req.params.topicId)
    .then(createBullet(req.body))
    .then(singleResponse(res)))

topicRouter.put('/:topicId', (req, res) =>
  Topic
    .findById(req.params.topicId)
    .then(update(req.body))
    .then(singleResponse(res)))

topicRouter.delete('/:topicId', (req, res) =>
  Topic
    .findById(req.params.topicId)
    .then(destroy())
    .then(singleResponse(res)))

module.exports = topicRouter
