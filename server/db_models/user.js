/* eslint-disable func-names */
/* eslint-disable space-before-function-paren */
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const saltRounds = 10;

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
  verified: String,
  signedToken: String,
  signedTokenExpires: Date,
  resetPasswordToken: String,
  resetPasswordTokenExpires: Date,
});

UserSchema.pre('save', function checkPassword(next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = bcrypt.hashSync(this.password, saltRounds);
  return next();
});

UserSchema.methods.isPasswordCorrect = function(password, callback) {
  bcrypt.compare(password, this.password, (err, same) => {
    if (err) {
      callback(err);
    } else {
      callback(err, same);
    }
  });
};

UserSchema.statics.EmailConfirmation = {
  sent: 'sent',
  resent: 'resent',
  verified: 'verified',
};

UserSchema.statics.findByUsernameOrEmail = function findByUsernameOrEmail(username) {
  const query = {
    $or: [
      { username },
      { email: username },
    ]
  };
  return this.findOne(query).exec();
};

const UserModel = mongoose.model('User', UserSchema);
export default UserModel;
