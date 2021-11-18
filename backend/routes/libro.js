import express from "express";
import libro from "../controllers/libro.js";
import auth from "../middlewares/auth.js";
import adminLo from "../middlewares/adminLo.js";

const router = express.Router()

router.post("/registerLibro",auth, adminLo, libro.registerLibro);
router.get("/listLibro",auth, libro.listLibro);
router.get("/findLibro/:_id",auth, libro.findLibro);
router.put("/updateLibro",auth, adminLo, libro.updateLibro);
router.delete("/deleteLibro/:_id",auth, adminLo, libro.deleteLibro);
export default router;