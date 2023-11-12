const GET = require('./get/get');
const DELETE = require('./delete/delete');
const PUT = require('./put/put');
const POST = require('./post/post');

const courses = (app) => {
    GET(app);
    DELETE(app);
    PUT(app);
    POST(app);
}

module.exports = courses;