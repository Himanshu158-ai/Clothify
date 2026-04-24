import {body,validationResult} from 'express-validator'

const validate = (req,res,next)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    next()
}

export const validateRegister = [
    body("name").notEmpty().withMessage("Name is required")
    .isLength({min:3,max:50}).withMessage("Name must be between 3 and 50 characters long"),
    body("email").isEmail().withMessage("Invalid Email"),
    body("password").isLength({min:6}).withMessage("Password must be at least 6 characters long"),
    body("contact").isLength({min:10,max:10}).withMessage("Contact must be 10 digits long"),
    validate
]

export const validateLogin = [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password").isLength({min:6}).withMessage("Password must be at least 6 characters long"),
    validate
]
