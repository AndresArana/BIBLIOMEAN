import express from "express";
import libro from "../controllers/libro.js";

const router = express.Router()

router.post("/registerLibro", libro.registerLibro);
router.get("/listlibro", libro.listLibro);
export default router;