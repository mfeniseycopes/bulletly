const setupRoutes = require('./routes')
const app = require('express')()

setupRoutes(app)

const startServer = () =>
  app.listen(process.env.PORT || 5000, () =>
    console.log("---Server listening on port 5000"))

startServer()
