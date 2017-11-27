const static = require('express').static 
const bodyParser = require('body-parser')
const escape = require('escape-html')
const setupPassport = require('../config/passport')

const setupAuth = require('./auth')
const setupBullets = require('./bullets')
const setupTopics = require('./topics')

module.exports = (app) => {

  // parse request body
  app.use(bodyParser.json())

  // respond with 500 on server error
  app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })

  // let passport handle user authentication
  const passport = setupPassport(app)

  // setup routes
  setupAuth('/auth', app, passport)
  setupBullets('/bullets', app, passport)
  setupTopics('/topics', app, passport)
  app.use('/static', static('./public'))

  // load index and javascripts
  app.get('/', (req, res) => {
    res.render('index.pug', {
      NODE_ENV: process.env.NODE_ENV, 
      user: req.user ? JSON.stringify(req.user) : 'null',
    })
  })
}
