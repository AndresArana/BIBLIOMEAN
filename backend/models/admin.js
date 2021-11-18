import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
    {
name: String,
email: String,
tipo: String,
password: String,
registerDate: { type: Date, default:Date.now},
dbStatus: Boolean
    }
);

const admin = mongoose.model("admins", adminSchema);

export default admin;