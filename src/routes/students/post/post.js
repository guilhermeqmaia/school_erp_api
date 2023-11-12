const database = require('../../../database/db');

module.exports = (app) => {
    app.post('/students', async (req, res) => {
        const { name, birthDate } = req.body;
        if (!name) {
            return res.status(400).json({ "message": "Missing name" });
        }
        if (!birthDate) {
            return res.status(400).json({ "message": "Missing birthDate" });
        }
        try {
            const response = await database.query('INSERT INTO student (name, birthdate) VALUES ($1, $2) RETURNING *', [name, birthDate]);
            return res.status(201).json({ "studentId": response.rows[0].id });
        } catch (exception) {
            return res.status(400).json(exception);
        }
    });
}