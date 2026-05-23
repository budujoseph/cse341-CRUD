const {body, validationResult} = require('express-validator');
const validate = {}

validate.validateMemberRules = () => {
    return [
        body('firstName')
            .notEmpty()
            .withMessage('First name is required')
            .isLength({ min: 2 })
            .withMessage('First name must be at least 2 characters long'),
        
        body('lastName')
            .notEmpty()
            .withMessage('Last name is required')
            .isLength({ min: 2 })
            .withMessage('Last name must be at least 2 characters long'),
        
        body('dateOfBirth')
            .notEmpty()
            .withMessage('Date of birth is required'),
        
        body('gender')
            .notEmpty()
            .withMessage('Gender is required'),
        
        body('email')
            .notEmpty()
            .withMessage('Email is required')
            .isEmail()
            .withMessage('Invalid email format'),
        
        body('phone')
            .notEmpty()
            .withMessage('Phone number is required'),
        
        body('address')
            .notEmpty()
            .withMessage('Address is required'),
        
        body('recordNumber')
            .notEmpty()
            .withMessage('Record number is required')
    ];
}

validate.checkMemberInfo = (req, res, next) => {
    let errors = []
    errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({errors: errors.array()})
    }
    next()
};

module.exports = validate