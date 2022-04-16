const AuthService = require("../services/AuthService");
const { Unauthorised } = require("../utils/errors");
const responseMessages = require("../utils/responseMessages");
async function auth(req, res, next) {
  const token = req.header("Authorization");
  if (!token) {
    return next(new Unauthorised(responseMessages.MISSING_AUTH_TOKEN));
  }
  try {

    //getting token details
    const authToken = await AuthService.getAuthTokenDetails(token);
    if (!authToken) {
      return next(
        new Unauthorised(responseMessages.INVALID_AUTH_TOKEN_PROVIDED)
      );
    }

    //check user exists and get user details
    const user = await AuthService.getUserById(authToken.userId);
    if (!user) {
      return next(
        new Unauthorised(responseMessages.INVALID_AUTH_TOKEN_PROVIDED)
      );
    }

    //adding user details to the request
    req.authToken = authToken;
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
}
module.exports = auth;
