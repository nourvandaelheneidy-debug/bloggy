const User = require('../userModel');

const create = async (data) => {
    return await User.create(data);
};

const findAll = async () => {
    return await User.findAll();
};

const findById = async (id) => {
    return await User.findByPk(id);
};

const update = async (id, data) => {
    const user = await User.findByPk(id);

    if (!user) {
        return null;
    }

    return await user.update(data);
};

const deleteById = async (id) => {
    const user = await User.findByPk(id);

    if (!user) {
        return null;
    }

    await user.destroy();
    return user;
};

module.exports = {
    create,
    findAll,
    findById,
    update,
    deleteById
};