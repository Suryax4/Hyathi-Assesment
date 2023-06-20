const express = require("express");
const router = express.Router();
const {
  initializePokemon,
  registerUser,
  loginUser,
  getAvailablePokemon,
  adoptPokemon,
  getAdoptedPokemon,
  feedPokemon
} = require("./controllers");
const { validateRegisterInput, validateLoginInput } = require("./validation");
const { authenticate } = require("./middleware");

router.post("/pokemon/initialize", initializePokemon);
router.post("/register", validateRegisterInput, registerUser);
router.post("/login", validateLoginInput, loginUser);
router.get("/pokemon", authenticate, getAvailablePokemon);
router.post("/pokemon/:id/adopt", authenticate, adoptPokemon);
router.post("/pokemon/feed", authenticate, feedPokemon);
router.get("/adoptedpokemon",authenticate,getAdoptedPokemon);

module.exports = router;
