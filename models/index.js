const Sequelize = require('sequelize')
console.log('----> DB CONNECTION')
const db = new Sequelize('bullet_journal_dev', '', '', {
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  }
})

// db.authenticate()
//   .then(() => console.log('Connected to db'))
//   .catch((e) => console.log('Failed to connect to db: ', e))

const Bullet = db.import('./bullet.js')
const Note = db.import('./note.js')
const Task = db.import('./task.js')
const Event = db.import('./event.js')

Bullet.associate(db)
Note.associate(db)
Task.associate(db)
Event.associate(db)

module.exports = db
