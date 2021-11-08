import proveedor from "../models/proveedor.js";

const registerProveedor = async(req, res)=>{
    if(!req.body.name || !req.body.address)
    return res.status(400).send("incomplete data");

    const existingProveedor = await proveedor.findOne({name: req.body.name});
    if(existingProveedor) return res.status(400).send("the proveedor already exist");

    const proveedorSchema = new proveedor({
        name: req.body.name,
        email: req.body.address,
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
export default {registerProveedor, listProveedor}
