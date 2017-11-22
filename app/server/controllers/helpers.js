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

  authenticateTopic: (req, res, next) => {
    Topic
      .findById(req.topicId, { where: { ownerId: req.user.id } })
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
