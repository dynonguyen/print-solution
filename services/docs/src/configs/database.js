const Sequelize = require('sequelize').Sequelize;
const { Op, DataTypes } = require('sequelize');
const getEnv = require('~/utils/getEnv');

const db = new Sequelize(getEnv('POSTGRES_URI'), {
  dialect: 'postgres',
  logging: false,
  retry: { max: 3 }
});

const postgresConnect = async () => {
  try {
    await db.authenticate();
    await db.sync({ alter: true });
  } catch (error) {
    throw error;
  }
};

module.exports = { db, postgresConnect, Op, DataTypes };
