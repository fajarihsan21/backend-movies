const express = require('express')
const routers = express.Router()
const ctrl = require('../controllers/cbooking')

routers.get('/', ctrl.getAll)
routers.post('/', ctrl.Create)
routers.put('/', ctrl.Update)
routers.delete('/', ctrl.Delete)

module.exports = routers