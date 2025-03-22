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
            createdAt: {
              type: 'string',
              example: '2025-03-22T06:57:03.719Z',
            },
            updatedAt: {
              type: 'string',
              example: '2025-03-22T06:57:03.719Z',
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
            createdAt: {
              type: 'string',
              example: '2025-03-22T06:57:03.719Z',
            },
            updatedAt: {
              type: 'string',
              example: '2025-03-22T06:57:03.719Z',
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
            createdAt: {
              type: 'string',
              example: '2025-03-22T06:57:03.719Z',
            },
            updatedAt: {
              type: 'string',
              example: '2025-03-22T06:57:03.719Z',
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
            createdAt: {
              type: 'string',
              example: '2025-03-22T06:57:03.719Z',
            },
            updatedAt: {
              type: 'string',
              example: '2025-03-22T06:57:03.719Z',
            },
          },
        },
        CreateUserBody: {
          type: 'object',
          properties: {
            name: {
              required: true,
              type: 'string',
              example: 'John Dow',
            },
            email: {
              type: 'string',
              required: true,
              format: 'email',
              example: 'john.dow@email.com',
            },
            password: {
              type: 'string',
              required: true,
              example: 'myP5ssw0rd!',
            },
          },
        },
        UpdateUserBody: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              example: 'John Dow',
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'john.dow@email.com',
            },
            password: {
              type: 'string',
              example: 'myP5ssw0rd!',
            },
          },
        },
        ErrorExample: {
          type: 'object',
          properties: {
            email: {
              type: 'string',
              example: 'Must be a valid email',
            },
          },
        },
        GetAllUsers: {
          type: 'object',
          properties: {
            users: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/User',
              },
            },
          },
        },
        GetUser: {
          type: 'object',
          properties: {
            user: {
              $ref: '#/components/schemas/User',
            },
          },
        },
        DeleteUser: {
          type: 'object',
          properties: {
            msg: {
              type: 'string',
              example: 'User deleted successfully',
            },
          },
        },
        ServerError: {
          type: 'object',
          properties: {
            error: {
              type: 'object',
              properties: {
                error: {
                  type: 'object',
                },
              },
            },
          },
        },
        UserNotFound: {
          type: 'object',
          properties: {
            msg: {
              type: 'string',
              example: 'User not found',
            },
          },
        },
        UnprocessableContent: {
          type: 'object',
          properties: {
            errors: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/ErrorExample',
              },
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
