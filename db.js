require('dotenv').config();
const { Sequelize } = require('sequelize');
const pg = require('pg');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: false,
    dialectModule: pg,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected successfully!');
    } catch (error) {
        console.error('Unable to connect to database:', error.message);
        throw error;
    }
};

module.exports = { sequelize, connectDB };
