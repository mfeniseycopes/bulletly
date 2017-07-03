const express = require('express')
const Sequelize = require('sequelize')

const app = express()
const sequelize = new Sequelize('bullet_journal_dev', '', '', {
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  }
})

sequelize.authenticate()
  .then(() => console.log('Connected to db'))
  .catch((e) => console.log('Failed to connect to db: ', e))










app.get('*', (req, res) => {
  res.status(200).send({
    message: 'Everything is a success!',
  })  
})

app.listen(3000, () => console.log("---Server listening on port 3000"))
