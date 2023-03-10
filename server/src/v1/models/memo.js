const mongoose = require("mongoose");

const memoSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  icon: {
    type: String,
    default: "π",
  },
  title: {
    type: String,
    default: "η‘ι‘",
  },
  description: {
    type: String,
    default: "γγγ«θͺη±γ«θ¨ε₯γγ¦δΈγγγ",
  },
  position: {
    type: Number,
  },
  favoritePosition: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Memo", memoSchema);
