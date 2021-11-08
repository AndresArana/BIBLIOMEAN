import express from "express";
import cliente from "../controllers/cliente.js";

const router = express.Router()

router.post("/registerCliente", cliente.registerCliente);
router.get("/listCliente", cliente.listCliente);

export default router;