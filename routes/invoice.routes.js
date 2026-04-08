import express from "express";
import { createInvoice,
    getinvoices,
    getinvoiceById,
    updateinvoice,
    deleteinvoice} from "../controllers/invoice.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
const router=express.Router()

router.post("/invoices",protect,createInvoice);
router.get("/invoices",protect,getinvoices);
router.get("/invoices/:id",protect,getinvoiceById);
router.put("/invoices/:id",protect,updateinvoice);
router.delete("/invoices/:id",protect,deleteinvoice);

export default router; 