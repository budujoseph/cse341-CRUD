const router = require('express').Router();
const membersController = require('../controllers/members');
const memberValidation = require('../validations/members-validation')
const userAuth = require('../middleware/authentication')

router.get('/', membersController.getMembers);   
router.get('/:id', membersController.getMembersById);

router.post('/',
    userAuth.userIsAuthenticated,
    memberValidation.validateMemberRules(),
    memberValidation.checkMemberInfo,
    membersController.createMember);

router.put('/:id',
    userAuth.userIsAuthenticated,
    memberValidation.validateMemberRules(),
    memberValidation.checkMemberInfo,
    membersController.updateMemberInfo)
    
router.delete('/:id',
    userAuth.userIsAuthenticated,
    membersController.deleteMember)


module.exports = router;