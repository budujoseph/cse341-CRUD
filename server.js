const express = require('express');
const app = express();
require('dotenv').config();
const routes = require('./routes/index');
const mongodb = require('./db/db_config');
const cors = require('cors');
const bodyParser = require('body-parser');
const swaggerDoc = require('./swagger.json')
const swaggerUi = require('swagger-ui-express')



const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || 'localhost';

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

mongodb.initdb(err => {
    if(err) {
        console.error(err);
    }
    app.listen(PORT, HOST, () => {
        console.log(`Connected to database and server is running on http://${HOST}:${PORT}`);
    });
}) 