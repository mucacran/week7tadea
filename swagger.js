const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API - Week 7',
    description: 'Poder trabajar'
  },
  host: 'https://week7tarea.onrender.com',
  schemes: ['https']
};

const outputFile = 'swagger.json';
const endpointsFiles = ['./src/routes/index.js'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);
