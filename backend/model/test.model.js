const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Test = new Schema({
  phrase: String
});

module.exports = mongoose.model("Test", Test);
