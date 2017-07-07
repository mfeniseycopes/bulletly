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

taskRouter.post('/', (req, res) => {
  db.models.Task
    .create(req.body.task)
    .then(
      task => 
        res
          .status(200)
          .send(task.toJSON()),
      err =>
        res
          .status(500)
          .send(err))
})

taskRouter.put('/:id', (req, res) => {
  db.models.Task
    .findById(req.params.id)
    .then(
      task => 
        task
          .update(req.body.task),
      err => 
        res
          .status(404)
          .send("The requested resource could not be found"))
    .then(
      task =>
        res
          .status(200)
          .send(task.toJSON()),
      err =>
        res
          .status(421)
          .send(err))
})

taskRouter.delete('/:id', (req, res) => {
  db.models.Task
    .findById(req.params.id)
    .then(
      task =>
        task.destroy()
        .then(
          () => 
          res
            .status(200)
            .send(task.toJSON()),
          err =>
            res
              .status(421)
              .send(err)),
      err => 
        res
          .status(404)
          .send("The requested resource could not be found"))
})


module.exports = taskRouter
