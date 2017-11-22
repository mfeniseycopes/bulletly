const { toJSON } = require('./pointfree')

const singleResponse = res => record => {
  record ?
    res
    .status(200)
    .send(toJSON(record)) :
    four04Response(res)()
}

const arrayResponse = res => records =>
  res
    .status(200)
    .send(records.map(toJSON))

const four04Response = res => () =>
  res
    .status(404)
    .send(["The requested resource could not be found"])

module.exports = { 
  singleResponse, 
  arrayResponse, 
  four04Response 
}
