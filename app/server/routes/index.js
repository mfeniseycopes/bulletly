const static = require('express').static 
const bodyParser = require('body-parser')
const escape = require('escape-html')
const setupPassport = require('../config/passport')

const setupAuth = require('./auth')
const setupBullets = require('./bullets')
const setupTopics = require('./topics')

module.exports = (app) => {

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ entended: true }))
  const passport = setupPassport(app)

  setupAuth('/auth', app, passport)
  setupBullets('/bullets', app, passport)
  setupTopics('/topics', app, passport)

  app.use('/static', static('../public'))
  app.get('/', (req, res) => {
    res.render('index.pug', {
      NODE_ENV: process.env.NODE_ENV, 
      user: req.user ? JSON.stringify(req.user) : 'null',
    })
  })
}
