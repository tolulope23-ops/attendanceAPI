const jwt = require('jsonwebtoken');
const { StatusCodes } = require("http-status-codes");
const JWT_SECRET = process.env.JWT_SECRET;

const isUserAuthenticated = async (req, res, next) =>{
    let accessToken;
    let authHeader = req.headers.authorization;
    if(authHeader && authHeader.startsWith('Bearer')){
        accessToken = authHeader.split(" ")[1];
    }
    if(!accessToken){
        return res.status(401).json({
            success: false,
            message:"please sign in",
            statusCode: StatusCodes.UNAUTHORIZED
        });
    }

    try {
        const payload = jwt.verify(accessToken, JWT_SECRET);
        req.user ={
            id: payload.id,
            email: payload.email
        }
    } catch (error) {
        next(error);
    }
    next();
};

module.exports = isUserAuthenticated;