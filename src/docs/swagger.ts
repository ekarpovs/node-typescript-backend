import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    version: 'v1.0.0',
    title: 'Swagger Project for node-typescript-backend',
    description: 'Implementation of Swagger with TypeScript',
  },
  servers: [
    {
      url: 'http://localhost:3007',
      description: 'Local',
    },
    {
      url: 'https://node-typescript-backend.onrender.com',
      description: 'Render',
    },
  ],
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./index.ts'];

swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc);
