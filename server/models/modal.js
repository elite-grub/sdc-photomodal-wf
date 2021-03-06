/* eslint-disable arrow-body-style */
/* eslint-disable no-console */
const Sequelize = require('sequelize');
const { production, development, config } = require('../dbs/config.file.js');

const sequelize = new Sequelize({
  host: production.host,
  database: production.database,
  port: production.port,
  username: production.username,
  password: production.password,
  dialect: 'postgres',
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = {
  getUser: ((userId) => {
    return sequelize.query(`SELECT * FROM users WHERE id = ${userId}`)
      .then(res => res[0]) // NEED TO INCLUDE [0] TO AVOID UNNESSARY DATA
      .catch(err => err);
  }),
  getRestaurant: ((resId) => {
    return sequelize.query(`SELECT * FROM restaurants WHERE id = ${resId}`)
      .then(res => res[0])
      .catch(err => err);
  }),
};

module.exports.sequelize = sequelize;
