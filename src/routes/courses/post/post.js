const database = require('../../../database/db');

module.exports = (app) => {
    app.post('/courses', async (req, res) => {
        const { name, maxEnrollments, description } = req.body;
        if (!name) {
            return res.status(400).json({ "message": "Missing name" });
        }
        try {
            const response = await database.query('INSERT INTO course (name, maxEnrollments, description) VALUES ($1, $2, $3) RETURNING *', [name, maxEnrollments, description]);
            return res.status(201).json({ "courseId": response.rows[0].id });
        } catch (exception) {
            return res.status(400).json(exception);
        }
    });
}