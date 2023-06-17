const express = require("express");
const router = express.Router();

// controllers
const { createUser } = require("../controllers/createUser");
const { loginUser } = require("../controllers/loginUser");
const { getPokemons } = require("../controllers/getPokemons");

// routes
router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/pokemons", getPokemons);

module.exports = router;
