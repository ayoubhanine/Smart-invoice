import { body,validationResult } from "express-validator";

export const registerValidation = [
  body("name").notEmpty().withMessage("name is required"),
  body("email").isEmail().withMessage("valid email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 chars"),
    body("passwordConfirmation")
    .notEmpty()
    .withMessage("password confirmation is required")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("passwords do not match");
      }
      return true;
    }),
  body("role")
    .optional()
    .isIn(["client", "admin"])
    .withMessage("invalid role"),
];
export const loginValidation = [
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").notEmpty().withMessage("password is required"),
];
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation failed",
      errors: errors.array().map((err) => ({
        message: err.msg,
      })),
    });
  }
  next();
};