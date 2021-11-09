import cliente from "../models/cliente.js";

const registerCliente = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password)
    return res.status(400).send("incomplete data");

  const existingCliente = await cliente.findOne({ name: req.body.name });
  if (existingCliente) return res.status(400).send("the cliente already exist");

  const clienteSchema = new cliente({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
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

  const existingCliente = await cliente.findOne({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  if (existingCliente) return res.status(400).send("the cliente already exist");

  const clienteUpdate = await cliente.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    email: req.body.email,
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

export default { registerCliente, listCliente, updateCliente, deleteCliente };
