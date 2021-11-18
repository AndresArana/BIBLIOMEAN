import libro from "../models/libro.js";

const registerLibro = async (req, res) => {
  if (
    !req.body.name ||
    !req.body.author ||
    !req.body.yearPublication ||
    !req.body.pages ||
    !req.body.gender ||
    !req.body.price
  )
    return res.status(400).send("incomplete data");

  const existingLibro = await libro.findOne({ name: req.body.name });
  if (existingLibro) return res.status(400).send("the libro already exist");

  const libroSchema = new libro({
    name: req.body.name,
    author: req.body.author,
    yearPublication: req.body.yearPublication,
    pages: req.body.pages,
    gender: req.body.gender,
    price: req.body.price,
  });

  const result = await libroSchema.save();
  if (!result) return res.status(400).send("failed register libro");
  return res.status(200).send({ result });
};

const listLibro = async (req, res) => {
  const libroSchema = await libro.find();
  if (!libroSchema || libroSchema.length == 0)
    return res.status(400).send("Empty libro list");
  return res.status(200).send({ libroSchema });
};
//listar por id
const findLibro = async (req, res) => {
  const librofind = await libro.findById({ _id: req.params["_id"] });
  return !librofind
    ? res.status(400).send({ message: "No search results" })
    : res.status(200).send({ userfind });
};

//actualizar libro
const updateLibro = async (req, res) => {
  if (
    !req.body.name ||
    !req.body.author ||
    !req.body.yearPublication ||
    !req.body.pages ||
    !req.body.gender ||
    !req.body.price
  )
    return res.status(400).send("incomplete data");

  const existingLibro = await libro.findOne({
    name: req.body.name,
    author: req.body.author,
    yearPublication: req.body.yearPublication,
    pages: req.body.pages,
    gender: req.body.gender,
    price: req.body.price
  });
  if (existingLibro) return res.status(400).send("the Libro already exist");

  const libroUpdate = await libro.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    author: req.body.author,
    yearPublication: req.body.yearPublication,
    pages: req.body.pages,
    gender: req.body.gender,
    price: req.body.price,
  });
  if (!libroUpdate) return res.status(400).send("error digit libro");
  return res.status(200).send({ libroUpdate });
};
//eliminar libro
const deleteLibro = async (req, res) => {
  const libroDelete = await libro.findByIdAndDelete({
    _id: req.params["_id"],
  });
  if (!libroDelete) return res.status(400).send("libro no found");
  res.status(200).send("libro deleted");
};
export default { registerLibro, listLibro, updateLibro, deleteLibro, findLibro};
