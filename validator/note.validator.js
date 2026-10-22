const validatePost = (req, res, next) => {
    const { title, content } = req.body;

    const errors = [];

    if (typeof title !== 'string' || title.trim() === '') {
        errors.push('Title is required and must be a non-empty string');
    }

    if (typeof content !== 'string' || content.trim() === '') {
        errors.push('Content is required and must be a non-empty string');
    }

    if (errors.length > 0) {
        return res.status(400).json({
            message: 'Validation failed',
            errors
        });
    }

    next();
};

module.exports = { validatePost };