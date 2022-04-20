const db = require('../config/db')
const models = {}

// Select table:
// SELECT id_movie, movie_name, category, director, "cast", release_date, duration FROM public.tb_movies;
models.getData = async function () {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM public.tb_movies ORDER BY id_movie ASC')
        .then(data =>{
            resolve(data.rows)
        }).catch(err => {
            reject(err)
        })
    })
}

// Insert into table:
// INSERT INTO public.tb_movies (movie_name, category, director, "cast", release_date, duration) VALUES('', '', '', '', '', '');
models.addData = function ({movie_name, category, director, cast, release_date, duration}) {
    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO public.tb_movies (movie_name, category, director, "cast", release_date, duration) VALUES($1, $2, $3, $4, $5, $6)`, [
            movie_name, 
            category, 
            director, 
            cast, 
            release_date, 
            duration
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
// UPDATE public.tb_movies SET movie_name='', category='', director='', "cast"='', release_date='', duration='' WHERE id_movie=nextval('tb_movies_id_movie_seq'::regclass);
models.updateData = function({id_movie, movie_name, category, director, cast, release_date, duration}) {
    return new Promise((resolve, reject) => {
        db.query('UPDATE public.tb_movies SET movie_name=$2, category=$3, director=$4, "cast"=$5, release_date=$6, duration=$7 WHERE id_movie=$1', [
            id_movie,
            movie_name, 
            category, 
            director, 
            cast, 
            release_date, 
            duration
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