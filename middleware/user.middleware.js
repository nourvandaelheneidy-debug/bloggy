
const userMiddleware = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({
            message: 'User is not authenticated'
        });
    }

    next();
};

module.exports = userMiddleware;
