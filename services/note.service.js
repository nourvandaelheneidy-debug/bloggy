const noteRepository = require('../repositories/note.repository');

const createNote = async (data) => {
    return await noteRepository.create(data);
};

const getAllNotes = async () => {
    return await noteRepository.findAll();
};

const getNoteById = async (id) => {
    return await noteRepository.findById(id);
};

const updateNote = async (id, data) => {
    return await noteRepository.update(id, data);
};

const deleteNote = async (id) => {
    return await noteRepository.deleteById(id);
};

module.exports = {
    createNote,
    getAllNotes,
    getNoteById,
    updateNote,
    deleteNote
};