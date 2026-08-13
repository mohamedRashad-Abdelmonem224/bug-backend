const router = require('express').Router()
const multer = require('multer')
const uploadController = require('../controllers/uploadController')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads')
  },
  filename: function (req, file, cb) {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const ext = file.originalname.split('.').pop()
    cb(null, `${unique}.${ext}`)
  }
})

const upload = multer({ storage })

// POST /api/uploads - multipart form field `images` (array)
router.post('/', upload.array('images', 12), uploadController.uploadImages)

module.exports = router
