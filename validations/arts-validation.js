const { body, validationResult } = require('express-validator')
const validate = {}

validate.validateArtRules = () => {
    return [
        body('title')
            .notEmpty()
            .withMessage('Art title is required')
            .isLength({ min: 7 })
            .withMessage('Title must be at least 7 charatcters long'),
        
        body('artist')
            .notEmpty()
            .withMessage('Artist name is required')
            .isLength({ min: 2 })
            .withMessage('Art name should have a minimum of 2 characters'),
        
        body('year')
            .notEmpty()
            .withMessage('Art year is required')
            .isLength({min:4,  max: 4 })
            .withMessage('Year must be exactly 4 digits')
            .isNumeric()
            .withMessage('Year must be a number'),
        
        body('description')
            .notEmpty()
            .withMessage(' Art description is required')
            .isLength({ min: 10 })
            .withMessage('Art description should have a minimum of 10 characters')
    ]
}

validate.checkArtData = (req, res, next) => {
    let errors = []
    errors = validationResult(req);
    if (!errors.isEmpty()) {
       return res.status(400).json({errors: errors.array()})
    }
    next()
};

module.exports = validate