const express = require('express')
const app = express()

const db = require('./models')

db.sync().then(() => {

  app.get('*', (req, res) => {
    res.status(200).send({
      message: 'Everything is a success!',
    })
  })

  app.listen(3000, () => console.log("---Server listening on port 3000"))
})
