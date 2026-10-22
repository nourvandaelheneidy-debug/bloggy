
const validateRegister = (req, res, next) => {
    const { name, email, password } = req.body;
    const errors = [];

    if (typeof name !== 'string' || name.trim() === '') {
        errors.push('Name is required');
    }

    if (
        typeof email !== 'string' ||
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    ) {
        errors.push('A valid email is required');
    }

    if (typeof password !== 'string' || password.length < 8) {
        errors.push('Password must be at least 8 characters');
    }

    if (errors.length > 0) {
        return res.status(400).json({
            message: 'Validation failed',
            errors
        });
    }

    next();
};

const validateUpdateUser = (req, res, next) => {
    const { name, email, password } = req.body;
    const errors = [];

    if (name !== undefined &&
        (typeof name !== 'string' || name.trim() === '')) {
        errors.push('Name must be a non-empty string');
    }

    if (email !== undefined &&
        (typeof email !== 'string' ||
         !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))) {
        errors.push('A valid email is required');
    }

    if (password !== undefined &&
        (typeof password !== 'string' || password.length < 8)) {
        errors.push('Password must be at least 8 characters');
    }

    if (errors.length > 0) {
        return res.status(400).json({
            message: 'Validation failed',
            errors
        });
    }

    next();
};

module.exports = {
    validateRegister,
    validateUpdateUser
};
