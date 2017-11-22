const { 
  bullet: Bullet, 
  topic: Topic } = require('../models')

module.exports = {

  ensureSession: (req, res, next) => {
    if (req.isAuthenticated())
      next()
    else {
      res
        .status(401)
        .send('{ error: "Invalid credentials"}')
    } 
  },

  authenticateBullet: (req, res, next) => {
    Bullet 
      .findById(req.params.parentId, { where: { ownerId: req.user.id } })
      .then(bullet => {
        if (bullet) {
          req.bullet  = bullet 
          next()
        } else {
          res
            .status(404)
            .send('{ error: "Requested resource does not exist" "}')
        }
      })
  },

  authenticateTopic: (req, res, next) => {
    Topic
      .findById(req.params.topicId, { where: { ownerId: req.user.id } })
      .then(topic => {
        if (topic) {
          req.topic = topic
          next()
        } else {
          res
            .status(404)
            .send('{ error: "Requested resource does not exist" "}')
        }
      })
  }

}
