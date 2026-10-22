
const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');
const { validateUpdateUser } = require('../validator/user.validator');
const authenticateToken = require('../middleware/auth.middleware');
const requireRole = require('../middleware/requireRole');

router.use(authenticateToken);

router.get('/', requireRole('admin'), userController.getAllUsers);

router.get('/:id', requireRole('admin'), userController.getUserById);

router.put(
    '/:id',
    requireRole('admin'),
    validateUpdateUser,
    userController.updateUser
);

router.delete('/:id', requireRole('admin'), userController.deleteUser);

module.exports = router;
