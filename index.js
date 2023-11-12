const express = require('express');
const routes = require('./src/routes');
const port = 3000;


const app = express();
app.use(express.json());

app.listen(port, () => console.log(`Listening on port ${port}`));

routes(app);


