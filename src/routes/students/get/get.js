const database = require('../../../database/db');

const getAll = (app) => {
    app.get('/students', async (_, res) => {
        try {
            const students = await database.query(`
                SELECT
                    student.id,
                    student.name,
                    student.birthDate as "birthDate",
                    course.name as "courseName"
                FROM student
                LEFT JOIN enrollment ON student.id = enrollment.student_id
                LEFT JOIN course ON course.id = enrollment.course_id
                ORDER BY student.id ASC
            `);
            return res.status(200).json({ "students": students.rows });
        } catch (error) {
            return res.sendStatus(400);
        }
    });
}

const getById = (app) => {
    app.get('/students/:id', async (req, res) => {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ "message": "Missing ID" });
        }
        try {
            const student = await database.query(`
                SELECT
                    student.id,
                    student.name,
                    student.birthDate as "birthDate",
                    enrollment.id as "enrollmentId",
                    course.id as "courseId",
                    course.name as "courseName"
                FROM student
                LEFT JOIN enrollment ON student.id = enrollment.student_id
                LEFT JOIN course ON course.id = enrollment.course_id
                WHERE student.id = $1`,
                [id]
            );
            if (student.rowCount === 0) {
                return res.status(404).json({ "message": "Student not found" });
            }
            return res.status(200).json(student.rows[0]);
        } catch (error) {
            return res.sendStatus(400);
        }
    });
}

const getNotEnrolled = (app) => {
    app.get('/students/not-enrolled', async (_, res) => {
        try {
            const students = await database.query(`
                SELECT
                    student.id,
                    student.name,
                    student.birthDate as "birthDate"
                FROM student
                LEFT JOIN enrollment ON student.id = enrollment.student_id
                WHERE enrollment.student_id IS NULL
                ORDER BY student.id ASC
            `);

            return res.status(200).json({ "students": students.rows });
        } catch (error) {
            console.log(error);
            return res.sendStatus(400);
        }
    });
}

function get(app) {
    getAll(app);
    getNotEnrolled(app);
    getById(app);
}

module.exports = get;
