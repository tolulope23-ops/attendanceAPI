const { StatusCodes } = require("http-status-codes")

const errorHandlerMiddleware = async(err, req, res, next) =>{
    let errors = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        message: err.message || 'Something went wrong, please try again'
    }

    if (err.name === "ValidationError") {
        Object.values(err.errors).forEach(({ properties }) => {
          errors[properties.path] = properties.message;
        });
        errors.statusCode = StatusCodes.BAD_REQUEST;
        errors.message = err.name;
    }

    const {statusCode, message, ...error} = errors;
    return res.status(statusCode).json({
        statusCode,
        message,
        ...error
    })
}

module.exports = errorHandlerMiddleware;