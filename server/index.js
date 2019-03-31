'use strict'

const express = require('express')
const helmet = require('helmet')
const bodyParser = require('body-parser')

const isOnline = require('is-online')
const wifi = require('node-wifi')
const mongoClient = require('mongodb').MongoClient

const path = require('path')
const app = express()
let db = null

// Init the wifi module
wifi.init({
  // network interface, choose a random wifi interface if set to null
  iface : null
})

// Setup Security middleware
app.use(helmet())

// Serve static files
app.use(express.static(path.join(__dirname, '..', 'public')))

// Parse Post data
app.use(bodyParser.json())


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

app.get('/pump', (req, res) => {
  const id = req.body.pump

})

// Start a pump by id
app.post('/startPump', (req, res) => {
  const pump = req.body.pump

  console.log('Turning on pump ' + id_of(pump))
  const result = turn_on(power_to(pump))

  res.send({ pump })
})

// Stop a pump by id
app.post('/stopPump', (req, res) => {
  const pump = req.body.pump

  console.log('Turning off pump ' + id_of(pump))
  const result = turn_off(power_to(pump))

  res.send({ pump })
})


mongoClient.connect('link-to-mongodb', (err, client) => {
  if (err) return console.error(err)

  db = client.db('device')

  // Run the device server
  app.listen(3000, () => console.log('MrBartender listening on port 3000!'))
  
  // Cleanup GPIO resources on server close
  // process.on('exit', () => {
  //   console.log('Exiting MrBartender, happy drinking!')
  //   for (let i = 1; i <= 12; i++) {
  //     pumps[i.toString()].unexport()
  //   }
  // })
})