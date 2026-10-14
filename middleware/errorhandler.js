
const errorhandler = (err, req, res, next) => {
    console.error(err.stack);

    if (res.headersSent) {
        return next(err);
    }

    res.status(err.status || 500).json({
        message: err.status
            ? err.message
            : 'Internal server error'
    });
};

module.exports = errorhandler;
