const taskRouter = require('express').Router()
const db = require('../models')

taskRouter.all('/', (req, res, next) => {
  res.contentType('application/json')
  next()
})

taskRouter.get('/', (req, res) => {
  db.models.Task
    .findAll()
    .then(
      tasks => 
        res
          .status(200)
          .send(tasks.map(task => task.toJSON())),
      err => 
        res
          .status(500)
          .send(err))
})

module.exports = taskRouter
