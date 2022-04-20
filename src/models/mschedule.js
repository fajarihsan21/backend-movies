const db = require('../config/db')
const models = {}

// Select table
models.getData = async function () {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM public.tb_schedule ORDER BY id_schedule ASC')
        .then(data =>{
            resolve(data.rows)
        }).catch(err => {
            reject(err)
        })
    })
}

// Insert to table
// INSERT INTO public.tb_schedule (movie, "location", price, date_start, date_end, premiere, "time") VALUES('', '', '', '', '', '', '');
models.addData = function ({movie, location, price, date_start, date_end, premiere, time}) {
    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO public.tb_schedule (movie, "location", price, date_start, date_end, premiere, "time") VALUES($1, $2, $3, $4, $5, $6, $7)`, [
            movie, location, price, date_start, date_end, premiere, time
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

// Update to table
// UPDATE public.tb_schedule SET movie='', "location"='', price='', date_start='', date_end='', premiere='', "time"='' WHERE id_schedule=nextval('tb_schedule_id_schedule_seq'::regclass);
models.updateData = function({id_schedule, movie, location, price, date_start, date_end, premiere, time}) {
    return new Promise((resolve, reject) => {
        db.query('UPDATE public.tb_schedule SET movie=$2, "location"=$3, price=$4, date_start=$5, date_end=$6, premiere=$7, "time"=$8 WHERE id_schedule=$1', [
            id_schedule, movie, location, price, date_start, date_end, premiere, time
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
models.delData = function(id_schedule) {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM public.tb_schedule WHERE id_schedule= $1', [id_schedule])
        .then(() => {
            resolve('Data has been deleteded')
        })
        .catch((err) => {
            reject(err)
        })
    })
}

module.exports = models