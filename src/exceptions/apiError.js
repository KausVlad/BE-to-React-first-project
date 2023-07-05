module.exports = class ApiError extends Error {
  status;
  errors;

  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static unauthorizedError() {
    return new ApiError(401, 'Unauthorized');
  }

  static badRequestError(massage, errors = []) {
    return new ApiError(400, massage, errors);
  }

  static notFoundError(message = 'Not Found') {
    return new ApiError(404, message);
  }

  static internalServerError(message = 'Internal Server Error') {
    return new ApiError(500, message);
  }
};
