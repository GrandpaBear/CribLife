const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const mongoose = require("mongoose");
const fs = require("fs");
const multer = require("multer");

const server = "localhost:27017";
const database = "criblife";

const userRoutes = express.Router();
const listingRoutes = express.Router();
const profileRoutes = express.Router();
const contactRequestRoutes = express.Router();
const PORT = 4000;

let UserAuth = require("./model/userAuth.model");
let User = require("./model/user.model");
let UserSession = require("./model/userSession.model");
let Listing = require("./model/listing.model");
let Room = require("./model/room.model");
let ContactRequest = require("./model/contactRequest.model");

app.use(cors());
app.use(bodyParser.json());

//------------------------Image Helper Functions------------------
const storage = multer.diskStorage({
  destination: function(req, res, cb) {
    cb(null, "uploads/");
  }
});
const upload = multer({ storage: storage });

mongoose.connect(`mongodb://${server}/${database}`, { useNewUrlParser: true });
const connection = mongoose.connection;

//connects to crib_life_database
connection.once("open", function() {
  console.log("MongoDB database connection established successfully");
});

//listens to PORT 4000
app.listen(PORT, function() {
  console.log("Server is running on Port: " + PORT);
});
app.use("/user", userRoutes);
app.use("/listing", listingRoutes);
app.use("/profile", profileRoutes);
app.use("/contactRequest", contactRequestRoutes);

//------------------------Register User------------------------
userRoutes.route("/register").post(function(req, res) {
  let newUserAuth = new UserAuth(req.body);
  registerUser(req, res, newUserAuth);
});

//------------------------Register User Helper Methods------------------------

mongoose.Model.exists = async function(options) {
  const result = await this.findOne(options)
    .select("_id")
    .lean();
  return result ? true : false;
};

const registerUser = async function(req, res, newUserAuth) {
  //validates if register info is allowed
  const goodFormat = await validateRegisterInfo(req);
  const userAuthExists = await UserAuth.exists({
    username: req.body.username
  });
  //register user
  if (!userAuthExists && goodFormat) {
    //encrypts password
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUserAuth.password, salt, (err, hash) => {
        if (err) throw err;
        newUserAuth.password = hash;
        //saves userAuth to db
        newUserAuth.save();
      });
    });
    //saves user to db
    const user = new User();
    user.username = req.body.username;
    user.fullname = req.body.fullname;
    user.email = req.body.email;
    user.location = "Click 'Edit Profile' to add location";
    user.school = "Click 'Edit Profile' to add school";
    user.about = "Hi there!";
    user.group = "";
    user.myListing = "";
    user.currentCrib = "";
    user.profilePicture = {
      data: fs.readFileSync("../criblife/src/images/profile.png"),
      contentType: "image/png"
    };
    console.log(user);
    user.save();

    res.status(200).send("New User registered Successfully");
  } else {
    res.status(400).send("Registering new user failed");
  }
};

const validateRegisterInfo = req => {
  return new Promise((resolve, reject) => {
    if (
      /^ *$/.test(req.body.username) ||
      /^ *$/.test(req.body.password) ||
      /^ *$/.test(req.body.email) ||
      req.body.username == (null || "") ||
      req.body.password == (null || "") ||
      req.body.email == (null || "")
    ) {
      return resolve(false);
    } else {
      return resolve(true);
    }
  });
};

//------------------------End of Register User Helper Methods------------------------

//------------------------Session Encryption Methods------------------------

const generateEncryptedSessionId = sessionId => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(sessionId, salt, (err, hash) => {
        if (err) {
          console.log(err);
        }
        UserSession.findOne({ hash }).then(userSession => {
          if (!userSession) {
            //console.log(hash);
            return resolve(hash);
          } else {
            sessionId = generateRandomSessionId();
            return saveEncryptedSessionId(sessionId);
          }
        });
      });
    });
  });
};

const getEncryptedSessionId = async sessionId => {
  const result = await generateEncryptedSessionId(sessionId);
  return result;
};

const generateRandomSessionId = () => {
  let sessionId = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 64; i++) {
    sessionId += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return sessionId;
};

//------------------------User Login------------------------
userRoutes.route("/login").post(function(req, res) {
  const username = req.body.username;
  const password = req.body.password;
  //find if user is registered
  UserAuth.findOne({ username }).then(userAuth => {
    //return fail if user is not registered
    if (!userAuth) {
      return res.status(400).send("Login failed");
    } else {
      //login workflow
      //compare encrypted passwords
      bcrypt.compare(password, userAuth.password).then(isMatch => {
        if (isMatch) {
          //delete current sessions under username
          UserSession.deleteMany({ username }).then(() => {
            //generate random sessionId
            let sessionId = generateRandomSessionId();
            //check for sessionId uniqueness and return encrypted sessionId
            getEncryptedSessionId(sessionId).then(result => {
              //create encrypted UserSession object
              userSession = new UserSession();
              userSession.username = username;
              userSession.sessionId = result;

              //create UserSession Key object
              userSessionKey = {
                username: username,
                view: "profile",
                sessionId: sessionId
              };
              //save encrypted UserSession object to Mongo
              userSession.save();
              console.log(
                "Saved Encrypted UserSession to DB: " + userSession.sessionId
              );
              //return UserSession Key to Local Storage
              console.log(
                "Returned UserSession to Local Storage: " +
                  userSessionKey.sessionId
              );
              return res.status(200).json(userSessionKey);
            });
          });
        } else {
          return res.status(400).send("Login failed");
        }
      });
    }
  });
});

//------------------------ContactRequest Methods------------------------
contactRequestRoutes.route("/create").post(function(req, res) {
  let userSessionKey = {
    username: "",
    view: "",
    sessionId: ""
  };
  UserSession.findOne({ username: req.body.username }).then(userSession => {
    bcrypt
      .compare(req.body.sessionId, userSession.sessionId)
      .then(isMatch => {
        //check if contact request members is greater or equal to minimum members required
        if (isMatch) {
          if (
            req.body.minimumMembersForContactRequest <=
            req.body.contactRequest.members.length
          ) {
            req.body.contactRequest.save().then(result => {
              for (let i = 0; i < req.body.contactRequest.members.length; i++) {
                User.findOne({
                  username: req.body.contactRequest.members[i].username
                }).then(user => {
                  user.contactRequestsSent.push(result._id);
                });
              }
            });
          } else {
            res.status(403).send("Select more roommates.");
          }
        } else {
          res.status(400).json(userSessionKey);
        }
      })
      .catch(err => {
        res.status(400).json(userSessionKey);
      });
  });
});

contactRequestRoutes.route("/update").post(function(req, res) {
  let userSessionKey = {
    username: "",
    view: "",
    sessionId: ""
  };
  UserSession.findOne({ username: req.body.username }).then(userSession => {
    bcrypt
      .compare(req.body.sessionId, userSession.sessionId)
      .then(isMatch => {
        //check if contact request members is greater or equal to minimum members required
        if (isMatch) {
          ContactRequest.findOne({
            _id: req.body.contactRequestId
          }).then(result => {
            for (let i = 0; i < result.members.length; i++) {
              if (req.body.username == result.members[i].username) {
                result.members[i].approvalResponse = true;
                result.save();
                for (let j = 0; j < result.members.length; j++) {
                  if (result.members[i].approvalResponse == false) {
                    res
                      .status(200)
                      .send("Contact Request updated successfully!");
                    break;
                  } else if (
                    j == result.members.length - 1 &&
                    result.members[i].approvalResponse == true
                  ) {
                    res
                      .status(200)
                      .send(
                        "Contact Request has been completed and sent successfully!"
                      );
                  }
                }
                break;
              }
            }
          });
        } else {
          res.status(400).json(userSessionKey);
        }
      })
      .catch(err => {
        res.status(400).json(userSessionKey);
      });
  });
});

contactRequestRoutes.route("/delete").post(function(req, res) {
  let userSessionKey = {
    username: "",
    view: "",
    sessionId: ""
  };
  UserSession.findOne({ username: req.body.username }).then(userSession => {
    bcrypt
      .compare(req.body.sessionId, userSession.sessionId)
      .then(isMatch => {
        if (isMatch) {
          ContactRequest.deleteOne({
            _id: req.body.contactRequestId
          }).then(result => {
            res.status(200).send("Contact Request deleted successfully!");
          });
        } else {
          res.status(400).json(userSessionKey);
        }
      })
      .catch(err => {
        res.status(400).json(userSessionKey);
      });
  });
});

//------------------------Profile Methods------------------------
profileRoutes.route("").post(function(req, res) {
  let userSessionKey = {
    username: "",
    view: "",
    sessionId: ""
  };
  UserSession.findOne({ username: req.body.username }).then(userSession => {
    bcrypt
      .compare(req.body.sessionId, userSession.sessionId)
      .then(isMatch => {
        if (isMatch) {
          User.find({ username: req.body.username })
            .then(result => {
              res.status(200).json(result);
            })
            .catch(err => {
              res.status(400).json(userSessionKey);
            });
        } else {
          res.status(400).json(userSessionKey);
        }
      })
      .catch(err => {
        res.status(400).json(userSessionKey);
      });
  });
});

profileRoutes.route("/upload").post(upload.single("file"), function(req, res) {
  let userSessionKey = {
    username: "",
    view: "",
    sessionId: ""
  };
  UserSession.findOne({ username: req.body.username }).then(userSession => {
    bcrypt
      .compare(req.body.sessionId, userSession.sessionId)
      .then(isMatch => {
        if (isMatch) {
          User.findOne({ username: req.body.username })
            .then(result => {
              result.profilePicture.data = fs.readFileSync(req.file.path);
              result.profilePicture.contentType = "image/png";
              result.save();
              res
                .status(200)
                .json({ message: "Profile picture added to Mongo" });
            })
            .catch(err => {
              res.status(400).json(userSessionKey);
            });
        } else {
          res.status(400).json(userSessionKey);
        }
      })
      .catch(err => {
        res.status(400).json(userSessionKey);
      });
  });
});

//------------------------Listing Methods------------------------
listingRoutes.route("/create").post(function(req, res) {
  let userSessionKey = {
    username: "",
    view: "",
    sessionId: ""
  };
  UserSession.findOne({ username: req.body.username }).then(userSession => {
    bcrypt
      .compare(req.body.sessionId, userSession.sessionId)
      .then(isMatch => {
        if (isMatch) {
          const newListing = new Listing();
          newListing.posted = false;
          newListing.members = req.body.newListing.members;
          newListing.title = req.body.newListing.title;
          newListing.stayLength = req.body.newListing.stayLength;
          newListing.term = req.body.newListing.term;
          newListing.address = req.body.newListing.address;
          newListing.bedroomsTotal = req.body.newListing.bedroomsTotal;
          bedroomsAvailable = req.body.newListing.bedroomsAvailable;
          newListing
            .save()
            .then(result => {
              let listingId = {
                listingId: result._id
              };
              res.status(200).json(listingId); //sends back listingId
            })
            .catch(err => {
              res.status(400).json(userSessionKey);
            });
        } else {
          res.status(400).json(userSessionKey);
        }
      })
      .catch(err => {
        res.status(400).json(userSessionKey);
      });
  });
});

listingRoutes.route("/update").post(function(req, res) {
  let userSessionKey = {
    username: "",
    view: "",
    sessionId: ""
  };
  UserSession.findOne({ username: req.body.username }).then(userSession => {
    bcrypt
      .compare(req.body.sessionId, userSession.sessionId)
      .then(isMatch => {
        if (isMatch) {
          Listing.updateOne(
            { _id: req.body.listingId },
            req.body.listing,
            function(err, affected, resp) {
              console.log(resp);
            }
          )
            .then(result => {
              res.status(200).send("Listing updated successfully!");
            })
            .catch(err => {
              res.status(400).json(userSessionKey);
            });
        } else {
          res.status(400).json(userSessionKey);
        }
      })
      .catch(err => {
        res.status(400).json(userSessionKey);
      });
  });
});

listingRoutes.route("/upload").post(upload.single("file"), function(req, res) {
  let userSessionKey = {
    username: "",
    view: "",
    sessionId: ""
  };
  UserSession.findOne({ username: req.body.username }).then(userSession => {
    bcrypt
      .compare(req.body.sessionId, userSession.sessionId)
      .then(isMatch => {
        if (isMatch) {
          Listing.findOne({ _id: req.body.listingId })
            .then(result => {
              result.pictures[req.body.imageIdTag].data = fs.readFileSync(
                req.file.path
              );
              result.pictures[req.body.imageIdTag].contentType = "image/png";
              result.save();
              res.status(200).json({ message: "Uploaded picture to Mongo" });
            })
            .catch(err => {
              res.status(400).json(userSessionKey);
            });
        } else {
          res.status(400).json(userSessionKey);
        }
      })
      .catch(err => {
        res.status(400).json(userSessionKey);
      });
  });
});

listingRoutes.route("/delete").get(function(req, res) {
  let userSessionKey = {
    username: "",
    view: "",
    sessionId: ""
  };
  UserSession.findOne({ username: req.body.username }).then(userSession => {
    bcrypt
      .compare(req.body.sessionId, userSession.sessionId)
      .then(isMatch => {
        if (isMatch) {
          Listing.deleteOne({ _id: req.body.listingId })
            .then(result => {
              res.status(200).send("Listing deleted successfully!");
            })
            .catch(err => {
              res.status(400).json(userSessionKey);
            });
        } else {
          res.status(400).json(userSessionKey);
        }
      })
      .catch(err => {
        res.status(400).json(userSessionKey);
      });
  });
});

//------------------------Listing (Room) Methods------------------------
listingRoutes.route("/createRoom").post(function(req, res) {
  let userSessionKey = {
    username: "",
    view: "",
    sessionId: ""
  };
  UserSession.findOne({ username: req.body.username }).then(userSession => {
    bcrypt
      .compare(req.body.sessionId, userSession.sessionId)
      .then(isMatch => {
        if (isMatch) {
          Listing.findOne(req.body.listingId)
            .then(result => {
              for (let i = 0; i < result.members.length; i++) {
                if (result.rooms[i].owner == req.body.username) {
                  res.status(400).send("Room added unsuccessfully");
                  return;
                } else {
                  const newRoom = new Room();
                  newRoom.owner = req.body.username;
                  newRoom.roomType = "";
                  newRoom.price = "";
                  newRoom.bedSize = "";
                  newRoom.comment = "";
                  newRoom.save(function(err, room) {
                    const listingRooms = req.body.rooms;
                    listingRooms.rooms[i] = room._id;
                    Listing.updateOne(
                      { _id: req.body.listingId },
                      {
                        rooms: listingRooms
                      },
                      function(err, affected, resp) {
                        console.log(resp);
                      }
                    );
                  });
                  res.status(200).send("Room added successfully!");
                }
              }
            })
            .catch(err => {
              res.status(400).json(userSessionKey);
            });
        } else {
          res.status(400).json(userSessionKey);
        }
      })
      .catch(err => {
        res.status(400).json(userSessionKey);
      });
  });
});

//------------------------Listing Retrieval Methods------------------------
listingRoutes.route("/createRoom").post(function(req, res) {
  let userSessionKey = {
    username: "",
    view: "",
    sessionId: ""
  };
  UserSession.findOne({ username: req.body.username }).then(userSession => {
    bcrypt
      .compare(req.body.sessionId, userSession.sessionId)
      .then(isMatch => {
        if (isMatch) {
          Listing.find(function(err, listings) {
            if (err) {
              console.log(err);
            } else {
              res.status(200).json(listings);
            }
          });
        } else {
          res.status(400).json(userSessionKey);
        }
      })
      .catch(err => {
        res.status(400).json(userSessionKey);
      });
  });
});

userRoutes.route("/getAllUsers").get(function(req, res) {
  User.find(function(err, users) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json(users);
    }
  });
});
