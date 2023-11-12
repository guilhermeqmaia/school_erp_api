const database = require('../../../database/db');

module.exports = (app) => {
    app.delete('/courses/:id', async (req, res) => {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ "message": "Missing ID" });
        }
        try {
            ///Verify if has students enrolled
            const students = await database.query('SELECT * FROM enrollment WHERE course_id = $1', [id]);

            if (students.rowCount > 0) {
                return res.status(400).json({ "message": "Course has students enrolled" });
            }

            const response = await database.query('DELETE FROM course WHERE id = $1', [id]);
            if (response.rowCount === 0) {
                return res.status(404).json({ "message": "Course not found" });
            }
            return res.status(200).json({ "message": "Course deleted" });
        } catch (exception) {
            return res.status(400).json(exception);
        }
    });
};