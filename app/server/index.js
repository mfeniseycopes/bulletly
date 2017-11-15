const setupRoutes = require('./routes')
const app = require('express')()
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')

app.use(morgan('tiny'))
app.use(cookieParser())
app.use(expressSession({
  secret: 'secret',
  resave: false,
  saveUninitialized:false,
}));

setupRoutes(app)

const startServer = () =>
  app.listen(process.env.PORT || 5000, () =>
    console.log("---Server listening on port 5000"))

startServer()
