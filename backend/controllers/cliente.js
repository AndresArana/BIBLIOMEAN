import cliente from "../models/cliente.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import moment from "moment";

const registerCliente = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password)
    return res.status(400).send("incomplete data");

  const existingCliente = await cliente.findOne({ name: req.body.name });
  if (existingCliente) return res.status(400).send("the cliente already exist");

  const hash = await bcrypt.hash(req.body.password, 10);

  const clienteSchema = new cliente({
    name: req.body.name,
    email: req.body.email,
    password: hash,
    dbStatus: true,
  });

  const result = await clienteSchema.save();
  if (!result) return res.status(400).send("failed register cliente");
  return res.status(200).send({ result });
};

//listar clientes
const listCliente = async (req, res) => {
  const clienteSchema = await cliente.find();
  if (!clienteSchema || clienteSchema.length == 0)
    return res.status(400).send("Empty client list");
  return res.status(200).send({ clienteSchema });
};

//actualizar cliente
const updateCliente = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password)
    return res.status(400).send("incomplete data");

  let pass = "";

  if (req.body.password) {
    pass = await bcrypt.hash(req.body.password, 10);
  } else {
    const userFind = await user.findOne({ email: req.body.email });
    psdd = userFind.password;
  }

  const existingCliente = await cliente.findOne({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  if (existingCliente) return res.status(400).send("the cliente already exist");

  const clienteUpdate = await cliente.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    email: pass,
    password: req.body.password,
  });
  if (!clienteUpdate) return res.status(400).send("error digit cliente");
  return res.status(200).send({ clienteUpdate });
};
//eliminar cliente
const deleteCliente = async (req, res) => {
  const clienteDelete = await cliente.findByIdAndDelete({
    _id: req.params["_id"],
  });
  if (!clienteDelete) return res.status(400).send("cliente no found");
  res.status(200).send("cliente deleted");
};

//login
const login = async (req, res) => {
  if (!req.body.email || !req.body.password)
    return res.status(400).send({ message: "Incomplete data" });

  const userLogin = await cliente.findOne({ email: req.body.email });
  if (!userLogin)
    return res.status(400).send({ message: "wrong email or password" });
  //compara las contraseñas para validar si son iguales
  const hash = await bcrypt.compare(req.body.password, userLogin.password);
  if (!hash)
    return res.status(400).send({ message: "wrong email or password" });

  //generamos el JWT para mandar la info en json
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
  } catch (e) {
    return res.status(400).send({ message: "login error" });
  }
};
export default {
  registerCliente,
  listCliente,
  updateCliente,
  deleteCliente,
  login,
};
