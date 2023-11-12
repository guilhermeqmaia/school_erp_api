const database = require('../../../database/db');

module.exports = (app) => {
    app.delete('/enrollments/:id', async (req, res) => {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ "message": "Missing ID" });
        }
        try {
            const response = await database.query('DELETE FROM enrollment WHERE id = $1', [id]);
            if (response.rowCount === 0) {
                return res.status(404).json({ "message": "Enrollment not found" });
            }
            return res.status(200).json({ "message": "Enrollment deleted" });
        } catch (exception) {
            return res.status(400).json(exception);
        }
    });
};