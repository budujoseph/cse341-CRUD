const express = require('express');
const app = express();
require('dotenv').config();
const routes = require('./routes/index');
const mongodb = require('./db/db_config');


const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || 'localhost';

app.use(express.json());
app.use('/', routes);

mongodb.initdb(err => {
    if(err) {
        console.error(err);
    }
    app.listen(PORT, HOST, () => {
        console.log(`Connected to database and server is running on http://${HOST}:${PORT}`);
    });
}) 