module.exports = (err, req, res, next) => {
  const response = err.message || {
    code: 'ERROR',
    message: 'Internal server error.',
  };
  res.status(err.http_code || 500).send(response);
};