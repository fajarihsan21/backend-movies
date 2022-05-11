const db = require('../config/db')
const models = {}

// Select table
models.getData = async function () {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM public.tb_booking ORDER BY id_booking ASC')
        .then(data =>{
            resolve(data.rows)
        }).catch(err => {
            reject(err)
        })
    })
}

// Insert into table
// INSERT INTO public.tb_booking (movie, "date", "time", cinema, tickets, total) VALUES('', '', '', '', '', '');
models.addData = function ({movie, date, time, cinema, tickets, total}) {
    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO public.tb_booking (movie, "date", "time", cinema, tickets, total) VALUES($1, $2, $3, $4, $5, $6)`, [
            movie, date, time, cinema, tickets, total
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
// UPDATE public.tb_booking SET movie='', "date"='', "time"='', cinema='', tickets='', total='' WHERE id_booking=nextval('tb_booking_id_booking_seq'::regclass);
models.updateData = function({id_booking, movie, date, time, cinema, tickets, total}) {
    return new Promise((resolve, reject) => {
        db.query('UPDATE public.tb_booking SET movie=$2, "date"=$3, "time"=$4, cinema=$5, tickets=$6, total=$7 WHERE id_booking=$1', [
            id_booking, movie, date, time, cinema, tickets, total
        ])
        .then(() => {
            resolve('Data has been updated')
        })
        .catch((err) => {
            console.log(err)
            reject(err)
        })
    })
}

// Delete from table
models.delData = function(id_booking) {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM public.tb_booking WHERE id_booking= $1', [id_booking])
        .then(() => {
            resolve('Data has been deleteded')
        })
        .catch((err) => {
            reject(err)
        })
    })
}

module.exports = models