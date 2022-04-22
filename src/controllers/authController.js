require("dotenv/config");
const authService = require("../services/authService");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { NotFound, BadRequest } = require("../utils/errors");
const responseMessages = require("../utils/responseMessages");

//Register a new User
async function registerUser(req, res, next) {
  try {
    const { username, email, password, code } = req.body;
    if (
      !username ||
      !email ||
      !password ||
      !code ||
      code !== process.env.REGISTER_CODE
    ) {
      return next(new BadRequest(responseMessages.INVALID_REQUEST));
    }
    //Check if the user exits
    const user = await authService.checkUserExists(username, email);
    if (user) {
      return next(new BadRequest(responseMessages.USER_EXIST));
    }

    //hasing the password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    //Create the user
    const registerCridentails = {
      username,
      email,
    };
    registerCridentails.password = hash;
    const registeredUser = await authService.registerUser(registerCridentails);
    res.send(registeredUser);
  } catch (err) {
    next(err);
  }
}

//logging in a user
async function loginUser(req, res, next) {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return next(new BadRequest(responseMessages.INVALID_REQUEST));
    }

    //Check if the user exits
    const user = await authService.getUserByUsername(username);
    if (!user) {
      return next(new NotFound(responseMessages.INVALID_LOGIN_DATA));
    }

    //Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(new BadRequest(responseMessages.INVALID_LOGIN_DATA));
    }

    //Generate the token
    const token = crypto.randomBytes(20).toString("hex");
    const data = {
      userId: user.id,
      token,
      devicePlatform: req.body.devicePlatform || "Unknown",
      location: req.body.location || "Unknown",
    };

    //save generated token
    const authToken = await authService.saveToken(data);

    //check token is saved
    if (!authToken) {
      return next(new BadRequest(responseMessages.INVALID_REQUEST));
    }

    //send back the token
    const userData = {
      id: user.id,
      username: user.username,
      email: user.email,
    };

    res.send({
      token,
      user: userData,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  registerUser,
  loginUser,
};
