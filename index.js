'use strict'

const express = require('express')
const helmet = require('helmet')
const isOnline = require('is-online')
const wifi = require('node-wifi')
const path = require('path')
const app = express()

// Init the wifi module
wifi.init({
  // network interface, choose a random wifi interface if set to null
  iface : null
})

// Setup Security middleware
app.use(helmet())

// Serve static files
app.use(express.static(path.join(__dirname, 'public')))

// handle base route - interrupt if no internet connection
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

// get internet status
app.get('/check-online', async (req, res) => {
  res.send({
    'online': await isOnline({ timeout: 4000 })
  })
})

app.get('/scan', (req, res) => {
  wifi.scan()
    .then((networks) => {
      res.send(networks)
    })
    .catch((err) => {
      console.log(err)
      res.send(err)
    })
})

// Run the device server
app.listen(3000, () => console.log(`MrBartender listening on port 3000!`))
