const swaggerJsDoc = require('swagger-jsdoc');
const { SERVER_URL } = require('../utils/const.env');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Inventory API',
      version: '1.0.0',
      description: 'API documentation for managing inventory of products',
    },
    servers: [
      {
        url: SERVER_URL,
      },
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              example: '67c921fe5c73a5b0fffdd325',
            },
            name: {
              type: 'String',
              example: 'John Dow',
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'john.dow@email.com',
            },
          },
        },
        Wharehouse: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              example: '67c921fe5c73a5b0fffdd325',
            },
            name: {
              type: 'String',
              example: 'Pantry',
            },
            userId: {
              type: 'string',
              example: '67c921fe5c73a5b0fffdd325',
            },
          },
        },
        Product: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              example: '67c921fe5c73a5b0fffdd325',
            },

            name: {
              type: 'string',
              example: 'Fruit Mix',
            },
            description: {
              type: 'string',
              example: 'Fruit mix in extra light syrup',
            },
            netContent: {
              type: 'string',
              example: '425 g',
            },
            expiration: {
              type: 'object',
              properties: {
                type: {
                  type: 'string',
                  enum: ['Expiration Date', 'Best Before'],
                  example: 'Best Before',
                },
                date: {
                  type: 'string',
                  example: '09/2026',
                },
              },
            },
            brandId: {
              type: 'string',
              example: '67c921fe5c73a5b0fffdd325',
            },
            warehouseId: {
              type: 'string',
              example: '67c921fe5c73a5b0fffdd325',
            },
          },
        },
        Brand: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              example: '67c921fe5c73a5b0fffdd325',
            },
            name: {
              type: 'string',
              example: 'Mission Pride',
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = swaggerSpec;
