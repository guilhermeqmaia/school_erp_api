const database = require('../../../database/db');

module.exports = (app) => {
    app.put('/students', async (req, res) => {
        const { id, student } = req.body;
        if (!id) {
            return res.status(400).json({ "message": "Missing ID" });
        }
        if (!student) {
            return res.status(400).json({ "message": "Missing student" });
        }
        try {
            const val = JSON.parse(student);
            const { name, birthDate } = val;
            const response = await database.query('UPDATE student SET name = $1, birthdate = $2 WHERE id = $3 RETURNING *', [name, birthDate, id]);
            return res.status(200).json({ "student": response.rows[0] });
        } catch (exception) {
            return res.status(400).json(exception);
        }
    });
}