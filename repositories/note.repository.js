const { Note } = require('../noteModel');

const create = async (data) => {
    return await Note.create(data);
};

const findAll = async () => {
    return await Note.findAll();
};

const findById = async (id) => {
    return await Note.findByPk(id);
};

const update = async (id, data) => {
    const note = await Note.findByPk(id);

    if (!note) return null;

    return await note.update(data);
};

const deleteById = async (id) => {
    const note = await Note.findByPk(id);

    if (!note) return null;

    await note.destroy();
    return note;
};

module.exports = {
    create,
    findAll,
    findById,
    update,
    deleteById
};