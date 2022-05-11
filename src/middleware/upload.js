const multer = require('multer')

const storage = multer.diskStorage({
    destination: 'public/images',
    filename: (req, file, callback) => {
        const dateNow = Date.now() + '-' + Math.round(Math.random() * 1E9)
        callback(null, dateNow + '-' + file.originalname)
    }
})

const filter = (req, file, callback) => {
    if (file.mimetype == 'image/png' || 
    file.mimetype == 'image/jpg' || 
    file.mimetype == 'image/jpeg') {
        callback(null, true)
    } else {
        callback(null, false)
    }
}

const upload = multer({
    storage: storage,
    fileFilter: filter
})

module.exports = upload