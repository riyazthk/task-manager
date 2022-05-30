const mongoose = require("mongoose");
var validator = require("validator");
var jwt = require("jsonwebtoken");
const { passwordhash, boolHashMatch } = require("../utils/hasing");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      validate(value) {
        if (value.toLowerCase().includes("password")) {
          throw new Error("Dont use password name as password");
        }
      },
    },
    email: {
      type: String,
      unique: true,
      required: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email Id");
        }
      },
    },
    tokens: [{ token: { type: String, require: true } }],
  },
  {
    timestamps: true,
  }
);

userSchema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "owner",
});

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;
  return userObject;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user?._id.toString() }, "Thisisnewcourse");
  user.tokens = user.tokens.concat({ token });
  const data = await user.save();
  return { data, token };
};

userSchema.methods.findEmailRegister = async function () {
  const user = this;
  const dupemail = await User.findOne({ email: user.email });
  if (dupemail) {
    throw new Error("Email already register");
    // return "Email is already registered";
  }
  return user;
};

userSchema.statics.findByCredentials = async function (email, password) {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Email id is not registered");
  }
  const isMatch = await boolHashMatch(password, user.password);
  if (!isMatch) {
    throw new Error("Password is incorrect");
  }
  return user;
};

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await passwordhash(user.password);
  }
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
