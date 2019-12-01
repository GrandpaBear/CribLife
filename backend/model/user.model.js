const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userSchema = new Schema({
  username: {
    type: String
  },
  fullname: {
    type: String
  },
  email: {
    type: String
  },
  location: {
    type: String
  },
  school: {
    type: String
  },
  about: {
    type: String
  },
  group: {
    type: String
  },
  myListing: {
    type: String
  },
  currentCrib: {
    type: String
  },
  profilePicture: { data: Buffer, contentType: String }
});

module.exports = mongoose.model("User", userSchema);
