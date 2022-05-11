const db = require('../config/db')
const format = require('pg-format')
const models = {} 

// Select table:
// SELECT id_movie, movie_name, category, director, "cast", release_date, duration FROM public.tb_movies;
models.getData = async function () {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM public.tb_movies ORDER BY id_movie DESC')
        .then(data =>{
            resolve(data.rows)
        }).catch(err => {
            reject(err)
        })
    })
}

models.getAll = async ({page, limit, order}) => {
    try {
        let query = format('SELECT * FROM tb_movies')

        if (order) {
            query = format(query + ' ORDER BY id_movie %s', order)
        }

        if (page && limit) {
            const offset = (page - 1) * limit
            query = format(query + ' LIMIT %s OFFSET %s', limit, offset)
        }

        const { rows } = await db.query('SELECT COUNT(id_movie) as "count" FROM public.tb_movies')
        console.log(rows)
        const counts = rows[0].count

        if (order === undefined) {
            order = 'desc'
        }

        const meta = {
            next: page == Math.ceil(counts / limit) ? null : `/api/v1/movies/all?order=${order}&page=${Number(page) + 1}&limit=${limit}`,
            prev: page == 1 ? null : `/api/v1/movies/all?order=${order}&page=${Number(page) - 1}&limit=${limit}`,
            counts,
        }

        const mov = await db.query(query)
        return {data: mov.rows, meta}
    } catch (err) {
        console.log(err)
    }
}

// Insert into table:
models.addData = function ({movie_name, category, director, cast, release_date, duration, image}) {
    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO public.tb_movies (movie_name, category, director, "cast", release_date, duration, image) VALUES($1, $2, $3, $4, $5, $6, $7)`, [
            movie_name, 
            category, 
            director, 
            cast, 
            release_date, 
            duration,
            image
        ])
        .then(() => {
            resolve('Data Saved')
        })
        .catch((err) => {
            console.log(err)
            reject(err)
        })
    })
}

// Update from table
models.updateData = function({id_movie, movie_name, category, director, cast, release_date, duration, image}) {
    return new Promise((resolve, reject) => {
        db.query('UPDATE public.tb_movies SET movie_name=$2, category=$3, director=$4, "cast"=$5, release_date=$6, duration=$7, image=$8 WHERE id_movie=$1', [
            id_movie,
            movie_name, 
            category, 
            director, 
            cast, 
            release_date, 
            duration,
            image
        ])
        .then(() => {
            resolve('Data has been updated')
        })
        .catch((err) => {
            console.log(err);
            reject(err)
        })
    })
}

// Delete from table
// DELETE FROM public.tb_movies WHERE id_movie=nextval('tb_movies_id_movie_seq'::regclass);
models.delData = function(id_movie) {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM public.tb_movies WHERE id_movie= $1', [id_movie])
        .then(() => {
            resolve('Data has been deleteded')
        })
        .catch((err) => {
            reject(err)
        })
    })
}

// Search by name
models.getName = function(movie_name) {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM public.tb_movies m WHERE m.movie_name like $1', [
            movie_name
        ])
        .then((data) => {
            resolve(data.rows)
        })
        .catch((err) => {
            reject(err)
        })
    })
}

// Sort by name
models.sortName = function() {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM public.tb_movies ORDER BY movie_name ASC')
        .then((data) =>{
            resolve(data.rows)
        })
        .catch((err) => {
            reject(err)
        })
    })
}

// Sort by release date
models.sortByRelease = function() {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM public.tb_movies ORDER BY release_date DESC')
            .then((data) => {
                resolve(data.rows)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

module.exports = models