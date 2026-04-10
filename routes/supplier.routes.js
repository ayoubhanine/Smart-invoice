import express from "express";
import { getstats } from "../controllers/stats.controller.js";
import { createSupplier,getsuppliers
    ,getsuppliersById
    ,updatesupplier,
deletesupplier } from "../controllers/supplier.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { getdashboared } from "../controllers/dashboard .controller.js";

const router=express.Router();

router.post("/suppliers",protect,createSupplier);
router.get("/suppliers",protect,getsuppliers);
router.get("/suppliers/:id",protect,getsuppliersById);
router.put("/suppliers/:id",protect,updatesupplier);
router.delete("/suppliers/:id",protect,deletesupplier);
router.get("/suppliers/:id/stats",protect,getstats);
router.get("/dashboard",protect,getdashboared)

export default router;