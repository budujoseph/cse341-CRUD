const { body, validateResult } = require('express-validator')
const validate = {}

validate.validateArtRules = () => {
    return [
        body('title')
            .notEmpty()
            .withMessage('Art title is required'),
            isLength({ min: 7 })
            .withMessage('Title must be at least 7 charatcters long')
        body('artist')
            .notEmpty()
            .withMessage('Artist name is required')
            .isLength({ min: 2 })
        body('year')
            .notEmpty()
            .withMessage('Art yeat is required'),
            .isLength({ max: 4 })
            .withMessage('Year should have a minimum of 4 numbers --2004')
        body('description')
    ]
}