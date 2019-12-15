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
  listingPosts: {
    type: Array //array of listing ids
  },
  contactRequestsReceived: {
    type: Array //array of listing ids
  },
  contactRequestsSent: {
    type: Array //array of listing ids
  },
  profilePicture: { data: Buffer, contentType: String }
});

module.exports = mongoose.model("User", userSchema);
