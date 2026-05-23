const swaggerAutogen = require('swagger-autogen')()

const docs = {
    info: {
        title: 'Members and Arts APIs',
        description: 'Sample APIs to manage members and arts collection'
    },
    host: 'cse341-crud-besb.onrender.com',
    schemes: ['https']
}

const outputFile = './swagger.json';
const endpointsFiles = [
    './routes/index',
];

swaggerAutogen(outputFile, endpointsFiles, docs)