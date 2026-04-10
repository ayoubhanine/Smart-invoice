import express from "express";
import { registerUser,loginUser,getmyinfo } from "../controllers/auth.controller.js";
import { registerValidation,loginValidation,handleValidationErrors } from "../middlewares/validate.middleware.js";
import { protect } from "../middlewares/auth.middleware.js";

const router=express.Router();

router.post("/register",registerValidation,handleValidationErrors,registerUser);
router.post("/login",loginValidation,handleValidationErrors,loginUser);
router.get("/me",protect,getmyinfo)
export default router;
