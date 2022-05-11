const express = require('express')
const routers = express.Router()
const ctrl = require('../controllers/cuser')

routers.get('/', ctrl.getAll)
routers.post('/', ctrl.Create)
routers.delete('/', ctrl.Delete)

module.exports = routers