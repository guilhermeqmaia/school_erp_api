const courses = require('./courses/index');
const students = require('./students/index');
const enrollments = require('./enrollments/index');
const home = require('./home/index');

const routes = (app) => {
    courses(app);
    students(app);
    enrollments(app);
    home(app);
};

module.exports = routes;