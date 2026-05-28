const express = require('express');
const router = express.Router();
const passport = require('passport')
const membersRouter = require('./members');
const artsRouter = require('./arts');

router.get('/login',
    passport.authenticate('google', {
        scope: ['email', 'profile']
    }));

router.get('/auth/google/callback',
    passport.authenticate('google',{
        successRedirect: '/auth/google/success',
        failureRedirect: '/auth/google/failure'
    }));

router.get('/auth/google/success', (req, res) => {
    res.status(200).json({
        message: 'Login successful',
        user: req.user
    });
});

router.get('/auth/google/failure', (req, res) => {
    res.status(401).json({
        message: 'Authentication Failed'
    })
})
router.use('/members', membersRouter);
router.use('/arts', artsRouter);


module.exports = router;