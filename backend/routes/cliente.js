import express from "express";
import cliente from "../controllers/cliente.js";
import auth from "../middlewares/auth.js";
import adminLo from "../middlewares/adminLo.js";

const router = express.Router();

router.post("/registerCliente", cliente.registerCliente);
router.post("/loginC", cliente.loginC);
router.get("/listCliente",auth,adminLo, cliente.listCliente);
router.put("/updateCliente",auth,adminLo, cliente.updateCliente);
router.delete("/deleteCliente/:_id",auth,adminLo, cliente.deleteCliente);
export default router;
