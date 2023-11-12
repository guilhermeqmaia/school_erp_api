const database = require('../../../database/db');

module.exports = (app) => {
    app.put('/courses', async (req, res) => {
        const { id, course } = req.body;
        if (!id) {
            return res.status(400).json({ "message": "Missing ID" });
        }
        if (!course) {
            return res.status(400).json({ "message": "Missing object" });
        }
        try {
            const val = JSON.parse(course);
            const { name, description, maxEnrollments } = val;
            const response = await database.query('UPDATE course SET name = $1, maxEnrollments = $2, description = $3 WHERE id = $4 RETURNING *', [name, maxEnrollments, description, id]);
            return res.status(200).json({ "course": response.rows[0] });
        } catch (exception) {
            console.log(exception);
            return res.status(400).json(exception);
        }
    });
}