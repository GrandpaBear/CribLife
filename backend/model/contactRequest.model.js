const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let contactRequestSchema = new Schema({
  listing: {
    type: String
  },
  members: {
    type: Array //Holds members' username/email and boolean of whether they approved of place
  },
  contactInfoSent: {
    type: Boolean
  }
});

module.exports = mongoose.model("ContactRequest", contactRequestSchema);
