const bulletRouter = require('express').Router()
const { models: { Bullet } } = require('../models')
const { destroy, toJSON, update } = require('../util/pointfree')
const { singleResponse, arrayResponse } = require('../util/response')

// POINTFREE HELPERS

const createBullet = bullet => parent =>
  parent ?
  parent.createChild(Object.assign({}, bullet, { topic_id: parent.topic_id })) :
  Promise.resolve()

// ROUTES

bulletRouter.all('/', (req, res, next) => {
  res.contentType('application/json')
  next()
})

bulletRouter.get('/', (req, res) =>
  Bullet
    .findAll()
    .then(arrayResponse(res))
    .catch(console.warn))

bulletRouter.get('/:id', (req, res) =>
  Bullet
    .findById(req.params.id)
    .then(singleResponse(res))
    .catch(console.warn))

bulletRouter.post('/', (req, res) =>
  Bullet
    .create(req.body.bullet)
    .then(singleResponse(res))
    .catch(console.warn))

bulletRouter.post('/:parentId/bullets', (req, res) =>
  Bullet
    .findById(req.params.parentId)
    .then(createBullet(req.body.bullet))
    .then(singleResponse(res))
    .catch(console.warn))

bulletRouter.put('/:id', (req, res) =>
  Bullet
    .findById(req.params.id)
    .then(update(req.body.bullet))
    .then(singleResponse(res))
    .catch(console.warn))

bulletRouter.delete('/:id', (req, res) =>
  Bullet
    .findById(req.params.id)
    .then(destroy())
    .then(singleResponse(res))
    .catch(console.warn))

module.exports = bulletRouter
