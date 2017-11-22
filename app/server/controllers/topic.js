const BaseController = require('./base')
const { arrayResponse, singleResponse, } = require('../util/response')

const TopicController = Object.assign({}, BaseController, {

  index: (req, res) => {
    req.user
      .getTopics()
      .then(arrayResponse(res))
  },

  create: (req, res) => {
    req.user
      .createTopic(req.body)
      .then(singleResponse(res))
  },

  update: (req, res) => {
    req.topic
      .update(req.body)
      .then(singleResponse(res))
  },

  destroy: (req, res) => {
    req.topic
      .destroy()
      .then(singleResponse(res))
  },

})

module.exports = TopicController
