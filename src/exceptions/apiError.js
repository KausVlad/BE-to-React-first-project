module.exports = class ApiError extends Error {
  status;
  errors;

  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static UnauthorizeError() {
    return new ApiError(401, 'Unauthorized');
  }

  static BadRequestError(massage, errors = []) {
    return new ApiError(400, massage, errors);
  }
};