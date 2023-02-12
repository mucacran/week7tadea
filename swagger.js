const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API - Week 6',
    description: 'Poder trabajar'
  },
  host: 'localhost:8080',
  schemes: ['http']
};

const outputFile = 'swagger.json';
const endpointsFiles = ['./src/routes/index.js'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);
