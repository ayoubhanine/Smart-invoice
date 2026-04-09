import express from "express";

import { createPayement,getpayements } from "../controllers/payement.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router=express.Router();

router.post("/invoices/:id/payments",protect,createPayement);
router.get("/invoices/:id/payments",protect,getpayements);
export default router;
