var express = require('express')
var router = express.Router()
var bookController = require('../public/modules/book-controller')

var cors = require('cors')

router.use(cors(), function timeLog(req, res, next){
    console.log('Time: ', Date.now())
    next()

})

router.get('/download',bookController.download)
router.get('/',bookController.findAll)
router.post('/',bookController.add)
router.get('/:id',bookController.findById)
 router.delete('/:id',bookController.delete)
 router.put('/:id',bookController.edit)

module.exports = router