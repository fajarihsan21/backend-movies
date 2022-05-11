const express = require('express')
const routers = express.Router()
const ctrl = require('../controllers/cmovies')
const validate = require('../middleware/validate')
const upload = require('../middleware/upload')

routers.get('/', ctrl.gets)
routers.get('/all', ctrl.getAll)
routers.get('/name', ctrl.getName)
routers.get('/sort/name', ctrl.sortName)
routers.get('/sort/release', ctrl.sortByRelease)
routers.post('/', upload.single('images'), ctrl.Create)
routers.put('/',  upload.single('images'), ctrl.Update)
routers.delete('/', ctrl.Delete)

module.exports = routers