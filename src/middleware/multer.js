const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if(req.baseUrl == '/api/items') cb(null, path.join(__dirname + '/../../../client/public/images/itemImages'))
    if(req.baseUrl == '/api/users') cb(null, path.join(__dirname + '/../../../client/public/images/userImages'))
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})
 
const upload = multer({ storage })

module.exports = {storage, upload}