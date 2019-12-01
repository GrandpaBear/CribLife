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
const profileRoutes = express.Router();
const PORT = 4000;

let UserAuth = require("./model/userAuth.model");
let User = require("./model/user.model");
let UserSession = require("./model/userSession.model");

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
app.use("/profile", profileRoutes);

//------------------------Image Encoder/Decoder------------------
// function to encode file data to base64 encoded string
// function base64_encode(file) {
//   // read binary data
//   var bitmap = fs.readFileSync(file);
//   // convert binary data to base64 encoded string
//   return new Buffer(bitmap).toString("base64");
// }

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
              res.json({ message: "Profile picture added to Mongo" });
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

userRoutes.route("/getAllUsers").get(function(req, res) {
  User.find(function(err, users) {
    if (err) {
      console.log(err);
    } else {
      res.json(users);
    }
  });
});
