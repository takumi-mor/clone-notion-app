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
    default: "無題",
  },
  description: {
    type: String,
    default: "ここに自由に記入して下さい。",
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
