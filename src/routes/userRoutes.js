const express = require('express');
const {
  getAllUsers,
  getUser,
  registerUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

const userRouter = express.Router();

userRouter.get('/', getAllUsers);
userRouter.get('/:id', getUser);
userRouter.post('/', registerUser);
userRouter.put('/:id', updateUser);
userRouter.delete('/:id', deleteUser);

module.exports = userRouter;
