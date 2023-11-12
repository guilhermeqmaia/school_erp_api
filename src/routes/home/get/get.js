const database = require('../../../database/db');

const get = (app) => {
    app.get('/', async (_, res) => {
        try {
            const studentsResponse = await database.query(`
                SELECT
                    CAST(COUNT(DISTINCT student.id) AS INTEGER) as "studentsCount",
                    CAST(COUNT(enrollment.id) AS INTEGER)as "enrollmentsCount"
                FROM student
                LEFT JOIN enrollment ON student.id = enrollment.student_id
            `);

            const coursesResponse = await database.query(`
                SELECT
                    CAST(COUNT(DISTINCT course.id) AS INTEGER) as "coursesCount",
                    CAST(COUNT(enrollment.id) AS INTEGER) as "enrollmentsCount"
                FROM course
                LEFT JOIN enrollment ON course.id = enrollment.course_id
            `);

            return res.status(200).json({
                "students": studentsResponse.rows[0],
                "courses": coursesResponse.rows[0],
            });
        } catch (error) {
            console.log(error);
            return res.sendStatus(400);
        }
    });
}

module.exports = (app) => {
    get(app);
};
