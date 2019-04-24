'use strict'

const express = require('express')
const helmet = require('helmet')
const bodyParser = require('body-parser')

const isOnline = require('is-online')
const wifi = require('node-wifi')

const path = require('path')
const app = express()
const AWS = require('aws-sdk')

import { pumps } from '@/data/pumps'

var credentials = new AWS.SharedIniFileCredentials({profile: 'prototype'})
AWS.config.credentials = credentials
AWS.config.update({region: 'us-east-1'})

var sqs = new AWS.SQS({apiVersion: '2012-11-05'})
var queue_url = 'https://sqs.us-east-1.amazonaws.com/996076014670/TestQueue'

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

// pop next order message from sqs queue
app.get('/queue/next', (req, res) => {
  var params = {
    AttributeNames: [
        "SentTimestamp"
    ],
    MaxNumberOfMessages: 1,
    MessageAttributeNames: [
        ".*" //get all attributes
    ],
    QueueUrl: queue_url,
    VisibilityTimeout: 20,
    WaitTimeSeconds: 3
  }
  sqs.receiveMessage(params, function(err, data) {
    if (err) {
      console.log("Receive Error", err)
      res.send(false)
    } else if (data.Messages) {
      
      var message = data.Messages[0]
      console.log("Message retrieved", data.Messages[0].MessageId)
      res.send({ order_id: message.Body })

      var deleteParams = {
        QueueUrl: queue_url,
        ReceiptHandle: data.Messages[0].ReceiptHandle
      }
      sqs.deleteMessage(deleteParams, function(err, data) {
        if (err) {
          console.log("Delete Error", err)
        } else {
          console.log("Message Deleted", data)
        }
      })
    } else {
      res.send(false)
    }
  })
})

app.post('/order', (req, res) => {
  let order_id = req.body.order_id
  console.log('retrieving order', order_id)
  // TODO: API call goes here
  res.send({ pumps: [{id:1, ms:2000},{id:2, ms:2000}] }) // for testing
})

// Get a pump by id
app.get('/pump', (req, res) => {
  let id = req.body.id
  res.send({ pump: pumps[id-1] })
})

// Start a pump by id
app.post('/startPump', (req, res) => {
  let id = req.body.id
  const pump = pumps[id-1]
  console.log('Turning on pump ' + pump.id)
  const result = pump.start()
  res.send({ pump })
})

// Stop a pump by id
app.post('/stopPump', (req, res) => {
  let id = req.body.id
  const pump = pumps[id-1]
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
