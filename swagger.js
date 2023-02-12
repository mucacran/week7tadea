const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API - Week 6',
    description: 'Poder trabajar'
  },
  host: 'week6-tarea.onrender.com',
  schemes: ['https']
};

const outputFile = 'swagger.json';
const endpointsFiles = ['./src/routes/index.js'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);
