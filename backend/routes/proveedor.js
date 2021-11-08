import express from "express";
import proveedor from "../controllers/proveedor.js";

const router = express.Router()

router.post("/registerProveedor", proveedor.registerProveedor);
router.get("/listProveedor", proveedor.listProveedor);
export default router;