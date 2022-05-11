const express = require('express')
const routers = express.Router()

const movies = require('./movies')
const schedule = require('./schedule')
const booking = require('./booking')
const user = require('./user')
const auth = require('./auth')

// http://localhost:8080/api/v1/

routers.use('/movies', movies)
routers.use('/schedule', schedule)
routers.use('/booking', booking)
routers.use('/user', user)
routers.use('/auth', auth)

module.exports = routers