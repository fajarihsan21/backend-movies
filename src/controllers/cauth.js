const models = require('../models/muser')
const response = require('../helpers/responses')
const bycrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const auth = {}

function genToken (username, id_role) {
    const payload = {
        user : username,
        role : id_role
    }

    const token = jwt.sign(payload, process.env.JWT_KEYS, {expiresIn: '50d'})

    return {
        token,
        message: 'Token berhasil dibuat'
    }
}

auth.Login = async (req, res) => {
    try {
        const password_db = await models.getByUsername(req.body.username)
        if (password_db.length <= 0) {
            return response(res, 404, 'Username not registered')
        }

        const password_user = req.body.password
        const check = await bycrypt.compare(password_user, password_db[0].password)
        // const {username, id_role} = password_db[0]

        if (check) {
            const token = genToken(req.body.username)
            return response(res, 200, token)
        } else {
            return response(res, 401, 'Wrong password')
        }
        
    } catch (error) {
        console.log(error)
    }
}

module.exports = auth