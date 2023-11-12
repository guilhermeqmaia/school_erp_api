const database = require('../../../database/db');

module.exports = (app) => {
    app.post('/enrollments', async (req, res) => {
        const { courseId, studentId } = req.body;
        if (!courseId) {
            return res.status(400).json({ "message": "Missing courseId" });
        }
        if (!studentId) {
            return res.status(400).json({ "message": "Missing studentId" });
        }
        try {

            const curCourseSituation = await database.query(`
                SELECT
                   course.maxEnrollments as "maxEnrollments",
                   CAST(COUNT(enrollment.id) AS INTEGER) as "enrolledStudents"
                FROM course
                LEFT JOIN enrollment ON enrollment.course_id = course.id
                WHERE course.id = $1
                GROUP BY course.id
            `, [courseId],
            );

            const situation = curCourseSituation.rows[0];
            console.log(situation);
            console.log(situation.maxEnrollments <= situation.enrolledStudents + 1);

            if (situation.maxEnrollments < situation.enrolledStudents + 1) {
                return res.status(400).json({ "message": "Enrollment limit reached" });
            }

            const response = await database.query('INSERT INTO enrollment (course_id, student_id) VALUES ($1, $2) RETURNING *', [courseId, studentId]);
            return res.status(201).json({ "enrollmentId": response.rows[0].id });
        } catch (exception) {
            return res.status(400).json(exception);
        }
    });
}