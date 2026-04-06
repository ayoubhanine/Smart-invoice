import express from "express";
import { registerUser,loginUser } from "../controllers/auth.controller.js";
import { registerValidation,loginValidation,handleValidationErrors } from "../middlewares/validate.middleware.js";

const router=express.Router();

router.post("/register",registerValidation,handleValidationErrors,registerUser);
router.post("/login",loginValidation,handleValidationErrors,loginUser);
export default router;
