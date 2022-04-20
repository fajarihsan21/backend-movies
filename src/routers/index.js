const express = require('express')
const routers = express.Router()

const movies = require('./movies')
const schedule = require('./schedule')
const booking = require('./booking')

routers.use('/movies', movies)
routers.use('/schedule', schedule)
routers.use('/booking', booking)

module.exports = routers