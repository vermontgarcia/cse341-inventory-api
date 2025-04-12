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
    tags: [
      { name: 'Users', description: 'Operations related to users' },
      { name: 'Brands', description: 'Operations related to brands' },
    ],
    servers: [
      {
        url: SERVER_URL,
      },
    ],
    components: {
      securitySchemes: {
        OAuth2GitHub: {
          type: 'oauth2',
          description: 'OAuth 2.0 using GitHub',
          flows: {
            authorizationCode: {
              authorizationUrl: 'https://github.com/login/oauth/authorize',
              tokenUrl: 'https://github.com/login/oauth/access_token',
              redirectUrl: 'https://your-app.com/oauth2/callback',
              scopes: {
                'user:email': 'Read user profile information',
              },
            },
          },
        },
        // BearerAuth: {
        //   type: 'http',
        //   scheme: 'bearer',
        //   bearerFormat: 'JWT', // GitHub returns an OAuth access token, not a JWT
        //   description:
        //     'Use the access token received from the server after GitHub login',
        // },
      },
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
              example: 'John',
            },
            lastName: {
              type: 'String',
              example: 'Dow',
            },
            phone: {
              type: 'String',
              example: '8001234567',
            },
            address: {
              type: 'String',
              example: '123 Principal Street, Big City',
            },
            state: {
              type: 'String',
              example: 'UT',
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
        RegisterUserBody: {
          type: 'object',
          properties: {
            name: {
              required: true,
              type: 'string',
              example: 'Johnw',
            },
            lastName: {
              required: true,
              type: 'string',
              example: 'Dow',
            },
            phone: {
              required: false,
              type: 'string',
              example: '8001234567',
            },
            address: {
              required: false,
              type: 'string',
              example: '123 Principal Street, Big City',
            },
            state: {
              required: false,
              type: 'string',
              example: 'UT',
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
        BrandBody: {
          type: 'object',
          properties: {
            name: {
              required: true,
              type: 'string',
              example: 'Mission Pride',
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
        BrandErrorExample: {
          type: 'object',
          properties: {
            brand: {
              type: 'string',
              required: true,
              example: 'Brand is required',
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
        GetAllBrands: {
          type: 'object',
          properties: {
            brands: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Brand',
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
        GetBrand: {
          type: 'object',
          properties: {
            brand: {
              $ref: '#/components/schemas/Brand',
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
        DeleteBrand: {
          type: 'object',
          properties: {
            msg: {
              type: 'string',
              example: 'Brand deleted successfully',
            },
          },
        },
        ServerError: {
          type: 'object',
          properties: {
            status: {
              type: 'integer',
              example: 500,
              description: 'HTTP status code',
            },
            message: {
              type: 'string',
              example: 'Internal server error',
              description: 'Description of the error',
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
        BrandNotFound: {
          type: 'object',
          properties: {
            msg: {
              type: 'string',
              example: 'Brand not found',
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
        BrandUnprocessableContent: {
          type: 'object',
          properties: {
            errors: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/BrandErrorExample',
              },
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.js'],
  security: [{ OAuth2GitHub: [] }],
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = swaggerSpec;
