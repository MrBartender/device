'use strict'

const express = require('express')
const helmet = require('helmet')
const bodyParser = require('body-parser')

const isOnline = require('is-online')
const wifi = require('node-wifi')

const path = require('path')
const app = express()
const AWS = require('aws-sdk')

import Amplify, { API, graphqlOperation } from 'aws-amplify'
import { updatePourCode } from './graphql'
import { pumps, pour } from '@/data/pumps'

const device_id = "ea9f0cd1-aaff-4bb4-a7a2-d561d495b2a3"

var credentials = new AWS.SharedIniFileCredentials({profile: 'prototype'})
AWS.config.credentials = credentials
AWS.config.update({region: 'us-east-1'})

var sqs = new AWS.SQS({apiVersion: '2012-11-05'})
var queue_url = 'https://sqs.us-east-1.amazonaws.com/996076014670/TestQueue'

var amplifyConfig = {
    'aws_appsync_graphqlEndpoint': 'https://vavmylvolzhqvmrotqcaleapra.appsync-api.us-east-1.amazonaws.com/graphql',
    'aws_appsync_region': 'us-east-1',
    'aws_appsync_authenticationType': 'API_KEY',
    'aws_appsync_apiKey': 'da2-rfinu4opufexzbxykzg62wajoe',
}
Amplify.configure(amplifyConfig)


// Init the wifi module
wifi.init({
  // network interface, choose a random wifi interface if set to null
  iface : null
})

// Setup Security middleware
app.use(helmet())

// Serve static files
/// #if DEV
  app.use(express.static(path.resolve('./public')))
/// #else
  app.use(express.static(path.resolve(__dirname, 'home/kiosk-user/mrbartender/public')))
/// #endif

// Parse Post data
app.use(bodyParser.json())

// handle base route - interrupt if no internet connection
app.get('/', (req, res) => {
  /// #if DEV
    res.sendFile('index.html', { root: './public/build' })
  /// #else
    res.sendFile(path.resolve(__dirname, 'home/kiosk-user/mrbartender/public/index.html'))
  /// #endif
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

app.post('/order/pour', async (req, res) => {
  let timings = req.body.timings
  pour(timings).then((response) => {
    res.send({ status:'success' })
  })
})

app.post('/code', async (req, res) => {
  let code = req.body.code
  console.log(code)
  API.graphql(graphqlOperation(updatePourCode, {input: {id: device_id, pourCode: code}}))
    .then(response => {
      // console.log(response)
      res.send({ code: response.data.updateDevice.pourCode })
    })
    .catch(error => {
      console.error(error)
    })
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

app.get('/recipes', (req, res) => {
  //TODO: 
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
