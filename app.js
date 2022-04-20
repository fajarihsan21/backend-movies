require('dotenv').config()
const express = require('express')
const route = require('./src/routers')
const db = require('./src/config/db')
const cors = require('cors')

const server = express()
const PORT = 8080

server.use(express.urlencoded({extended: false}))
server.use(express.json())
server.use(cors())
server.use('/api/v1', route)

db.connect().then(() => {
    console.log('Database connected')
    server.listen(PORT, () => {
        console.log(`Service run on port ${PORT}`);
    })
}).catch(er => {
    console.log(er)
})