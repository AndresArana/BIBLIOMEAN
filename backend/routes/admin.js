import express from "express";
import admin from "../controllers/admin.js";
import auth from "../middlewares/auth.js";
import adminLo from "../middlewares/adminLo.js";

const router = express.Router();

router.post("/registerAdmin",auth, adminLo, admin.registerAdmin);
router.post("/login", admin.login);
router.delete("/deleteAdmin/:_id",auth, adminLo, admin.deleteAdmin);


export default router;