const postRepository = require('../repositories/post.repository');

const createPost = async (data) => {
    return await postRepository.create(data);
};

const getAllPosts = async () => {
    return await postRepository.findAll();
};

const getPostById = async (id) => {
    return await postRepository.findById(id);
};

const updatePost = async (id, data) => {
    return await postRepository.update(id, data);
};

const deletePost = async (id) => {
    return await postRepository.deleteById(id);
};

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost
};