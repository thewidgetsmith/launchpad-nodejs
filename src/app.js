'use strict'

require('dotenv').config()

const path = require('path')
const express = require('express')

// Constants
const HOST = '0.0.0.0'

// App
const app = express()
const port = process.env.PORT || 3000

app.get('/', (_, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', '/index.html'))
})

app.listen(port, HOST)
console.log(`Running on http://${HOST}:${port}`)
