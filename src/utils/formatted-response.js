const httpStatus = require('http-status');
// import config from '#config/app.config';

/**
 * *Formats the error message for the response.
 *
 * @param {string} message - The error message to be formatted.
 * @returns {string} The formatted error message.
 *
 */
const formatErrorMessage = (message) => {
  const formattedMessage = message.charAt(0).toUpperCase() + message.slice(1);
  return formattedMessage.endsWith('.')
    ? `${formattedMessage.slice(0, -1)}!`
    : `${formattedMessage}!`;
};

/**
 * *Method to send API responses in a standardized format.
 *
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {number} statusCode - The HTTP status code for the response.
 * @param {Object} payload - The payload to be included in the response
 * @param {string} message - The response message to be sent.
 *
 *
 */
const sendFormattedResponse = (req, res, statusCode, payload, message) => {
  // Get the base URL of the API from the request object
  const baseUrl = `${req.protocol}://${req.get('host')}`;

  // Set the response status code and statusInfo based on the statusCode
  const response = {
    dataset: payload ?? null,
    timestamp: new Date().toISOString(),
    request_URL: baseUrl + req.originalUrl,
    message: formatErrorMessage(message ?? ''),
    success: statusCode >= 200 && statusCode < 300,
    status: {
      status_code: statusCode,
      status_info: httpStatus[statusCode],
    },
    // publish: {
    //   version: config.api.version,
    //   developer: config.api.developer,
    // },
  };

  // Send the response with the formatted JSON data and the specified status code
  return res.status(statusCode).json(response);
};

/**
 * *Middleware to handle API responses in a consistent format.
 *
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The next function in the middleware chain.
 */
const responseHandler = (req, res, next) => {
  /**
   * *Method to send a successful API response.
   *
   * @param {number} statusCode - The HTTP status code for the response.
   * @param {string} message - The response message to be sent.
   * @param {Object} payload - The payload to be included in the response.
   */

  res.success = (statusCode, message, payload = null) => {
    return sendFormattedResponse(req, res, statusCode, payload, message);
  };

  /**
   * *Method to send an error API response.
   *
   * @param {number} statusCode - The HTTP status code for the response.
   * @param {string} message - The response message to be sent.
   * @param {Object|null} error - The error data to be included in the response.
   *
   
   */
  res.error = (statusCode, message, error = null) => {
    return sendFormattedResponse(req, res, statusCode, error, message);
  };

  return next();
};

module.exports = responseHandler;
