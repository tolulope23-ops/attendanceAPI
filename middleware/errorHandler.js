const { StatusCodes } = require("http-status-codes");


const errorHandlerMiddleware = async(err, req, res, next) =>{
  console.log(err);
    let errors = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        message: err.message || 'Something went wrong, please try again'
    }

    if (err.errors && Array.isArray(err.errors)) {
        errors.statusCode = StatusCodes.BAD_REQUEST;
        errors.message = "Validation failed";
        errors.error = err.errors.map((error) => ({
          field: error.path,
          message: error.msg,
        }));
      }
    
      if (err.name === "ValidationError") {
        Object.values(err.errors).forEach(({ properties }) => {
          errors[properties.path] = properties.message;
        });
        errors.statusCode = StatusCodes.BAD_REQUEST;
        errors.message = err.name;
      }
    
      if (err.name === "TokenExpiredError") {
        errors.statusCode = StatusCodes.UNAUTHORIZED;
        errors.message = "please sign in again - token expired";
      }
    
      if (err.name === "JsonWebTokenError") {
        errors.statusCode = StatusCodes.UNAUTHORIZED;
        errors.message = "invalid, refresh token";
      }
      if (err.code && err.code === 11000) {
        errors.message = `sorry, user with this ${Object.keys(
          err.keyValue
        )} already exists, please choose another ${Object.keys(err.keyValue)}`;
        errors.statusCode = StatusCodes.BAD_REQUEST;
      }
      if (err.name === "CastError") {
        errors.message = `No item found with id: ${err.value}`;
        errors.statusCode = StatusCodes.NOT_FOUND;
      }

    const {statusCode, message, ...error} = errors;
    
    return res.status(statusCode).json({
        statusCode,
        message,
        ...error
    })
}

module.exports = {errorHandlerMiddleware};