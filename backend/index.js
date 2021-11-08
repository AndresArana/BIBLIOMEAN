import express from "express";
import cors from "cors";
import db from "./db/db.js";
import dotenv from "dotenv";
import libro from "./routes/libro.js";
import cliente from "./routes/cliente.js";
import proveedor from "./routes/proveedor.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/libro", libro);
app.use("/api/cliente", cliente);
app.use("/api/proveedor", proveedor);
app.listen(process.env.PORT, () =>
  console.log("Backend server running on port: " + process.env.PORT)
);
db.dbConnection();
