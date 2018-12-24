'use strict'

const express = require('express')
const helmet = require('helmet')
const helpers = require('./helpers')
const app = express()

// Setup Security middleware
app.use(helmet())

// handle base route - interrupt if no internet connection
app.get('/', (req, res) => {
  helpers.checkValidInternetConnection()
    .then(() => {
      res.send('Valid Connection!')
    })
    .catch((err) => {
      console.log(err)
      res.send('No Internet Connection!')
    })
})

// Run the device server
app.listen(3000, () => console.log(`MrBartender listening on port ${port}!`))
