// utils/errorHandler.js
const logger = require('./logger');

// Base error class for the application
class AppError extends Error {
  constructor(message, statusCode, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational; // Indicates if this is an expected error
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    
    Error.captureStackTrace(this, this.constructor);
  }
}

// 400 - Bad Request Error
class BadRequestError extends AppError {
  constructor(message = 'Bad request') {
    super(message, 400);
  }
}

// 401 - Unauthorized Error
class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized') {
    super(message, 401);
  }
}

// 403 - Forbidden Error
class ForbiddenError extends AppError {
  constructor(message = 'Forbidden') {
    super(message, 403);
  }
}

// 404 - Not Found Error
class NotFoundError extends AppError {
  constructor(message = 'Resource not found') {
    super(message, 404);
  }
}

// 409 - Conflict Error
class ConflictError extends AppError {
  constructor(message = 'Resource conflict') {
    super(message, 409);
  }
}

// 429 - Too Many Requests Error
class TooManyRequestsError extends AppError {
  constructor(message = 'Too many requests') {
    super(message, 429);
  }
}

// 500 - Internal Server Error
class InternalServerError extends AppError {
  constructor(message = 'Something went wrong', isOperational = false) {
    super(message, 500, isOperational);
  }
}

// Error handler middleware
const errorHandler = (err, req, res, next) => {
  // Set default values
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  
  // Log error
  if (err.statusCode >= 500) {
    logger.error(`${err.statusCode} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    logger.error(err.stack);
  } else {
    logger.warn(`${err.statusCode} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  }
  
  // Determine environment
  const isProd = process.env.NODE_ENV === 'production';
  
  // Send error response
  if (isProd && err.isOperational) {
    // Operational errors - send details
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  } else if (isProd) {
    // Programming or unknown errors - don't leak error details
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong'
    });
  } else {
    // Development mode - send all error details
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      stack: err.stack,
      error: err
    });
  }
};

// Catch async errors in route handlers
const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

module.exports = {
  AppError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
  TooManyRequestsError,
  InternalServerError,
  errorHandler,
  catchAsync
};