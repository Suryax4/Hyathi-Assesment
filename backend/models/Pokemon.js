const mongoose = require("mongoose");

const pokemonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  breed: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  health: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("pokemons", pokemonSchema);
