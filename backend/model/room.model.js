const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let roomSchema = new Schema({
  owner: {
    type: String
  },
  roomType: {
    type: String
  },
  price: {
    type: Number
  },
  bedSize: {
    type: String
  },
  comment: {
    type: String
  }
});

module.exports = mongoose.model("Room", roomSchema);
