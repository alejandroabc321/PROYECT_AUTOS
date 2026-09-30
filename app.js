const express = require('express')
const marca_routes = require('./routes/marca')
const auto_routes = require('./routes/auto')

const app = express()

// settings
app.set('port', process.env.PORT || 3000)

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// routes
app.use('/api/marcas', marca_routes)
app.use('/api/autos', auto_routes)

module.exports = app