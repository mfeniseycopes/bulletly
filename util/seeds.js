const db = require('../models')

const insert = () => {

  db.models.Bullet.create({
    type: 'note',
    title: 'note1',
    body: 'here\'s the body',
    body_type: 'markdown',
  })

}

db.authenticate()
  .then(() => console.log("---> Connected to DB"))
  .then(() => {
    console.log('---> Syncing')
    return db.sync({force: true}) })
  .then(() => console.log('---> Synced'))
  .then(insert)
  .catch((e) => console.log("--->", e))
