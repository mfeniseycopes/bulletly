const Sequelize = require('sequelize')

const db = new Sequelize('bullet_journal_dev', '', '', {
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  }
})

db.authenticate()
  .then(() => console.log('Connected to db'))
  .catch((e) => console.log('Failed to connect to db: ', e))

db.import('./note.js')

module.exports = db
