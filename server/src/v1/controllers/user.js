const jsonwebtoken = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
const User = require("../models/user");

exports.register = async (req, res) => {
  //receive passeword
  const password = req.body.password;

  try {
    //encrypted password
    req.body.password = CryptoJS.AES.encrypt(password, process.env.SECRET_KEY);
    //create user
    const user = await User.create(req.body);
    //published JWT
    const token = jsonwebtoken.sign(
      { id: user._id },
      process.env.TOKEN_SECRET_KEY,
      {
        expiresIn: "24h",
      }
    );
    return res.status(200).json({ user, token });
  } catch (err) {
    return res(500).json({ err });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username: username });
    if (!user) {
      res.status(401).json({
        error: {
          param: "username",
          message: "ユーザー名が無効です。",
        },
      });
    }

    //verify passwords.
    const descryptedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.SECRET_KEY
    ).toString(CryptoJS.enc.Utf8);
    if (descryptedPassword !== password) {
      return res.status(401).json({
        error: {
          param: "password",
          message: "パスワードが無効です。",
        },
      });
    }

    //published JWT
    const token = jsonwebtoken.sign(
      { id: user._id },
      process.env.TOKEN_SECRET_KEY,
      {
        expiresIn: "24h",
      }
    );

    res.status(201).json({ user, token });
  } catch (err) {
    res.status(500).json(err);
  }
};
