const BaseController = require('./base')
const { arrayResponse, singleResponse, } = require('../util/response')

const BulletController = Object.assign({}, BaseController, {

  index: (req, res) => {
    req.topic
      .getBullets()
      .then(arrayResponse(res))
  },

  create: (req, res) => {
    req.topic
      .createBullet(req.body)
      .then(singleResponse(res))
  },

  update: (req, res) => {
    req.bullet
      .update(req.body)
      .then(singleResponse(res))
  },

  destroy: (req, res) => {
    req.bullet
      .destroy()
      .then(singleResponse(res))
  },

})

module.exports = BulletController
