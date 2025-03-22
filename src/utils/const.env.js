require('dotenv').config();

const PORT = process.env.PORT;
const SERVER_URL = process.env.SERVER_URL;
const DB_URL = process.env.DB_URL;
const DB_NAME = process.env.DB_NAME;

module.exports = {
  PORT,
  SERVER_URL,
  DB_URL,
  DB_NAME,
};
