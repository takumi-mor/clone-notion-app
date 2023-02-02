const router = require("express").Router();
const { body } = require("express-validator");
const User = require("../models/user");
const validation = require("../handlers/validation");
const userController = require("../controllers/user");
const tokenHander = require("../handlers/tokenHandler");

//create user API
router.post(
  "/register",
  body("username")
    .isLength({ min: 8 })
    .withMessage("ユーザー名は8文字以上必要です。"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("パスワードは8文字以上必要です。"),
  body("confirmPassword")
    .isLength({ min: 8 })
    .withMessage("確認用パスワードは8文字以上必要です。"),
  body("username").custom((value) => {
    return User.findOne({ username: value }).then((user) => {
      if (user) {
        return Promise.reject("このユーザー名は既に使用されています。");
      }
    });
  }),
  validation.validate,
  userController.register
);

//for user login API
router.post(
  "/login",
  body("username")
    .isLength({ min: 8 })
    .withMessage("ユーザー名は8文字以上必要です。"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("パスワードは8文字以上必要です。"),
  validation.validate,
  userController.login
);

//JWT authenticate API
router.post("/verify-token", tokenHander.verifyToken, (req, res) => {
  res.status(200).json({ user: req.user });
});

module.exports = router;
