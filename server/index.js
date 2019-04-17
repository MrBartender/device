'use strict'

const express = require('express')
const helmet = require('helmet')
const bodyParser = require('body-parser')

// const gpio = require('onoff').Gpio
const isOnline = require('is-online')
const wifi = require('node-wifi')

const path = require('path')
const app = express()

import { pumps } from '@/data/pumps'
console.log(process.env.NODE_ENV) 

// Init the wifi module
wifi.init({
  // network interface, choose a random wifi interface if set to null
  iface : null
})

// Setup Security middleware
app.use(helmet())

// Serve static files
app.use(express.static(path.resolve('./public')))

// Parse Post data
app.use(bodyParser.json())

// handle base route - interrupt if no internet connection
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: './public' })
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

// Get a pump by id
app.get('/pump', (req, res) => {
  const id = req.body.id
  res.send({pump: pumps[id]})
})

// Start a pump by id
app.post('/startPump', (req, res) => {
  let id = req.body.id
  const pump = pumps[id]
  console.log('Turning on pump ' + pump.id)
  const result = pump.start()
  res.send({ pump })
})

// Stop a pump by id
app.post('/stopPump', (req, res) => {
  let id = req.body.id
  const pump = pumps[id]
  console.log('Turning off pump ' + pump.id)
  const result = pump.stop()
  res.send({ pump })
})

// Run the device server
app.listen(3000, () => console.log('MrBartender listening on port 3000!'))

// Cleanup GPIO resources on server close
process.on('exit', () => {
  console.log('Exiting MrBartender, happy drinking!')
  for (let i = 1; i <= 12; i++) {
    pumps[i.toString()].unexport()
  }
})
