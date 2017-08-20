const bulletRouter = require('express').Router()
const { models: { Bullet } }= require('../models')

// POINTFREE HELPERS

const destroy = () => record => 
  record
    .destroy()
    .then(() => record)

const toJSON = record => record.toJSON()

const update = values => record => record.update(values)

// RESPONSE HELPERS

const bulletResponse = res => bullet =>
  bullet ?
    res
      .status(200)
      .send(toJSON(bullet)) :
    four04Response(res)()

const bulletsResponse = res => bullets =>
  res
    .status(200)
    .send(bullets.map(toJSON))

const four04Response = res => () =>
  res
    .status(404)
    .send("The requested resource could not be found")

// ROUTES

bulletRouter.all('/', (req, res, next) => {
  res.contentType('application/json')
  next()
})

bulletRouter.get('/', (req, res) =>
  Bullet
    .findAll()
    .then(bulletsResponse(res))
    .catch(console.warn))

bulletRouter.get('/:id', (req, res) =>
  Bullet
    .findById(req.params.id)
    .then(bulletResponse(res))
    .catch(console.warn))

bulletRouter.post('/', (req, res) =>
  Bullet
    .create(req.body.bullet)
    .then(bulletResponse(res))
    .catch(console.warn))

bulletRouter.put('/:id', (req, res) =>
  Bullet
    .findById(req.params.id)
    .then(update(req.body.bullet))
    .then(bulletResponse(res))
    .catch(console.warn))

bulletRouter.delete('/:id', (req, res) =>
  Bullet
    .findById(req.params.id)
    .then(destroy())
    .then(bulletResponse(res))
    .catch(console.warn))


module.exports = bulletRouter
