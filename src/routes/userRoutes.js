const express = require('express');
const {
  getAllUsers,
  getUser,
  registerUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

const userRouter = express.Router();

/**
 * @swagger
 * /v1/users:
 *   get:
 *     summary: Get all users
 *     description: Get a list of all users.
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
userRouter.get('/', getAllUsers);

/**
 * @swagger
 * /v1/users/{id}:
 *   get:
 *     summary: Get single user
 *     description: Fetch a single user by its id.
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
userRouter.get('/:id', getUser);

/**
 * @swagger
 * /v1/users:
 *   post:
 *     summary: Create new user
 *     description: Create new user based on data provided.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/CreateUserBody"
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
userRouter.post('/', registerUser);

/**
 * @swagger
 * /v1/users:
 *   put:
 *     summary: Update user
 *     description: Update user based on data provided and its id.
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
userRouter.put('/:id', updateUser);

/**
 * @swagger
 * /v1/users/{id}:
 *   delete:
 *     summary: Delete user
 *     description: Delete a specific user by its id.
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
userRouter.delete('/:id', deleteUser);

module.exports = userRouter;
