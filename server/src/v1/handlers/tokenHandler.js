const JWT = require("jsonwebtoken");
const User = require("../models/user");

//for verificaton JWT from client
const tokenDecode = (req) => {
  const bearerHeader = req.headers["authorization"];
  const bearer = bearerHeader.split(" ")[1];
  return JWT.verify(bearer, process.env.TOKEN_SECRET_KEY);
};

//for verification JWT midleware
exports.verifyToken = async (req, res, next) => {
  const tokenDecoded = tokenDecode(req);
  console.log(tokenDecoded);
  if (tokenDecoded) {
    const user = await User.findById(tokenDecoded.id);
    if (!user) return res.status(401).json("権限がありません");
    req.user = user;
    next();
  } else {
    return res.status(401).json("権限がありません");
  }
};
