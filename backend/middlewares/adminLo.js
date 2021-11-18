import admin from "../models/admin.js";

const adminLo = async (req, res, next) => {
  const adminRole = await admin.findById(req.user._id);
  if (!adminRole) return res.status(400).send({ message: "Role no found" });

  return adminRole.tipo === "admin"
    ? next()
    : res.status(400).send({ message: "Unauthorized user" });
};

export default adminLo;
