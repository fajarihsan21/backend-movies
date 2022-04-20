const models = require('../models/mmovies')
const response = require('../helpers/responses')
const cmovies = {}

cmovies.getAll = async (req, res) => {
    try {
        const data = await models.getData()
        return response(res, 200, data)
    } catch (error) {
        return response(res, 400, error)
    }
}

cmovies.Create = async (req, res) => {
    try {
        const {movie_name,
            category, 
            director,
            cast,
            release_date,
            duration} = req.body
        const data = await models.addData({
            movie_name,
            category,
            director,
            cast,
            release_date,
            duration
        })
        return response(res, 200, data)
    } catch (error) {
        return response(res, 400, error)
    }
}

cmovies.Update = async (req, res) => {
    try {
        const {movie_name,
            category, 
            director,
            cast,
            release_date,
            duration} = req.body
        const data = await models.updateData(
            movie_name,
            category,
            director,
            cast,
            release_date,
            duration
        )
        return response(res, 200, data)
    } catch (error) {
        console.log(error)
        return response(res, 400, error)
    }
}

cmovies.Delete = async (req, res) => {
    try {
        const {id_movie} = req.query
        const data = await models.delData(id_movie)
        return response(res, 200, data)
    } catch (error) {
        return response(res, 400, error)
    }
}

cmovies.getName = async (req, res) => {
    try {
        const {movie_name} = req.body
        const data = await models.getName(movie_name)
        return response(res, 200, data)
    } catch (error) {
        return response(res, 400, error)
    }
}

cmovies.sortName = async (req, res) => {
    try {
        const data = await models.sortName()
        return response(res, 200, data)
    } catch (error) {
        return response(res, 400, error)
    }
}

cmovies.sortByRelease = async (req, res) => {
    try {
        const data = await models.sortByRelease()
        return response(res, 200, data)
    } catch (error) {
        return response(res, 400, error)
    }
}

module.exports = cmovies