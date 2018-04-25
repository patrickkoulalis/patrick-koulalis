const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
// mongoose.connect(process.env.DATABASE, { useMongoClient: true });

// const User = require("../../models/users");

//API V1
router.get("/", (req, res) => {
  res.json({ message: "API Initialized!" });
});

// Users API Route
router
  .route("/users/")
  .all((req, res, next) => {
    next();
  })
  .get((req, res, next) => {
    User.find((err, users) => {
      if (err) {
        console.error(err);
      }
      res.json(users);
    });
  })
  .post((req, res, next) => {
    const newUser = new User(req.body);
    newUser.save(err => {
      if (err) res.send(err);
      res.json(req.body, { message: "User successfully added!" });
    });
    console.log(newUser);
  });

// Add New User
router
  .route("/new/user")
  .all((req, res, next) => {
    next();
  })
  .post((req, res, next) => {
    const newUser = new User(req.body);
    console.log(newUser);
    newUser.save(err => {
      if (err) {
        res.send(err);
      }
      res.json(req.body);
    });
  });

	// Find User
router
  .route("/users/:userId")
  .all((req, res, next) => {
    next();
  })
  .get((req, res, next) => {
    User.findOne({_id: req.params.userId}, (err, user) => {
      if (err) {
        console.error(err);
      }
      res.json(user);
    });
  });

module.exports = router;
