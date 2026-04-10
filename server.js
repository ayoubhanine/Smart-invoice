import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js"
import authRoutes from "./routes/auth.routes.js";
import supplierRoutes from "./routes/supplier.routes.js";
import invoiceRoutes from "./routes/invoice.routes.js";
import payementsRoutes from "./routes/payement.routes.js"

dotenv.config();
connectDB();

const app=express();

app.use(express.json());
app.use("/api",authRoutes);
app.use("/api",supplierRoutes);
app.use("/api",invoiceRoutes);
app.use("/api",payementsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});