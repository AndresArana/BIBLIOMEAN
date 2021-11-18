import admin from "../models/admin.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import moment from "moment";

//registrar admin
const registerAdmin = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password)
    return res.status(400).send("incomplete data");

  const existingAdmin = await admin.findOne({ name: req.body.name });
  if (existingAdmin)
    return res.status(400).send({ message: "the admin already exist" });

  const hash = await bcrypt.hash(req.body.password, 10);

  const adminSchema = new admin({
    name: req.body.name,
    email: req.body.email,
    tipo: req.body.tipo,
    password: hash,
    dbStatus: true,
  });

  const result = await adminSchema.save();
  if (!result)
    return res.status(400).send({ message: "failed register admin" });
  return res.status(200).send({ result });
};

//eliminar admin
const deleteAdmin = async (req, res) => {
  const adminDelete = await admin.findByIdAndDelete({
    _id: req.params["_id"],
  });
  if (!adminDelete) return res.status(400).send({ message: "admin no found" });
  res.status(200).send({ message: "admin deleted" });
};

//login
const login = async (req, res) => {
  if (!req.body.email || !req.body.password)
    return res.status(400).send({ message: "Incomplete data" });

  const userLogin = await admin.findOne({ email: req.body.email });
  if (!userLogin)
    return res.status(400).send({ message: "Wrong email or password" });

  const hash = await bcrypt.compare(req.body.password, userLogin.password);
  if (!hash)
    return res.status(400).send({ message: "Wrong email or password" });

  try {
    return res.status(200).json({
      token: jwt.sign(
        {
          _id: userLogin._id,
          name: userLogin.name,
          iat: moment().unix(),
        },
        process.env.SECRET_KEY_JWT
      ),
    });
  } catch (error) {
    return res.status(400).send({ message: "login error" });
  }
}
  export default {
    registerAdmin,
    deleteAdmin,
    login,
  };

