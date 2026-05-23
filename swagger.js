const swaggerAutogen = require('swagger-autogen')()

const docs = {
    info: {
        title: 'Members and Arts APIs',
        description: 'Sample APIs to manage members and arts collection'
    },
    host: 'localhost:5000',
    schemes: ['http']
}

const outputFile = './swagger.json';
const endpointsFiles = [
    './routes/index',
];

swaggerAutogen(outputFile, endpointsFiles, docs)