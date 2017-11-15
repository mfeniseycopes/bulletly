const static = require('express').static 
const bodyParser = require('body-parser')
const setupPassport = require('../config/passport')

const setupAuth = require('./auth')
const setupBullets = require('./bullets')
const setupTopics = require('./topics')

module.exports = (app) => {
  app.use(bodyParser.json())

  const passport = setupPassport(app)

  setupAuth('/', app, passport)
  setupBullets('/bullets', app, passport)
  setupTopics('/topics', app, passport)
  
  app.use('/static', static('./public'))
  app.get('/', (req, res) => {
    res.render('index.pug', {NODE_ENV: process.env.NODE_ENV})
    console.log(req.body)
    console.log(req.path)
  })
}
