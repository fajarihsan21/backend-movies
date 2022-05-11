const models = require('../models/muser')
const response = require('../helpers/responses')
const {hashPasswords} = require('../helpers/hash')
const cuser = {}

cuser.getAll = async (req, res) => {
    try {
        const data = await models.getData()
        if (!data.length) {
            return response(res, 404, 'Data tidak ditemukan')
        } else {
            return response(res, 200, data)
        }
    } catch (error) {
        return response(res, 400, error)
    }
}

cuser.Create = async (req, res) => {
    try {
        const {username, password, id_role} = req.body
        const hashPassword = await hashPasswords(password)
        const data = await models.addData({username, hashPassword, id_role})
        return response(res, 200, data)
    } catch (error) {
        console.log(error)
        return response(res, 400, error)
    }
}

cuser.Delete = async (req, res) => {
    try {
        const {id_user} = req.query
        const data = await models.delData(id_user)
        if (data.length < 1) {
            return response(res, 404, 'Data not found')
        }
        return response(res, 200, data)
    } catch (error) {
        return response(res, 400, error)
    }
}

module.exports = cuser