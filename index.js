const express = require('express')
const bodyParser = require('body-parser')

const app = express()

const bulletRouter = require('./routes/bulletRouter.js')

app.use(bodyParser.json())
app.use('/bullets', bulletRouter)

app.get('*', (req, res) => {
  res.status(200).send({
    message: 'Everything is a success!',
  })
})

const startServer = () => 
  app.listen(3000, () => 
    console.log("---Server listening on port 3000"))

startServer()
