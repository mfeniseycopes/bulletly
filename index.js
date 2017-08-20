const express = require('express')
const bodyParser = require('body-parser')

const app = express()

const bulletRouter = require('./routes/bulletRouter')
const topicRouter = require('./routes/topicRouter')

app.use(bodyParser.json())
app.use('/bullets', bulletRouter)
app.use('/topics', topicRouter)

app.get('*', (req, res) => {
  res.status(200).send({
    message: 'Everything is a success!',
  })
})

const startServer = () => 
  app.listen(3000, () => 
    console.log("---Server listening on port 3000"))

startServer()
