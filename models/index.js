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

const Note = db.import('./note.js')
const Bullet = db.import('./bullet.js')

debugger

Note.associate(db)
Bullet.associate(db)

console.log(db.Note)

module.exports = db
