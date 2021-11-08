import mongoose from "mongoose";

const libroSchema = new mongoose.Schema(
    {
name: String,
author: String,
yearPublication: String,
registerDate: { type: Date, default:Date.now},
pages: String,
gender: String,
price: Number,
    }
);

const libro = mongoose.model("libros", libroSchema);

export default libro;