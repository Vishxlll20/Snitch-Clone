import { body, validationResult } from "express-validator";

function validateRequest(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

export const validateRegister = [
    body("name")
        .not().isEmpty().withMessage("Name is required")
        .isLength({ min: 3 }).withMessage("Name must be at least 3 characters long"),
    body("email")
        .isEmail().withMessage("Please provide a valid email"),
    body("password")
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    body("contact")
        .not().isEmpty().withMessage("Contact is required")
        .matches(/^\d{10}$/).withMessage("Contact must be a valid 10-digit number"),

    validateRequest
];