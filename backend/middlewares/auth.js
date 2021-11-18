import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  let token = req.header("Authorization");
  if (!token)
    return res.status(400).send({ message: "Authorization denied: No token" });

  // divide el token en strings donde encuentre espacios
  token = token.split(" ")[1];
  if (!token)
    return res.status(400).send({ message: "Authorization denied: No token" });

  try {
    //verifica que el token enviado sea el de nosotros
    req.user = jwt.verify(token, process.env.SECRET_KEY_JWT);
    next();
  } catch (error) {
    return res
      .status(400)
      .send({ message: "Authorization denied: invalid token" });
  }
};

export default auth;
