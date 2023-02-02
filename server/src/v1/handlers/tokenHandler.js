const JWT = require("jsonwebtoken");
const User = require("../models/user");

//for verificaton JWT from client
const tokenDecode = (req) => {
  const bearerHeader = req.headers["authorization"];
  if (bearerHeader) {
    const bearer = bearerHeader.split(" ")[1];
    try {
      const tokenDecoded = JWT.verity(bearer, process.env.TOKEN_SECRET_KEY);
      return tokenDecoded;
    } catch {
      return false;
    }
  } else {
    return false;
  }
};

//for verification JWT midleware
exports.verifyToken = async (req, res, next) => {
  const tokenDecoded = tokenDecode(req);
  if (tokenDecoded) {
    const user = await User.findById(tokenDecoded.id);
    if (!user) return res.status(401).json("権限がありません");
    req.user = user;
    next();
  } else {
    return res.status(401).json("権限がありません");
  }
};
