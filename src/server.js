const express = require('express')
const cors = require('cors')

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
  }
}

module.exports = Server
