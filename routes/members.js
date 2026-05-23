const router = require('express').Router();
const membersController = require('../controllers/members');
const memberValidation = require('../validations/members-validation')

router.get('/', membersController.getMembers);   
router.get('/:id', membersController.getMembersById);

router.post('/',
    memberValidation.validateMemberRules(),
    memberValidation.checkMemberInfo,
    membersController.createMember);

router.put('/:id', memberValidation.validateMemberRules(),
    memberValidation.checkMemberInfo,
    membersController.updateMemberInfo)
    
router.delete('/:id', membersController.deleteMember)


module.exports = router;