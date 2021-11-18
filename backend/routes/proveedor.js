import express from "express";
import proveedor from "../controllers/proveedor.js";
import auth from "../middlewares/auth.js";
import adminLo from "../middlewares/adminLo.js";

const router = express.Router()

router.post("/registerProveedor",auth,adminLo, proveedor.registerProveedor);
router.get("/listProveedor",auth, adminLo, proveedor.listProveedor);
router.put("/updateProveedor",auth, adminLo, proveedor.updateProveedor);
router.delete("/deleteProveedor/:_id",auth, adminLo, proveedor.deleteProveedor);
export default router;