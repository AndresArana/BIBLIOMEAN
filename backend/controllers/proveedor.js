import proveedor from "../models/proveedor.js";

const registerProveedor = async(req, res)=>{
    if(!req.body.name || !req.body.address)
    return res.status(400).send("incomplete data");

    const existingProveedor = await proveedor.findOne({name: req.body.name});
    if(existingProveedor) return res.status(400).send("the proveedor already exist");

    const proveedorSchema = new proveedor({
        name: req.body.name,
        address: req.body.address,
        dbStatus: true,
    });

    const result = await proveedorSchema.save();
    if(!result) return res.status(400).send("failed register proveedor");
    return res.status(200).send({result});
}
const listProveedor = async (req,res)=>{
    const proveedorSchema = await proveedor.find();
    if(!proveedorSchema || proveedorSchema.length == 0) return res.status(400).send("Empty proveedor list");
    return res.status(200).send({proveedorSchema})
}

//actualizar proveedor
const updateProveedor = async (req, res) => {
    if (
      !req.body.name ||
      !req.body.address
    )
      return res.status(400).send("incomplete data");
  
    const existingProveedor = await proveedor.findOne({
      name: req.body.name,
      address: req.body.address
      
    });
    if (existingProveedor) return res.status(400).send("the proveedor already exist");
  
    const proveedorUpdate = await proveedor.findByIdAndUpdate(req.body._id, {
      name: req.body.name,
      address: req.body.address
    });
    if (!proveedorUpdate) return res.status(400).send("error digit proveedor");
    return res.status(200).send({ proveedorUpdate});
  };

  //eliminar proveedor
  const deleteProveedor = async (req, res) => {
    const proveedorDelete = await proveedor.findByIdAndDelete({
      _id: req.params["_id"],
    });
    if (!proveedorDelete) return res.status(400).send("proveedor no found");
    res.status(200).send("proveedor deleted");
  };

export default {registerProveedor, listProveedor, updateProveedor, deleteProveedor}
