const express = require('express')
const routers = express.Router()
const ctrl = require('../controllers/cmovies')

routers.get('/', ctrl.getAll)
routers.get('/name', ctrl.getName)
routers.get('/sort/name', ctrl.sortName)
routers.get('/sort/release', ctrl.sortByRelease)
routers.post('/', ctrl.Create)
routers.delete('/', ctrl.Delete)
routers.put('/', ctrl.Update)

module.exports = routers