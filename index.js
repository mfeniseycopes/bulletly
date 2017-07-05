const express = require('express')
const app = express()

const db = require('./models')

app.get('*', (req, res) => {
  res.status(200).send({
    message: 'Everything is a success!',
  })
})

const startServer = () => 
  app.listen(3000, () => 
    console.log("---Server listening on port 3000"))

db.sync().then(startServer)
