const express = require('express')
const bodyParser = require('body-parser')

const app = express()

const bulletRouter = require('./routes/bulletRouter')
const topicRouter = require('./routes/topicRouter')
const setupPassport = require('./config/passport')

app.use(bodyParser.json())
app.use('/bullets', bulletRouter)
app.use('/topics', topicRouter)
app.use('/static', express.static('./public'))
setupPassport(app)

app.get('/', (req, res) => {
  res.render('index.pug', {NODE_ENV: process.env.NODE_ENV})
  console.log(req.body)
  console.log(req.path)
})

const startServer = () =>
  app.listen(process.env.PORT || 5000, () =>
    console.log("---Server listening on port 5000"))

startServer()
