const database = require('../../../database/db');

const getAll = (app) => {
    app.get('/courses', async (_, res) => {
        try {
            const courses = await database.query(`
                SELECT
                    course.id,
                    course.name,
                    course.maxEnrollments as "maxEnrollments",
                    course.description,
                    CAST(COUNT(enrollment.id) AS INTEGER) as "enrolledStudentsCount"
                FROM course
                LEFT JOIN enrollment ON course.id = enrollment.course_id
                GROUP BY course.id
                ORDER BY course.id ASC
            `);

            return res.status(200).json({ "courses": courses.rows });
        } catch (error) {
            return res.sendStatus(400);
        }
    });
}

const getById = (app) => {
    app.get('/courses/:id', async (req, res) => {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ "message": "Missing ID" });
        }
        try {
            const course = await database.query(`
                SELECT
                    course.id,
                    course.name,
                    course.maxEnrollments as "maxEnrollments",
                    course.description
                FROM course
                WHERE id = $1`,
                [id]
            );
            if (course.rowCount === 0) {
                return res.status(404).json({ "message": "Course not found" });
            }

            const students = await database.query(`
                SELECT
                    enrollment.id as "enrollmentId",
                    enrollment.student_id as "studentId",
                    enrollment.course_id as "courseId",
                    student.name,
                    student.birthDate as "birthDate"
                FROM enrollment
                JOIN student ON enrollment.student_id = student.id
                WHERE course_id = $1`,
                [id],
            );

            course.rows[0].students = students.rows;

            return res.status(200).json(course.rows[0]);
        } catch (error) {
            console.log(error);
            return res.sendStatus(400);
        }
    });
}

const getCoursesWithVacancies = (app) => {
    app.get("/courses/with-vacancies", async (req, res) => {
        try {

            const courses = await database.query(`
            SELECT
                course.id,
                course.name,
                course.description,
                course.maxEnrollments as "maxEnrollments",
                CAST(COUNT(enrollment.id) AS INTEGER) as "enrolledStudentsCount"
            FROM course
            LEFT JOIN enrollment ON course.id = enrollment.course_id
            GROUP BY course.id
            ORDER BY course.id ASC
            `);

            ///Filter courses where maxEnrollments is equal to enrolledStudentsCount
            const filteredCourses = courses.rows.filter(course => course.maxEnrollments > course.enrolledStudentsCount);

            return res.status(200).json({ "courses": filteredCourses });
        } catch (exception) {
            return res.status(400).json(exception);
        }
    });
}

function get(app) {
    getAll(app);
    getCoursesWithVacancies(app);
    getById(app);
}

module.exports = get;
