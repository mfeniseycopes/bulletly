const BaseController = require('./base')
const { singleResponse } = require('../util/response')

const UserController = Object.assign({}, BaseController, {

  create: (req, res) => {
    // after running passport.authenticate('local-register')
    if (req.user) {
      singleResponse(res)(req.user)
    } else {
      res
        .status(422)
        .send(JSON.stringify(info))
    }
  },

  login: (req, res) => {
    if (req.user) {
      singleResponse(res)(req.user)
    } else {
      res
        .status(404)
        .send(JSON.stringify(info))
    }
  },

  logout: (req, res) => {
    req.logout()
    res.send('null')
  }
})

module.exports = UserController
