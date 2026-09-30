const { Router } = require('express')
const AutoController = require('../controllers/auto')

const router = Router()

router.get('/', AutoController.getAutos)
router.get('/:id', AutoController.getAuto)
router.post('/save-auto', AutoController.saveAuto)
router.put('/edit-auto/:id', AutoController.updateAuto)
router.delete('/delete-auto/:id', AutoController.deleteAuto)

module.exports = router