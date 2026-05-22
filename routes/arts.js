const router = require('express').Router();
const artsController = require('../controllers/arts');

router.get('/', artsController.getAllArts);
router.get('/:id', artsController.getArtById);

router.post('/', artsController.createArt);
router.put('/:id', artsController.updateArtInfo);
router.delete('/:id', artsController.deleteArt);
module.exports = router;
