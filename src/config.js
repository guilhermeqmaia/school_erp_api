const dotenv = require('dotenv');

const result = dotenv.config();

const parsed = result.parsed;

module.exports = {
    user: parsed.POSTGRES_USER,
    password: parsed.POSTGRES_PASSWORD,
    host: parsed.POSTGRES_HOST,
    db: parsed.POSTGRES_DATABASE,
    port: parsed.POSTGRES_PORT
};