const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdat: {
    type: Date,
    default: Date.now,
  },
  finished: {
    type: Boolean,
    default: false,
  },
});
module.exports = Todo = mongoose.model("todo", TodoSchema);
