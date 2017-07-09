const taskRouter = require('express').Router()
const db = require('../models')

const packTask = res => task => 
  task ? 
    res
    .status(200)
    .send(task.toJSON()) :
    res
    .sendStatus(404)

const packTasks = res => tasks =>
  res
  .status(200)
  .send(tasks.map(t => t.toJSON()))

const crudError = res => err =>
  res
  .status(421)
  .send(err.text)

const otherError = res => err =>
  res
  .sendStatus(500)

taskRouter.all('/', (req, res, next) => {
  res.contentType('application/json')
  next()
})

taskRouter.get('/', (req, res) => {
  db.models.Task
    .findAll()
    .then(packTasks(res))
    .catch(otherError(res))
})

taskRouter.get('/:id', (req, res) => {
  db.models.Task
    .findById(req.params.id)
    .then(packTask(res))
    .catch(otherError(res))
})

taskRouter.post('/', (req, res) => {
  db.models.Task
    .create(req.body.task)
    .then(packTask(res))
    .catch(crudError(res))
})

taskRouter.put('/:id', (req, res) => {
  db.models.Task
    .findById(req.params.id)
    .then(task => task.update(req.body.task))
    .then(packTask(res))
    .catch(crudError(res))
})

taskRouter.delete('/:id', (req, res) => {
  db.models.Task
    .findById(req.params.id)
    .then(
      task =>
        task ?
          task.destroy()
          .then(packTask(res)) :
          res.sendStatus(404))
})

module.exports = taskRouter
