const Pokemon = require("../models/Pokemon");

exports.getPokemons = async (req, res) => {
  try {
    let pokemons = await Pokemon.find();
    if (pokemons.length > 0) {
      res.json({
        pokemons,
      });
    } else {
      res.json({
        result: "No Pokemons Found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: "Error while Finding Pokemon",
    });
  }
};
