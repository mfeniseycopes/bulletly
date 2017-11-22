const BaseController = require('./base')
const { arrayResponse, singleResponse, } = require('../util/response')

const BulletController = Object.assign({}, BaseController, {

  index: (req, res) => {
    if (req.topic) {
      req.topic
        .getBullets()
        .then(arrayResponse(res))
    } else {
      req.user
        .getBullets()
        .then(arrayResponse(res))
    }
  },

  create: (req, res) => {
    if (req.topic) {
      req.topic
        .createBullet(Object.assign({ ownerId: req.topic.ownerId }, req.body))
        .then(singleResponse(res))
    } else if (req.bullet) {
      req.bullet
        .createChild(Object.assign({ ownerId: req.bullet.ownerId }, req.body))
        .then(singleResponse(res))
    }
  },

  update: (req, res) => {
    req.bullet
      .update(req.body)
      .then(singleResponse(res))
  },

  destroy: (req, res) => {
    req.bullet
      .destroy()
      .then(() => singleResponse(res)(req.bullet))
  },

})

module.exports = BulletController
