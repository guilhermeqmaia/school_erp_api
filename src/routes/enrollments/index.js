const POST = require('./post/post');
const DELETE = require('./delete/delete');

const enrollments = (app) => {
    POST(app);
    DELETE(app);
}

module.exports = enrollments;