// NOTE: Name this file 'errorHandler.js' or 'globalErrorHandler.js'

const AppError = require("../utils/appError"); // <-- You must implement this class

// Handles production error messages (sends minimal info)
const sendErrorProd = (err, res) => {
  // Operational errors (e.g., 400 Bad Request, 401 Unauthorized)
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  // Programming or unknown errors (e.g., DB connection fail)
  // We log the error but send a generic message to the client for security.
  console.error("ERROR 💥", err);
  res.status(500).json({
    status: "error",
    message: "Something went very wrong on the server!",
  });
};

module.exports = (err, req, res, next) => {
  // Set default status code and status if not defined (e.g., from unhandled rejection)
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  // In a production environment, send minimal details for security
  if (process.env.NODE_ENV === "production") {
    // Here you would typically handle Mongoose-specific errors (CastError, ValidationError)
    // by converting them into AppError objects before sending the response.
    sendErrorProd(err, res);
  } else {
    // Development environment: send all error details
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }
};
