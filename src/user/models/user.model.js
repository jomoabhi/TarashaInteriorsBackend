const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      // unique:true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Email is invalid');
        }
      },
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: true,
      minlength: 7,
      trim: true,
      validate(value) {
        if (value.toLowerCase().includes('password')) {
          throw new Error('Password cannot contain "password"');
        }
      },
    },
    mobiles: [
      {
        // required: true,
        countrycode: {
          type: String,
          required: true,
          trim: true,
        },
        mobile: {
          type: String,
          required: true,
          trim: true,
        },
      },
    ],

    // ismobileVerified: {
    //   type: Boolean,
    //   default: false,
    // },
    roleId: {
      type: Number,
      dafault: 2,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },

    addresses: [
      {
        type: String,
        isrequired: true,
      },
    ],
    // age: {
    //   type: Number,
    //   default: 0,
    //   validate(value) {
    //     if (value < 0) {
    //       throw new Error('Age must be a positive number');
    //     }
    //   },
    // },

    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
        // accessHistoryId: {
        //   type: mongoose.Schema.Types.ObjectId,
        //   ref: 'accesshistoryschema',
        //   required: true,
        // },
      },
    ],

    // OTP: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'UserOTP',
    // },
    avatar: {
      type: Buffer,
    },
  },

  {
    timestamps: true,
  }
);

userSchema.virtual('ckEditorDatas', {
  ref: 'ckEditorData',
  localField: '_id',
  foreignField: 'addedBy',
});

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;
  delete userObject.avatar;

  return userObject;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const expirationTime = Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60; // 7 days in seconds
  const token = jwt.sign({ _id: user.id.toString() }, process.env.JWT_SECRET, {
    expiresIn: expirationTime,
  });
  console.log(token);
  // user.tokens = user.tokens.concat({ token });
  // await user.save();
  return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await TarashaUser.findOne({ email });

  if (!user) {
    throw new Error('Unable to login');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Unable to login.Wrong Password');
  }

  return user;
};

userSchema.statics.findByCredentialsMobile = async (mobile, password) => {
  const user = await TarashaUser.findOne({ 'mobiles.mobile': mobile });
  // console.log(user);
  if (!user) {
    throw new Error('Unable to login');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Unable to login.Wrong Password');
  }

  return user;
};

//Hash the plain text password before saving
userSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

// Todo
//Delete user all data when user is removed
// userSchema.pre('remove', async function (next) {
//   const user = this;
//
//   next();
// });

const TarashaUser = mongoose.model('TarashaUser', userSchema);

module.exports = TarashaUser;
