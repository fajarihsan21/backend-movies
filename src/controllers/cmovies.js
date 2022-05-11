const models = require('../models/mmovies')
const response = require('../helpers/responses')
const cmovies = {}

cmovies.gets = async (req, res) => {
    try {
        const data = await models.getData()
        if (!data.length) {
            return response(res, 404, 'Data tidak ditemukan')
        } else {
            return response(res, 200, data)
        }
    } catch (error) {
        return response(res, 500, error)
    }
}

// Pagination : http://localhost:8080/api/v1/movies/all?order=desc&page=1&limit=1
cmovies.getAll = async (req, res) => {
     try {
        const query = {
            page: req.query.page || 1,
            limit: req.query.limit || 5,
            order: req.query.order,
        }
        const {data, meta} = await models.getAll(query)
        return response(res, 200, data, meta)
    } catch (error) {
        return response(res, 500, error)
    }
}

cmovies.Create = async (req, res) => {
    try {
        let image = ''
        if (req.file !== undefined) {
            image = req.file.path
        }
        const {movie_name,
            category, 
            director,
            cast,
            release_date,
            duration
            } = req.body
        const data = await models.addData({
            movie_name,
            category,
            director,
            cast,
            release_date,
            duration,
            image
        })
        return response(res, 200, data)
    } catch (error) {
        console.log(error);
        return response(res, 400, error)
    }  
}

cmovies.Update = async (req, res) => {
    try {
        const {id_movie} = req.params
        const {movie_name,
            category, 
            director,
            cast,
            release_date,
            duration,
            image} = req.body
        const data = await models.updateData(
            id_movie,
            movie_name,
            category,
            director,
            cast,
            release_date,
            duration,
            image
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