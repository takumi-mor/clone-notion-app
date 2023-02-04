const mongoose = require("mongoose");

const memoSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  icon: {
    type: String,
    default: "📝",
  },
  title: {
    type: String,
    default: "ここに自由に記入して下さい。",
  },
  favoritePosition: {
    type: Number,
  },
});

module.exports = mongoose.model("Memo", memoSchema);
