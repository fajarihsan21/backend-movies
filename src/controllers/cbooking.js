const models = require('../models/mbooking')
const response = require('../helpers/responses')
const cbooking = {}

cbooking.getAll = async (req, res) => {
    try {
        const data = await models.getData()
        return response(res, 200, data)
    } catch (error) {
        return response(res, 400, error)
    }
}

cbooking.Create = async (req, res) => {
    try {
        const {movie, date, time, cinema, tickets, total} = req.body
        const data = await models.addData({movie, date, time, cinema, tickets, total})
        return response(res, 200, data)
    } catch (error) {
        return response(res, 400, error)
    }
}

cbooking.Update = async (req, res) => {
    try {
        const {movie, date, time, cinema, tickets, total} = req.body
        const data = await models.updateData({
            movie, date, time, cinema, tickets, total
        })
        return response(res, 200, data)
    } catch (error) {
        console.log(error)
        return response(res, 400, error)
    }
}

cbooking.Delete = async (req, res) => {
    try {
        const {id_booking} = req.query
        const data = await models.delData(id_booking)
        return response(res, 200, data)
    } catch (error) {
        return response(res, 400, error)
    }
}

module.exports = cbooking