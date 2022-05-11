const response = require('../helpers/responses')
const jwt = require('jsonwebtoken')

const validateToken = (req, res, next) => {
    const {auth_token} = req.headers
    
    if (!auth_token) {
        return response(res, 401, 'Silahkan login terlebih dahulu')
    } 
    jwt.verify(auth_token, process.env.JWT_KEYS, (err, decode) => {
        if (err) {
            return response(res, 401, err)
        }
        req.users = decode
        return next()
    })
}

// const validateToken = (role) => {
//     return function (req, res, next) {
//         const { auth_token } = req.headers
//         let isAccess = false

//         if (!auth_token) {
//             return response(res, 401, 'Silahkan login terlebih dahulu')
//         }

//         jwt.verify(auth_token, process.env.JWT_KEYS, (err, decode) => {
//             if (err) {
//                 return response(res, 401, err)
//             }

//             role.map((e) => {
//                 if (e == decode.role) {
//                     isAccess = true
//                 }
//             })

//             if (isAccess) {
//                 req.user = decode
//                 return next()
//             } else {
//                 return response(res, 403, 'Your not permitted to access')
//             }
//         })
//     }
// }

module.exports = validateToken