
require('dotenv').config();

const express = require('express');
const { connectDB, sequelize } = require('./db');

const authenticateToken = require('./middleware/auth.middleware');
const errorhandler = require('./middleware/errorhandler');

const userRoutes = require('./routes/user.routes');
const noteRoutes = require('./routes/note.routes');
const authRoutes = require('./routes/auth.routes');
const postRoutes = require('./routes/post.routes');

const { blogger, oauth2Client } = require('./blogger');

const app = express();

app.use(express.json());

// Welcome route
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to Bloggy API'
    });
});

// Authentication routes
app.use('/auth', authRoutes);

// Post routes
app.use('/posts', authenticateToken, postRoutes);

// User routes
app.use('/users', userRoutes);

// Note routes
app.use('/notes', noteRoutes);

// Blogger OAuth authorization
app.get('/blogger/auth', (req, res) => {
    const url = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: ['https://www.googleapis.com/auth/blogger'],
        prompt: 'consent'
    });

    res.redirect(url);
});

// Blogger OAuth callback
app.get('/oauth2callback', async (req, res) => {
    try {
        const { tokens } = await oauth2Client.getToken(req.query.code);
        oauth2Client.setCredentials(tokens);

        const result = await blogger.blogs.listByUser({
            userId: 'self'
        });

        const blogs = result.data.items || [];

        res.json({
            message: 'Google authorization successful',
            blogs: blogs.map((blog) => ({
                title: blog.name,
                id: blog.id
            }))
        });
    } catch (error) {
        console.error('Blogger authorization failed:', error.message);

        res.status(500).json({
            message: 'Blogger authorization failed'
        });
    }
});

// Publish a Blogger post
app.post('/blogger/posts', async (req, res) => {
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

        if (!process.env.BLOGGER_BLOG_ID) {
            return res.status(500).json({
                message: 'Blogger blog ID is not configured'
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

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        message: 'Route not found'
    });
});

// Error handler
app.use(errorhandler);

// Start server locally; Vercel imports the Express app
if (require.main === module) {
    const PORT = process.env.PORT || 3000;

    const startServer = async () => {
        try {
            await connectDB();
            await sequelize.sync();

            app.listen(PORT, () => {
                console.log(`Bloggy server is running on port ${PORT}`);
            });
        } catch (error) {
            console.error('Server startup failed:', error.message);
            process.exitCode = 1;
        }
    };

    startServer();
}

module.exports = app;
