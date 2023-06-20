const mongoose = require("mongoose");
const { Schema } = mongoose;

const PokemonSchema = new Schema({
  name: String,
  image: String ,
  breed: String,
  age: Number,
  health: Number,
  adoptedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
});

const Pokemon = mongoose.model("Pokemon", PokemonSchema);

module.exports = Pokemon;
