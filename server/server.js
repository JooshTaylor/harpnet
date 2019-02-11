const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const knex = require('knex')
const helmet = require('helmet')
const compression = require('compression')
const { authenticator } = require('./services/authorization')
const keys = require('./config/keys')
const authRoutes = require('./routes/authRoutes')
const profileRoutes = require('./routes/profileRoutes')
const postRoutes = require('./routes/postRoutes')
const followsRoutes = require('./routes/followsRoutes')
const searchRoutes = require('./routes/searchRoutes')

// Setting up express server
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(helmet())
app.use(compression())

// Using the knex library to connect our Postgres database to the server
const db = knex({
  client: 'pg',
  connection: {
    host: keys.pgHost,
    user: keys.pgUser,
    password: keys.pgPassword,
    database: keys.pgDatabase
  }
})

// Testing route
app.get('/', (req, res) => {
  res.json('Working')
})

// Actual routes
authRoutes(app, db, authenticator)
profileRoutes(app, db, authenticator)
followsRoutes(app, db, authenticator)
postRoutes(app, db, authenticator)
searchRoutes(app, db, authenticator)

// Activates the server
const port = process.env.PORT || 5000
app.listen(port, console.log(`Server is running on port ${port}`))
