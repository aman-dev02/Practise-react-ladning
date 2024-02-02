const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    default: [],
  },
  location: {
    type: String,
  },
  domain: {
    type: String,
    enum: ["web", "mobile", "frontend", "backend", "devops", "data", "other"],
  },
  connections: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      status: {
        type: String,
        enum: ["pending", "accepted"],
        default: "pending",
      },
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
