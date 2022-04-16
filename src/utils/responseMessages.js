const RESPONSE_MESSAGES = {
  EDIT_SUCCESS: {
    code: "EDIT_SUCCESS",
    message: "Edited successfully",
  },
  DELETE_SUCCESS: {
    code: "DELETE_SUCCESS",
    message: "Deleted successfully",
  },
  INVALID_REQUEST: {
    code: "INVALID_REQUEST",
    message: "Invalid request data",
  },
  //user response messages
  INVALID_LOGIN_DATA: {
    code: "INVALID_LOGIN_DATA",
    message: "Username or Password is incorrect",
  },
  USER_EXIST: {
    code: "USER_EXIST",
    message: "User already exists",
  },
  USER_NOT_FOUND: {
    code: "USER_NOT_FOUND",
    message: "User not found",
  },
  //event response messages
  EVENT_NOT_FOUND: {
    code: "EVENT_NOT_FOUND",
    message: "Event not found",
  },
  EVENT_UPDATED: {
    code: "EVENT_UPADATED",
    message: "Event updated successfully",
  },
  //auth response messages
  MISSING_AUTH_TOKEN: {
    code: "MISSING_AUTH_TOKEN",
    message: "Request missing auth token for a protected endpoint",
  },
  INVALID_AUTH_TOKEN_PROVIDED: {
    code: "INVALID_AUTH_TOKEN_PROVIDED",
    message: "Provided auth token is invalid",
  },
};
module.exports = RESPONSE_MESSAGES;
