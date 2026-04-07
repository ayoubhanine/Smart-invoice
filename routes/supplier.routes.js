import express from "express";

import { createSupplier,getsuppliers
    ,getsuppliersById
    ,updatesupplier,
deletesupplier } from "../controllers/supplier.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router=express.Router();

router.post("/suppliers",protect,createSupplier);
router.get("/suppliers",protect,getsuppliers);
router.get("/suppliers/:id",protect,getsuppliersById);
router.put("/suppliers/:id",protect,updatesupplier);
router.delete("/suppliers/:id",protect,deletesupplier)
export default router;