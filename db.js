
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('bloggy_db', 'postgres', '12345', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected successfully!');
    } catch (error) {
        console.error('Unable to connect to database:', error.message);
    }
};

module.exports = { sequelize, connectDB };
