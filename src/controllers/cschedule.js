const models = require('../models/mschedule')
const response = require('../helpers/responses')
const cschedule = {}

cschedule.getAll = async (req, res) => {
    try {
        const data = await models.getData()
        return response(res, 200, data)
    } catch (error) {
        return response(res, 400, error)
    }
}

cschedule.Create = async (req, res) => {
    try {
        const {movie, 
            location, 
            price, 
            date_start, 
            date_end, 
            premiere, 
            time} = req.body
        const data = await models.addData({movie, 
            location, 
            price, 
            date_start, 
            date_end, 
            premiere, 
            time})
        return response(res, 200, data)
    } catch (error) {
        return response(res, 400, error)
    }
}

cschedule.Update = async (req, res) => {
    try {
        const {movie, 
            location, 
            price, 
            date_start, 
            date_end, 
            premiere, 
            time} = req.body
        const data = await models.updateData({movie, 
            location, 
            price, 
            date_start, 
            date_end, 
            premiere, 
            time})
        return response(res, 200, data)
    } catch (error) {
        console.log(error)
        return response(res, 400, error)
    }
}

cschedule.Delete = async (req, res) => {
    try {
        const {id_schedule} = req.query
        const data = await models.delData(id_schedule)
        return response(res, 200, data)
    } catch (error) {
        return response(res, 400, error)
    }
}

module.exports = cschedule