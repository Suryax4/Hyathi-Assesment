const express = require("express");
const router = express.Router();

// controllers
const { createUser } = require("../controllers/createUser");
const { loginUser } = require("../controllers/loginUser");

// routes
router.post("/register", createUser);
router.post("/login", loginUser);

module.exports = router;
