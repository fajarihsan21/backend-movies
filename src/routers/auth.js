const express = require('express')
const routers = express.Router()
const ctrl = require('../controllers/cauth')

routers.post('/', ctrl.Login)

module.exports = routers