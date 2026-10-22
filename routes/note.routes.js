
const express = require('express');
const router = express.Router();

const noteController = require('../controllers/note.controller');
const { validatePost } = require('../validator/note.validator');
const authenticateToken = require('../middleware/auth.middleware');

router.use(authenticateToken);

router.get('/', noteController.getAllNotes);
router.get('/:id', noteController.getNoteById);
router.post('/', validatePost, noteController.createNote);
router.put('/:id', validatePost, noteController.updateNote);
router.delete('/:id', noteController.deleteNote);

module.exports = router;
