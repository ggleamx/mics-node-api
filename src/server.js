const express = require('express')
const cors = require('cors')
const FirestoreProvider = require('./config/firestore')
const session = require('express-session');

class Server {
  constructor() {
    this.config()
    this.middlewares()
    this.routes()
    this.providers()

  }

  config() {
    this.app = express()
    this.port = process.env.PORT
    this.authPath = '/api/auth'
  }

  middlewares() {
    this.app.use(cors())
    this.app.use(express.json())
    this.app.use(express.static('public'))
    this.app.use(session({
      secret: 'secret',
      resave: false,
      saveUninitialized: true
    }))
  }

  routes() {
    this.app.use(this.authPath, require('./routes/auth.routes'))
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('~ Server on port ', this.port)
    })
  }

  providers() {
    const firestoreProvider = FirestoreProvider.getInstance()
    firestoreProvider.init()
  }
}

module.exports = Server
