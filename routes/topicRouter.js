const topicRouter = require('express').Router()
const { models: { Bullet, Topic } } = require('../models')
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
    .catch(console.warn))

topicRouter.get('/:topicId', (req, res) =>
  Topic
    .findById(req.params.topicId, { include: 'bullets' })
    .then(singleResponse(res))
    .catch(console.warn))

topicRouter.post('/', (req, res) =>
  Topic
    .create(req.body.topic)
    .then(singleResponse(res))
    .catch(console.warn))

topicRouter.post('/:topicId/bullets', (req, res) =>
  Topic
    .findById(req.params.topicId)
    .then(createBullet(req.body.bullet))
    .then(singleResponse(res))
    .catch(console.warn))

topicRouter.put('/:topicId', (req, res) =>
  Topic
    .findById(req.params.topicId)
    .then(update(req.body.topic))
    .then(singleResponse(res))
    .catch(console.warn))

topicRouter.delete('/:topicId', (req, res) =>
  Topic
    .findById(req.params.topicId)
    .then(destroy())
    .then(singleResponse(res))
    .catch(console.warn))

module.exports = topicRouter
