const bulletRouter = require('express').Router()
const db = require('../models')

bulletRouter.all('/', (req, res, next) => {
  res.contentType('application/json')
  next()
})

bulletRouter.get('/', (req, res) =>
  db.models.Bullet
  .findAll()
  .then(bullets => {
    console.log(bullets)
    res
    .status(200)
    .send(bullets.map(b => b.toJSON()))
  })
  .catch(console.log)
)

module.exports = bulletRouter
