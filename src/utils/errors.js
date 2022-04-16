class GeneralError extends Error {
  constructor(message) {
    super();
    this.message = message;
    this.http_code = 500;
  }
}
class BadRequest extends GeneralError {
  constructor(message) {
    super(message || { code: 'BAD_REQUEST', message: 'Bad Request' });
    this.http_code = 400;
  }
}
class Unauthorised extends GeneralError {
  constructor(message) {
    super(message || { code: 'UN_AUTHORIZED', message: 'Unauthorised' });
    this.http_code = 401;
  }
}
class NotFound extends GeneralError {
  constructor(message) {
    super(message || { code: 'NOT_FOUND', message: 'Not Found' });
    this.http_code = 404;
  }
}
class NotAcceptable extends GeneralError {
  constructor(message) {
    super(message || { code: 'NOT_ACCEPTABLE', message: 'Not Acceptable' });
    this.http_code = 406;
  }
}
module.exports = {
  GeneralError,
  BadRequest,
  NotFound,
  Unauthorised,
  NotAcceptable,
};