const router = require('express').Router();
const artsController = require('../controllers/arts');
const artValidator = require('../validations/arts-validation')
const userAuth = require('../middleware/authentication')

router.get('/', artsController.getAllArts);
router.get('/:id', artsController.getArtById);

router.post('/',
    userAuth.userIsAuthenticated,
    artValidator.validateArtRules(),
    artValidator.checkArtData,
    artsController.createArt);

router.put('/:id',
    userAuth.userIsAuthenticated,
    artValidator.validateArtRules(),
    artValidator.checkArtData,
    artsController.updateArtInfo);

router.delete('/:id',
    userAuth.userIsAuthenticated,
    artsController.deleteArt);

module.exports = router;
