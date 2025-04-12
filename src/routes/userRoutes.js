const express = require('express');
const {
  getAllUsers,
  getUser,
  registerUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');
const {
  registerUserRulesInterceptor,
  validateRules,
  updateUserRulesInterceptor,
} = require('../middleware/validator');
const { isAuthenticated } = require('../middleware/authenticate');

const userRouter = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: User management endpoints
 */

/**
 * @swagger
 * /v1/users:
 *   get:
 *     summary: Get all users
 *     description: Get a list of all users.
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Users fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/GetAllUsers"
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ServerError"
 */
userRouter.get('/', isAuthenticated, getAllUsers);

/**
 * @swagger
 * /v1/users/{id}:
 *   get:
 *     summary: Get single user
 *     description: Fetch a single user by its id.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique ID of the user.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/GetUser"
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/UserNotFound"
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ServerError"
 */
userRouter.get('/:id', isAuthenticated, getUser);

/**
 * @swagger
 * /v1/users:
 *   post:
 *     summary: Register new user
 *     description: Register new user based on data provided.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/RegisterUserBody"
 *     responses:
 *       201:
 *         description: User registered successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/GetUser"
 *       422:
 *         description: Required data incorrect/missing.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/UnprocessableContent"
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ServerError"
 */
userRouter.post(
  '/',
  isAuthenticated,
  registerUserRulesInterceptor(),
  validateRules,
  registerUser
);

/**
 * @swagger
 * /v1/users/{id}:
 *   put:
 *     summary: Update user
 *     description: Update user based on data provided and its id.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique ID of the user.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/UpdateUserBody"
 *     responses:
 *       200:
 *         description: User fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/GetUser"
 *       422:
 *         description: Required data incorrect/missing.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/UnprocessableContent"
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ServerError"
 */
userRouter.put(
  '/:id',
  isAuthenticated,
  updateUserRulesInterceptor(),
  validateRules,
  updateUser
);

/**
 * @swagger
 * /v1/users/{id}:
 *   delete:
 *     summary: Delete user
 *     description: Delete a specific user by its id.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique ID of the user.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: user deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/DeleteUser"
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/UserNotFound"
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ServerError"
 */
userRouter.delete('/:id', isAuthenticated, deleteUser);

module.exports = userRouter;
