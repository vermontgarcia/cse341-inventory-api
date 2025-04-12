const User = require('../models/User');

const getAllUsers = async (req, res) => {
  try {
    const usersRaw = await User.find();
    const users = usersRaw.map((user) => {
      return {
        id: user.id,
        ...user._doc,
        _id: undefined,
        __v: undefined,
      };
    });

    return res.status(200).json({
      users,
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const userRaw = await User.findById(id);
    if (userRaw) {
      const user = {
        id: userRaw.id,
        ...userRaw._doc,
        _id: undefined,
        __v: undefined,
      };
      return res.status(200).json({ user });
    } else {
      return res.status(404).json({ msg: 'User not found' });
    }
  } catch (error) {
    console.log('Error fetching user: ', error);
    return res.status(500).json({ error: 'Fetching User Error' });
  }
};

const registerUser = async (req, res) => {
  try {
    const { name, lastName, phone, address, state, email, password } = req.body;
    const userRaw = await User.register(
      { name, email, lastName, phone, address, state },
      password
    );
    if (userRaw) {
      const newUser = await User.findById(userRaw.id);
      const user = {
        id: newUser.id,
        ...userRaw._doc,
        hash: undefined,
        salt: undefined,
        _id: undefined,
        __v: undefined,
      };
      return res.status(201).json({ user });
    }
  } catch (error) {
    res.status(422).json({ error });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  try {
    const userRaw = await User.findByIdAndUpdate(
      id,
      { name, email, password },
      {
        new: true,
      }
    );
    if (userRaw) {
      const user = {
        id: userRaw.id,
        ...userRaw._doc,
        _id: undefined,
        __v: undefined,
      };
      return res.status(200).json({ user });
    } else {
      return res.status(404).json({ msg: 'User not found' });
    }
  } catch (error) {
    console.log('Error updating user: ', error);
    return res.status(500).json({ error: 'Updating User Error' });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (user) {
      return res.status(200).json({ msg: 'User deleted successfully' });
    } else {
      return res.status(404).json({ msg: 'User not found' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Deleting User Error' });
  }
};

module.exports = {
  getAllUsers,
  getUser,
  registerUser,
  updateUser,
  deleteUser,
};
