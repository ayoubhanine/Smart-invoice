import express from "express";
import { createInvoice,getinvoices } from "../controllers/invoice.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
const router=express.Router()

router.post("/invoices",protect,createInvoice);
router.get("/invoices",protect,getinvoices);

export default router; 