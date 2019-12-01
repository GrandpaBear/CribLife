const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSession = new Schema({
  username: {
    type: String
  },
  sessionId: {
    type: String
  }
});

module.exports = mongoose.model("UserSession", UserSession);
