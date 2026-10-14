const express = require('express');
const { Post } = require('../postModel');

const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        const { title, content } = req.body;

        if (
            typeof title !== 'string' ||
            !title.trim() ||
            typeof content !== 'string' ||
            !content.trim()
        ) {
            return res.status(400).json({
                message: 'Title and content are required'
            });
        }

        const post = await Post.create({
            title: title.trim(),
            content: content.trim()
        });

        res.status(201).json({
            message: 'Post created successfully',
            post
        });
    } catch (error) {
        next(error);
    }
});

router.get('/', async (req, res, next) => {
    try {
        const posts = await Post.findAll({
            order: [['createdAt', 'DESC']]
        });

        res.json(posts);
    } catch (error) {
        next(error);
    }
});

router.get('/search', async (req, res, next) => {
    try {
        const { Op } = require('sequelize');
        const q = req.query.q;

        if (typeof q !== 'string' || !q.trim()) {
            return res.status(400).json({
                message: 'Search query q is required'
            });
        }

        const posts = await Post.findAll({
            where: {
                title: {
                    [Op.iLike]: `%${q.trim()}%`
                }
            }
        });

        res.json(posts);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id < 1) {
            return res.status(400).json({
                message: 'Invalid post ID'
            });
        }

        const post = await Post.findByPk(id);

        if (!post) {
            return res.status(404).json({
                message: 'Post not found'
            });
        }

        res.json(post);
    } catch (error) {
        next(error);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const { title, content } = req.body;

        if (!Number.isInteger(id) || id < 1) {
            return res.status(400).json({
                message: 'Invalid post ID'
            });
        }

        if (
            typeof title !== 'string' ||
            !title.trim() ||
            typeof content !== 'string' ||
            !content.trim()
        ) {
            return res.status(400).json({
                message: 'Title and content are required'
            });
        }

        const post = await Post.findByPk(id);

        if (!post) {
            return res.status(404).json({
                message: 'Post not found'
            });
        }

        await post.update({
            title: title.trim(),
            content: content.trim()
        });

        res.json({
            message: 'Post updated successfully',
            post
        });
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id < 1) {
            return res.status(400).json({
                message: 'Invalid post ID'
            });
        }

        const post = await Post.findByPk(id);

        if (!post) {
            return res.status(404).json({
                message: 'Post not found'
            });
        }

        await post.destroy();

        res.json({
            message: 'Post deleted successfully'
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;