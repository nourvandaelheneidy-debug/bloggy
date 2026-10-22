const userRepository = require('../repositories/user.repository');
const bcrypt = require('bcryptjs');

const getAllUsers = async () => {
    return await userRepository.findAll();
};

const getUserById = async (id) => {
    return await userRepository.findById(id);
};

const updateUser = async (id, data) => {
    const updatedData = { ...data };

    if (updatedData.password) {
        updatedData.password = await bcrypt.hash(updatedData.password, 10);
    }

    return await userRepository.update(id, updatedData);
};

const deleteUser = async (id) => {
    return await userRepository.deleteById(id);
};

module.exports = {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};