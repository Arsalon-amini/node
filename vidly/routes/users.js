const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const config = require("config");
const { User, validate } = require("../models/user"); //object returns has two properties (Customer, validate)
const mongoose = require("mongoose"); //object has .connect method that returns a promise
const express = require("express");
const router = express.Router(); //returns a router object we can add routes to, then export
const _ = require("lodash"); //helps
const bcrypt = require("bcrypt");

router.get("/:me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password"); //id comes from JSON web token (return from auth middleware)
  res.send(user);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered");

  user = new User(_.pick(req.body, ["name", "email", "password", "isAdmin"])); //pick only desired properties from req.body
  const salt = await bcrypt.genSalt(10); //returns a promise that resolves a salt, await it
  user.password = await bcrypt.hash(user.password, salt); //hash password with salt

  await user.save();

  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token") //allows client side to access custom header
    .send(_.pick(user, ["id", "name", "email", "isAdmin"])); //name of header = 1st arg, value = 2nd arg
});

module.exports = router;
