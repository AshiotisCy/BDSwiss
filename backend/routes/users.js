const express = require("express");
const { result } = require("lodash");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");

// Getting all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    // Status code 5xx means there is an error on the Server.
    res.status(500).json({ message: error.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    User.findOne({ email: req.body.email }, async (err, user) => {
      if (err) throw err;
      if (!user) {
        res.status(404).json({ message: "Wrong email or Password" });
      }
      if (user) {
        const validUser = await bcrypt
          .compare(req.body.password, user.password)
          .then((result) => result);

        if (validUser) {
          res
            .status(200)
            .json({ message: "Valid User", valid: true, userId: user.id });
        } else {
          res.status(404).json({ message: "Wrong email or Password" });
        }
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get one User
router.get("/:id", getUser, (req, res) => {
  res.send(res.user);
});

// Create one User
router.post("/", async (req, res) => {
  User.findOne({ email: req.body.email }, async (err, doc) => {
    if (err) throw err;
    if (doc) res.status(400).json({ message: "User already exists" });
    if (!doc) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      });

      try {
        const newUser = await user.save();
        // Status code 201 means the item has been created in the DB.
        res.status(201).json(newUser);
      } catch (err) {
        // Status code 4xx means there is something wrong with the user Input.
        res.status(400).json({ message: err.message });
      }
    }
  });
});

// Delete one User
router.delete("/:id", getUser, async (req, res) => {
  try {
    await res.user.remove();
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: "err.message" });
  }
});

async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "Cannot find user" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }

  res.user = user;
  next();
}

module.exports = router;
