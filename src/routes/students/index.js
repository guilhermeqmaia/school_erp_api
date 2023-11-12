const POST = require('./post/post');
const GET = require('./get/get');
const PUT = require('./put/put');
const DELETE = require('./delete/delete');

const students = (app) => {
    POST(app);
    GET(app);
    PUT(app);
    DELETE(app);
}

module.exports = students;