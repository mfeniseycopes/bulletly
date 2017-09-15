const destroy = () => record => 
  record
    .destroy()
    .then(() => record)

const toJSON = record =>
  record.toJSON()

const update = values => record => record.update(values)

module.exports = { destroy, toJSON, update }
