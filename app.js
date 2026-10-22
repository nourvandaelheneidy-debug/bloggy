require('dotenv').config();

const express = require('express');
const { connectDB, sequelize } = require('./db');
const { Post } = require('./postModel');
const { User } = require('./userModel');
const authenticateToken = require('./middleware/auth.middleware');
const userRoutes = require('./routes/user.routes');

const noteRoutes = require('./routes/note.routes');
const { Note } = require('./noteModel');

const authRoutes = require('./routes/auth.routes');
const errorhandler = require('./middleware/errorhandler');

const app = express();

const { google } = require('googleapis');
const { oauth2Client, blogger } = require('./blogger');

app.get('/blogger/auth', (req, res) => {
    const url = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: ['https://www.googleapis.com/auth/blogger'],
        prompt: 'consent'
    });

    res.redirect(url);
});

app.get('/oauth2callback', async (req, res) => {
    try {
        const { tokens } = await oauth2Client.getToken(req.query.code);
        oauth2Client.setCredentials(tokens);

        const result = await blogger.blogs.listByUser({
            userId: 'self'
        });

        console.log('Available Blogger blogs:');

        for (const blog of result.data.items || []) {
            console.log(`Title: ${blog.name}, ID: ${blog.id}`);
        }

        res.send(
            'Google authorization successful! Check your terminal for your Blogger blog ID.'
        );
    } catch (error) {
        console.error('Blogger authorization failed:', error.message);
        res.status(500).send('Blogger authorization failed. Check the terminal.');
    }
});


app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to Bloggy API'
    });
});

app.use('/auth', authRoutes);

const postRoutes = require('./routes/post.routes');

app.use('/posts', authenticateToken, postRoutes);

console.log('Blogger publish route registered');

app.post('/blogger/posts', async (req, res) => {
    console.log('Blogger POST route reached');

    try {
        const { title, content } = req.body;
        if (!title || !content) {
            return res.status(400).json({
                message: 'Title and content are required'
            });
        }

        const result = await blogger.posts.insert({
            blogId: process.env.BLOGGER_BLOG_ID,
            requestBody: {
                title,
                content
            }
        });

        res.status(201).json({
            message: 'Post published successfully!',
            post: result.data
        });
    } catch (error) {
        console.error('Blogger publish error:', error.message);

        res.status(500).json({
            message: 'Failed to publish post'
        });
    }
});

app.use('/users', userRoutes);

app.use((req, res) => {
    res.status(404).json({
        message: 'Route not found'
    });
});

app.use('/notes', noteRoutes);


app.use(errorhandler);

const PORT = 3000;

const startServer = async () => {
    try {
        await connectDB();
        await sequelize.sync();

        app.listen(PORT, () => {
            console.log(`Bloggy server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Server startup failed:', error.message);
    }
};

startServer();