const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema(
  {
    githubId: {
      type: String,
      unique: true,
      sparse: true,
    }, // Stores GitHub user ID
    name: {
      type: String,
      // required: [true, 'Name is required'],
      sparse: true,
    },
    email: {
      type: String,
      // required: [true, 'Email is required'],
      unique: [true, 'Email aready registered'],
      sparse: true,
    },
    displayName: {
      type: String,
    }, // GitHub display name
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  }
);

UserSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

module.exports = mongoose.model('User', UserSchema);
