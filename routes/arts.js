const router = require('express').Router();
const artsController = require('../controllers/arts');
const artValidator = require('../validations/arts-validation')

router.get('/', artsController.getAllArts);
router.get('/:id', artsController.getArtById);

router.post('/', artValidator.validateArtRules(),
    artValidator.checkArtData,
    artsController.createArt);

router.put('/:id', artValidator.validateArtRules(),
    artValidator.checkArtData,
    artsController.updateArtInfo);

router.delete('/:id', artsController.deleteArt);

module.exports = router;
