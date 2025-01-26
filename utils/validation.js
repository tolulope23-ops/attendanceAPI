const {body, validationResult} = require('express-validator');
const validateSignUp = () => {
    return [
     body("fullName")
       .notEmpty()
       .withMessage("name cannot be empty ")
       .isLength({min:5}),
 
     body("email")
       .notEmpty()
       .withMessage("Email cannot be empty")
       .isEmail()
       .withMessage("please provide a valid email address"),
 
     body("password")
       .notEmpty()
       .withMessage("Password cannot be empty")
       .isLength({min:5})
       .withMessage("Password must be at least 6 characters"),

       body("phone")
       .notEmpty()
       .withMessage("phone cannot be empty")
       .isLength({min:11})
       .withMessage("phone is incorrect"),
    ]
}

const validateSignIn = () => {
  return [
   body("email")
     .notEmpty()
     .withMessage("Email cannot be empty")
     .isEmail()
     .withMessage("please provide a valid email address"),

   body("password")
     .notEmpty()
     .withMessage("Password cannot be empty")
     .isLength({min:5})
     .withMessage("Password must be at least 6 characters"),
  ]
}

const validate = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next({ errors: errors.array() });
    }
    next();
}




module.exports = {validateSignUp, validateSignIn, validate}