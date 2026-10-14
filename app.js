require('dotenv').config();

const express = require('express');
const { connectDB, sequelize } = require('./db');
const { Post } = require('./postModel');
const { User } = require('./userModel');
const authenticateToken = require('./middleware/auth.middleware');

const authRoutes = require('./routes/auth.routes');
const errorhandler = require('./middleware/errorhandler');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to Bloggy API'
    });
});
app.use('/auth', authRoutes);
const postRoutes = require('./routes/post.routes');
app.use('/posts', authenticateToken, postRoutes);

app.use((req, res) => {
    res.status(404).json({
        message: 'Route not found'
    });
});

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