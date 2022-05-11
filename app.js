require('dotenv').config()
const express = require('express')
const route = require('./src/routers')
const db = require('./src/config/db')
const cors = require('cors')

const server = express()
const PORT = 8080

// const whitelist = ['http://localhost:8080', 'http://localhost:3000']
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }

server.use(express.urlencoded({extended: false}))
server.use(express.json())
server.use(cors())
server.use('/public', express.static('public'))
server.use('/api/v1', route)

db.connect().then(() => {
    console.log('Database connected')
    server.listen(PORT, () => {
        console.log(`Service run on port ${PORT}`);
    })
}).catch(er => {
    console.log(er)
})