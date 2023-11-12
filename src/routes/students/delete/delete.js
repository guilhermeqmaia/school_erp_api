const database = require('../../../database/db');

module.exports = (app) => {
    app.delete('/students/:id', async (req, res) => {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ "message": "Missing ID" });
        }
        try {
            const enrollments = await database.query('SELECT * FROM enrollment WHERE student_id = $1', [id]);

            if (enrollments.rowCount > 0) {
                return res.status(400).json({ "message": "Student has enrollments" });
            }

            const response = await database.query('DELETE FROM student WHERE id = $1', [id]);
            if (response.rowCount === 0) {
                return res.status(404).json({ "message": "Student not found" });
            }
            return res.status(200).json({ "message": "Student deleted" });
        } catch (exception) {
            return res.status(400).json(exception);
        }
    });
};