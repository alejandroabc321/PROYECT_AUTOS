const { Router } = require('express')
const MarcaController = require('../controllers/marca')

const router = Router()

router.get('/', MarcaController.getMarcas)
router.get('/:id', MarcaController.getMarca)
router.post('/save-marca', MarcaController.saveMarca)
router.put('/edit-marca/:id', MarcaController.updateMarca)
router.delete('/delete-marca/:id', MarcaController.deleteMarca)

module.exports = router