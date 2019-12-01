const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userSchema = new Schema({
  username: {
    type: String
  },
  password: {
    type: String
  }
});

module.exports = mongoose.model("UserAuth", userSchema);
