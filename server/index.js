'use strict'

const express = require('express')
const helmet = require('helmet')
const bodyParser = require('body-parser')

// const gpio = require('onoff').Gpio
const isOnline = require('is-online')
const wifi = require('node-wifi')

const path = require('path')
const app = express()

// Initialize pumps
let nums = [ 2, 3, 4, 5, 6, 13, 14, 15, 17, 18, 19, 26 ]

let pumps = {
  // '1': new gpio(26, 'high'),
  // '2': new gpio(19, 'high'),
  // '3': new gpio(13, 'high'),
  // '4': new gpio(6, 'high'),
  // '5': new gpio(5, 'high'),
  // '6': new gpio(2, 'high'),
  // '7': new gpio(3, 'high'),
  // '8': new gpio(4, 'high'),
  // '9': new gpio(17, 'high'),
  // '10': new gpio(14, 'high'),
  // '11': new gpio(15, 'high'),
  // '12': new gpio(18, 'high')
}

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

// Start a pump by id
app.post('/startPump', (req, res) => {
  let pump_id = (req.body.id).toString()

  console.log('Turning on pump ' + pump_id)
  pumps[pump_id].writeSync(0)

  res.send({
    pump: {
      id: pump_id,
      status: pumps[pump_id].readSync()
    }
  })
})

// Stop a pump by id
app.post('/stopPump', (req, res) => {
  let pump_id = (req.body.id).toString()
  
  console.log('Turning off pump ' + pump_id)
  pumps[pump_id].writeSync(1)

  res.send({
    pump: {
      id: pump_id,
      status: pumps[pump_id].readSync()
    }
  })
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
