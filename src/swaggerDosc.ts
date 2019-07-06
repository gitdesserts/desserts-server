const swaggerJSoc = require('swagger-jsdoc');

const swaggerDefinition = {
  info: {
    title: 'Desserts API',
    version: '1.0.0'
  }
};

const options = {
  swaggerDefinition,
  apis: ['./api/*/index.ts']
};
