import express from "express";

import { createPayement } from "../controllers/payement.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router=express.Router();

router.post("/invoices/:id/payments",protect,createPayement);
export default router;
