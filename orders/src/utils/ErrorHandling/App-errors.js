const STATUS_CODES = {
  OK: 200,
  BAD_REQUEST: 400,
  UN_AUTHORISED: 403,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
};

export class AppError extends Error {
  constructor(
    name,
    statusCode,
    description,
    isOperational,
    errorStack,
    logingErrorResponse
  ) {
    super(description);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = name;
    this.statusCode = statusCode;
    this.description = description;
    this.isOperational = isOperational;
    this.errorStack = errorStack;
    this.logError = logingErrorResponse;
    Error.captureStackTrace(this);
  }
}

// 500 errors
export class InternalError extends AppError {
  constructor(
    description,
    errorStack = "N/A",
    isOperational = true,
    logingErrorResponse = true
  ) {
    super(
      "InternalError",
      STATUS_CODES.INTERNAL_ERROR,
      description,
      isOperational,
      errorStack,
      logingErrorResponse
    );
  }
}

// 400 errors
export class BadRequestError extends AppError {
  constructor(
    description,
    errorStack = "N/A",
    isOperational = true,
    logingErrorResponse = true
  ) {
    super(
      "BadRequestError",
      STATUS_CODES.BAD_REQUEST,
      description,
      isOperational,
      errorStack,
      logingErrorResponse
    );
  }
}