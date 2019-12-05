const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let listingSchema = new Schema({
  //important fields
  members: {
    type: Array
  },
  contactRequests: {
    type: Array
  },
  posted: {
    type: Boolean
  },
  //listing details
  rooms: {
    type: Array //Holds room objects.
  },
  postDate: {
    type: Date
  },
  title: {
    type: String
  },
  stayLength: {
    type: Number
  },
  term: {
    type: String
  },
  address: {
    type: String
  },
  bedroomsTotal: {
    type: Number
  },
  bedroomsAvailable: {
    type: Number
  },
  bathroomsShared: {
    type: Number
  },
  showersShared: {
    type: Number
  },
  amenities: {
    ensuiteLaundry: Boolean,
    gym: Boolean,
    studyRooms: Boolean
  },
  fees: {
    internet: Number,
    hydro: Number,
    other: Number
  },
  aboutPlace: {
    type: String
  },
  aboutPosters: {
    type: String
  }
});

module.exports = mongoose.model("Listing", listingSchema);
