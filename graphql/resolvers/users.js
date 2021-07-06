const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");

const { SECRET_KEY } = require("../../config");
const {
  validateRegisterInput,
  validateLoginInput
} = require("../../utils/validators");

const generateToken = ({ _id, username, email }) => {
  const token = jwt.sign({ id: _id, username, email }, SECRET_KEY, {
    expiresIn: "1h"
  });
  return token;
};

module.exports = {
  Mutation: {
    register: async (
      _,
      { registerInput: { username, email, password, confirmPassword } },
      context,
      info
    ) => {
      const { errors, valid } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );
      if (!valid) throw new UserInputError("errors", { errors });

      let user = await User.findOne({ username });
      if (user) {
        throw new UserInputError("username is taken", {
          errors: {
            username: "this username is taken"
          }
        });
      }

      password = await bcrypt.hash(password, 12);
      user = new User({
        username,
        email,
        password,
        createdAt: new Date().toISOString()
      });
      const res = await user.save();
      const token = generateToken(res);
      return {
        ...res._doc,
        id: res._id,
        token
      };
    },
    login: async (_, { username, password }) => {
      const { errors, valid } = validateLoginInput(username, password);
      if (!valid) throw new UserInputError("errors", { errors });
      const user = await User.findOne({ username });
      if (!user) {
        errors.general = "wrong credentials";
        throw new UserInputError("wrong credentials", { errors });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = "wrong credentials";
        throw new UserInputError("wrong credentials", { errors });
      }

      const token = generateToken(user);
      return {
        ...user._doc,
        id: user._id,
        token
      };
    }
  }
};
