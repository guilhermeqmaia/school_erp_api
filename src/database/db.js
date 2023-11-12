const { Client } = require('pg');
const { user, password, host, db, port } = require('../config');

const database = new Client({
    user: user,
    host: host,
    database: db,
    password: password,
    port: port,
    parseIntegers: true,
});

database.connect();

database.query(`
    CREATE TABLE IF NOT EXISTS course (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        maxEnrollments INT NOT NULL,
        description VARCHAR(255)
    )
`);

database.query(`
    CREATE TABLE IF NOT EXISTS student (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        birthDate DATE NOT NULL
    )
`);

database.query(`
    CREATE TABLE IF NOT EXISTS enrollment (
        id SERIAL PRIMARY KEY,
        course_id INT NOT NULL,
        student_id INT NOT NULL,
        FOREIGN KEY (course_id) REFERENCES course (id),
        FOREIGN KEY (student_id) REFERENCES student (id)
    )
`);

module.exports = database;