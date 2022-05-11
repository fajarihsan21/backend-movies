const db = require('../config/db')
const models = {} 

models.getData = async function () {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM public.tb_user ORDER BY id_user DESC')
        .then(data =>{
            resolve(data.rows)
        }).catch(err => {
            reject(err)
        })
    })
}

models.getByUsername = async function (username) {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM public.tb_user WHERE username=$1', [username])
        .then(data =>{
            resolve(data.rows)
        }).catch(err => {
            reject(err)
        })
    })
}

// INSERT INTO public.tb_user (username, "password", id_role, created_at, updated_at) VALUES('', '', 0, now(), now());
models.addData = function ({username, hashPassword, id_role}) {
    return new Promise((resolve, reject) => {
        db.query(
            `INSERT INTO public.tb_user (username, "password", id_role, created_at, updated_at) VALUES($1, $2, $3, now(), now())`, [
            username, 
            hashPassword,
            id_role
        ])
        .then(() => {
            resolve('Data User is Saved')
        })
        .catch((err) => {
            console.log(err)
            reject(err)
        })
    })
}

models.getById = function (id_user) {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM public.tb_user WHERE id_user=$1', [id_user])
        .then((data) => {
            resolve(data.rows)
        })
        .catch((err) => {
            reject(err)
        })
    })
}

models.delData = function (id_user) {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM public.tb_user WHERE id_user=$1', [id_user])
        .then(() => {
            resolve('Data has been Deleted')
        })
        .catch((err) => {
            reject(err)
        })
    })
}
module.exports = models