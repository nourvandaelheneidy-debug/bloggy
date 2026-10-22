const noteService = require('../services/note.service');

const createNote = async (req, res, next) => {
    try {
        const note = await noteService.createNote(req.body);

        res.status(201).json({
            message: 'Note created successfully',
            note
        });
    } catch (error) {
        next(error);
    }
};

const getAllNotes = async (req, res, next) => {
    try {
        const notes = await noteService.getAllNotes();

        res.status(200).json({ notes });
    } catch (error) {
        next(error);
    }
};

const getNoteById = async (req, res, next) => {
    try {
        const note = await noteService.getNoteById(req.params.id);

        if (!note) {
            return res.status(404).json({
                message: 'Note not found'
            });
        }

        res.status(200).json({ note });
    } catch (error) {
        next(error);
    }
};

const updateNote = async (req, res, next) => {
    try {
        const note = await noteService.updateNote(
            req.params.id,
            req.body
        );

        if (!note) {
            return res.status(404).json({
                message: 'Note not found'
            });
        }

        res.status(200).json({
            message: 'Note updated successfully',
            note
        });
    } catch (error) {
        next(error);
    }
};

const deleteNote = async (req, res, next) => {
    try {
        const note = await noteService.deleteNote(req.params.id);

        if (!note) {
            return res.status(404).json({
                message: 'Note not found'
            });
        }

        res.status(200).json({
            message: 'Note deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createNote,
    getAllNotes,
    getNoteById,
    updateNote,
    deleteNote
};