const jwt = require('jsonwebtoken')

const checkAuth = (req, res, next) => {
    try {
        const authToken = req.header("Authorization")?.replace("Bearer ", "").trim();

        if (!authToken) {
            return res.status(401).json({
                message: 'Unauthorized',
            })
        }

        const decoded = jwt.verify(authToken, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({
                message: 'Unauthorized',
            })
        }

        req.user = decoded;
        return next();
    } catch (err) {
        console.error('Check auth err:', err)
        return res.status(500).json({
            message: 'Internal server error',
        })
    }
}

module.exports = checkAuth;
