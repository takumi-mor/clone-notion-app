const router = require("express").Router();
const memoController = require("../controllers/memo");
const tokenHandler = require("../handlers/tokenHandler");

//メモ作成
router.post("/", tokenHandler.verifyToken, memoController.create);

module.exports = router;
