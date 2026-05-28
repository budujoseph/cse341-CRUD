
const userIsAuthenticated = (req, res, next) => {
    try {
        if (req.IsAuthenticated()) {
            return next()
        }
        res.status(401).json({
            message: 'Unauthorized'
        });
    } catch (error) {
        next(error)
    }
}

module.exports = { userIsAuthenticated }