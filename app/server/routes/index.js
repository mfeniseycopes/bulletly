const static = require('express').static 
const bodyParser = require('body-parser')
const setupPassport = require('../config/passport')

const bulletRouter = require('./bulletRouter')
const topicRouter = require('./topicRouter')
const authRouter = require('./authRouter')

module.exports = (app) => {
  app.use(bodyParser.json())

  const passport = setupPassport(app)
  app.use('/bullets', bulletRouter)
  app.use('/topics', topicRouter)
  app.use('/', authRouter)

  app.use('/static', static('./public'))
  
  app.get('/', (req, res) => {
    res.render('index.pug', {NODE_ENV: process.env.NODE_ENV})
    console.log(req.body)
    console.log(req.path)
  })
}
